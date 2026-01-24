import { NavLink } from 'react-router-dom';

interface PenaltyRecord {
  id: number;
  date: string;
  itemName: string;
  reason: string;
}

const CONSUME_DATA: PenaltyRecord[] = [
  { id: 1, date: '2027.01.02', itemName: '우산(102)', reason: '반납기한 초과' },
  { id: 2, date: '2027.05.03', itemName: '우산(104)', reason: '반납기한 초과' },
  { id: 3, date: '2028.01.01', itemName: '우산(105)', reason: '반납기한 초과' },
];
export default function Penalty() {
  // TODO: 임시 데이터 불러오기
  // TODO: 불러오 데이터를 PenaltyRecord 형식으로 PenaltyRecord[]에 저장하기
  // NOTE: 임시 데이터 CONSUME_DATA로 샘플 화면 보여준 것
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
            {CONSUME_DATA.map((item) => (
              <tr>
                <td className="border border-[#DEE2E6] border-[2px] p-3">
                  {item.id}
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
          <button className="text-[#6610F2] font-bold border border-[#6610F2] rounded-lg py-3 px-16 ">
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
}
