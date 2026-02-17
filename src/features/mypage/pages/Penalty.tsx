import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useUserInfo } from '../../../store/userStore';
import { getPenaltyHistory } from '../../../api/services';

interface PenaltyInfo {
  userPenaltyId: number;
  createdAt: string;
  itemName: string;
  penaltyType: string;
}

export default function Penalty() {
  const [penaltyRecord, setPenaltyRecord] = useState<PenaltyInfo[]>([]);
  const { studentNum: savedId } = useUserInfo();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getPenaltyHistory();
        setPenaltyRecord(res.data.data || []);
      } catch (error) {
        alert('징계내역을 불러오는 데에 실패했습니다.');
      }
    };

    fetchHistory();
  }, [savedId]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 self-start">나의 징계내역</h1>
      <div className="">
        {/* 징계내역 표 */}
        <table className="table-fixed border-collapse border border-[#DEE2E6] border-[2px] mb-4">
          <colgroup>
            <col style={{ width: '90px' }} />
            <col style={{ width: '210px' }} />
            <col style={{ width: '250px' }} />
            <col style={{ width: '390px' }} />
          </colgroup>
          <thead>
            <tr>
              <td className="border border-[#DEE2E6] border-[2px] p-3 font-bold">
                #
              </td>
              <td className="border border-[#DEE2E6] border-[2px] p-3 font-bold">
                날짜
              </td>
              <td className="border border-[#DEE2E6] border-[2px] p-3 font-bold">
                물품명
              </td>
              <td className="border border-[#DEE2E6] border-[2px] p-3 font-bold">
                사유
              </td>
            </tr>
          </thead>
          <tbody>
            {penaltyRecord.map((item) => (
              <tr>
                <td className="border border-[#DEE2E6] border-[2px] p-3">
                  {item.userPenaltyId}
                </td>
                <td className="border border-[#DEE2E6] border-[2px] p-3">
                  {item.createdAt}
                </td>
                <td className="border border-[#DEE2E6] border-[2px] p-3">
                  {item.itemName}
                </td>
                <td className="border border-[#DEE2E6] border-[2px] p-3">
                  {item.penaltyType}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 하단 안내사항 & 뒤로가기 */}
        <p className="text-[#102ACF] ml-10">
          잘못된 징계내역이 기록된 경우 학생회로 문의주시기 바랍니다.
        </p>
        <div className="flex justify-end">
          <button className="text-[#6610F2] font-bold border border-[#6610F2] rounded-lg py-3 px-16 ">
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
}
