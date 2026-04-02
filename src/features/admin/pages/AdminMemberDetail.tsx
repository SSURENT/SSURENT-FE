import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemberContext, MemberStatus } from '../context/MemberContext';

const STATUS_LABEL: Record<MemberStatus, string> = {
  active: '이용가능',
  banned: '정지회원',
  deleted: '비활성화',
};

interface Penalty {
  id: number;
  date: string;
  item: string;
  reason: string;
}

interface Rental {
  id: number;
  item: string;
  rentDate: string;
  dueDate: string;
}

const AdminMemberDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getMember, updateMemberStatus, updateMemberPhone } =
    useMemberContext();

  const member = getMember(id ?? '');

  const [localStatus, setLocalStatus] = useState<MemberStatus>(
    member?.status ?? 'active',
  );
  const [phoneInput, setPhoneInput] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  // 샘플 데이터
  const [penalties] = useState<Penalty[]>([
    { id: 1, date: '2027.01.02', item: '우산(102)', reason: '반납기한 초과' },
    { id: 2, date: '2027.05.03', item: '우산(104)', reason: '반납기한 초과' },
    { id: 3, date: '2028.01.01', item: '우산(105)', reason: '반납기한 초과' },
  ]);

  const [rentals] = useState<Rental[]>([
    { id: 1, item: '우산(101)', rentDate: '2026.01.25', dueDate: '2026.01.28' },
    {
      id: 2,
      item: '무선마우스(1202)',
      rentDate: '2026.01.25',
      dueDate: '2026.01.28',
    },
    {
      id: 3,
      item: '보조배터리(502)',
      rentDate: '2026.01.25',
      dueDate: '2026.01.28',
    },
  ]);

  if (!member)
    return <div className="p-10 text-gray-500">회원을 찾을 수 없습니다.</div>;

  const handlePhoneConfirm = () => {
    const regex = /^010-\d{4}-\d{4}$/;
    if (!regex.test(phoneInput)) {
      setPhoneError('유효하지 않은 번호 입니다');
      return;
    }
    updateMemberPhone(member.id, phoneInput);
    setPhoneInput('');
    setPhoneError('');
    setShowPhoneModal(false);
  };

  const handleSaveAndBack = () => {
    updateMemberStatus(member.id, localStatus);
    navigate('/admin/users');
  };

  return (
    <div className="pt-2 pb-10 w-full mx-auto text-left">
      <div className="w-[90%] mx-auto text-left">
        {/* 헤더 영역 */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            회원관리 상세
          </h2>
          <div className="flex gap-2">
            <button
              className="border border-[#6c5ce7] text-[#6c5ce7] bg-white px-4 py-1.5 rounded-md font-semibold text-sm hover:bg-indigo-50 transition"
              onClick={() => navigate(`/admin/users/${member.id}/penalty`)}
            >
              징계내역보기
            </button>
            <button
              className="border border-[#ff4d4f] text-[#ff4d4f] bg-white px-4 py-1.5 rounded-md font-semibold text-sm hover:bg-red-50 transition"
              onClick={handleSaveAndBack}
            >
              수정하기
            </button>
          </div>
        </div>

        {/* 메인 화이트 카드 */}
        <div className="bg-white border border-gray-200 rounded-[15px] p-[50px] min-h-[850px] shadow-sm flex flex-col w-full h-full">
          <div className="flex gap-20">
            {/* 왼쪽 컬럼 */}
            <div className="flex-1">
              {/* 프로필 섹션 */}
              <div className="flex gap-5 items-center mb-8">
                <div className="bg-gray-100 p-3 rounded-full">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#aaa"
                    strokeWidth="1.5"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-900 leading-tight">
                    {member.name} ({member.studentId})
                  </span>
                  <div className="mt-1.5 text-sm text-gray-500">
                    <span>{member.role}</span>
                    <span className="ml-4 font-medium text-[#6c5ce7]">
                      {STATUS_LABEL[localStatus]}
                    </span>
                  </div>
                </div>
              </div>

              {/* 상태 변경 버튼 그룹 */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[13px] font-medium text-gray-500 whitespace-nowrap">
                  상태 변경 :
                </span>
                <div className="flex gap-1.5">
                  {(['active', 'banned', 'deleted'] as MemberStatus[]).map(
                    (s) => (
                      <button
                        key={s}
                        onClick={() => setLocalStatus(s)}
                        className={`px-3 py-1 rounded text-xs transition-all border ${
                          localStatus === s
                            ? s === 'deleted'
                              ? 'bg-[#e53e3e] border-[#e53e3e] text-white font-bold'
                              : 'bg-[#6c5ce7] border-[#6c5ce7] text-white font-bold'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {STATUS_LABEL[s]}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <hr className="border-t border-gray-100 my-8" />

              {/* 연락처 섹션 */}
              <div className="flex justify-between items-center mb-10">
                <span className="text-sm text-gray-700 flex items-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="mr-1.5"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.08 2.18 2 2 0 012.07 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  연락처 :{' '}
                  <strong className="ml-1 text-gray-900">{member.phone}</strong>
                </span>
                <button
                  className="border border-[#ff4d4f] text-[#ff4d4f] px-3 py-1 rounded text-xs font-semibold hover:bg-red-50 transition"
                  onClick={() => setShowPhoneModal(true)}
                >
                  번호변경
                </button>
              </div>

              {/* 징계내역 섹션 */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800">징계내역</h3>
                  <button
                    className="text-[#ff4d4f] border border-[#ff4d4f] px-3 py-1 rounded text-xs font-semibold hover:bg-red-50 transition"
                    onClick={() =>
                      navigate(`/admin/users/${member.id}/penalty`)
                    }
                  >
                    징계 수정
                  </button>
                </div>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-2 text-gray-400 font-medium text-sm">
                        #
                      </th>
                      <th className="text-left py-3 px-2 text-gray-400 font-medium text-sm">
                        날짜
                      </th>
                      <th className="text-left py-3 px-2 text-gray-400 font-medium text-sm">
                        물품명
                      </th>
                      <th className="text-left py-3 px-2 text-gray-400 font-medium text-sm">
                        사유
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {penalties.map((p) => (
                      <tr
                        key={p.id}
                        className="text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-2">{p.id}</td>
                        <td className="py-4 px-2">{p.date}</td>
                        <td className="py-4 px-2 font-semibold">{p.item}</td>
                        <td className="py-4 px-2 text-gray-500">{p.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 오른쪽 컬럼: 대여 중인 물품 */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  대여 중인 물품
                </h3>
                <button
                  className="text-[#6c5ce7] border border-[#6c5ce7] px-3 py-1 rounded text-xs font-semibold hover:bg-indigo-50 transition"
                  onClick={() =>
                    navigate(`/admin/users/${member.id}/rental-edit`)
                  }
                >
                  대여내역 수정
                </button>
              </div>
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-3 px-2 text-gray-400 font-medium text-sm">
                      물품명
                    </th>
                    <th className="py-3 px-2 text-gray-400 font-medium text-sm">
                      대여일
                    </th>
                    <th className="py-3 px-2 text-gray-400 font-medium text-sm">
                      반납기한
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
                  {rentals.map((r) => (
                    <tr
                      key={r.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-2 font-semibold">{r.item}</td>
                      <td className="py-4 px-2">{r.rentDate}</td>
                      <td className="py-4 px-2 font-bold text-red-500">
                        {r.dueDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 번호변경 모달 (테일윈드 버전) */}
        {showPhoneModal && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowPhoneModal(false)}
          >
            <div
              className="bg-white rounded-2xl p-8 w-full max-w-[420px] shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-lg"
                onClick={() => setShowPhoneModal(false)}
              >
                ✕
              </button>
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm w-20">변경대상 :</span>
                  <span className="font-bold text-gray-900">{member.name}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-gray-500 text-sm font-medium">
                    번호 변경 :
                  </span>
                  <input
                    type="text"
                    className={`w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 transition ${
                      phoneError
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200'
                    }`}
                    placeholder="010-xxxx-xxxx"
                    value={phoneInput}
                    onChange={(e) => {
                      setPhoneInput(e.target.value);
                      setPhoneError('');
                    }}
                  />
                  {phoneError && (
                    <p className="text-red-500 text-xs font-medium ml-1">
                      {phoneError}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2 justify-end mt-8">
                <button
                  className="px-6 py-2.5 bg-[#6c5ce7] text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-[#5a4ccb] transition active:scale-95"
                  onClick={handlePhoneConfirm}
                >
                  확인
                </button>
                <button
                  className="px-6 py-2.5 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition"
                  onClick={() => setShowPhoneModal(false)}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMemberDetail;
