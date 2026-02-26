import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../../store/userStore';
import { getPenaltyHistory } from '../../../api/services';
import { dataTagSymbol } from '@tanstack/react-query';

interface PenaltyInfo {
  penaltyId: number;
  penaltyType: string;
  itemId: number;
  itemName: string;
  rentalHistoryId: number;
  createdAt: string;
}

interface PenaltyDisplayInfo {
  rowNum: number;
  date: string;
  itemName: string;
  reason: string;
}

export default function Penalty() {
  const [penaltyRecord, setPenaltyRecord] = useState<PenaltyDisplayInfo[]>([]);
  const { studentNum: savedId } = useUserInfo();
  const getDate = (createdAt: string): string => {
    const date = createdAt.split('T')[0];
    return `${date.split('-')[0]}.${date.split('-')[1]}.${date.split('-')[2]}`;
  };
  const getReason = (penaltyType: string): string => {
    // TODO: 페널티 타입에 따라서 "사유"를 번역해서 return하는 로직 추가해야 함
    if (penaltyType === 'OVERDUE') return '반납기한 경과';
    if (penaltyType === 'UNAUTHORIZED_USE') return '무단 사용';
    else return '상세한 사유는 학생회에 문의해주세요.';
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getPenaltyHistory();
        const data: PenaltyInfo[] = res?.data.data || [];
        const refinedData: PenaltyDisplayInfo[] = data.map((record, index) => {
          return {
            rowNum: index + 1,
            date: getDate(record.createdAt),
            itemName: record.itemName,
            reason: getReason(record.penaltyType),
          };
        });
        setPenaltyRecord(refinedData);
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
                  {item.rowNum}
                </td>
                <td className="border border-[#DEE2E6] border-[2px] p-3">
                  {item.date}
                </td>
                <td className="border border-[#DEE2E6] border-[2px] p-3">
                  {item.itemName}
                </td>
                <td className="border border-[#DEE2E6] border-[2px] p-3">
                  {item.reason}
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
          <button
            className="text-[#6610F2] font-bold border border-[#6610F2] rounded-lg py-3 px-16"
            onClick={() => navigate(-1)}
          >
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
}
