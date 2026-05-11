import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminUserApi } from '../../../api/endpoints/AdminUser';
import { adminRentalApi } from '../../../api/endpoints/AdminRental';
import {
  AdminUserDetailResponseDto,
  AdminUserPenaltyDto,
} from '../../../api/dto/AdminUser.dto';
import { UserRentalHistoryDto } from '../../../api/dto/AdminRental.dto';

const STATUS_LABEL: Record<string, string> = {
  ACTIVE: '이용가능',
  BANNED: '정지회원',
};
const ROLE_LABEL: Record<string, string> = {
  SUPERADMIN: '최고관리자',
  ADMIN: '관리자',
  NORMAL: '일반학우',
};
const PENALTY_LABEL: Record<string, string> = {
  OVERDUE: '반납기한 초과',
  UNAUTHORIZED_USE: '무단 사용',
};

const AdminMemberDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  const [member, setMember] = useState<AdminUserDetailResponseDto | null>(null);
  const [rentals, setRentals] = useState<UserRentalHistoryDto[]>([]);
  const [localStatus, setLocalStatus] = useState<'ACTIVE' | 'BANNED'>('ACTIVE');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const load = async () => {
      try {
        setLoading(true);
        const [detail, rentalData] = await Promise.all([
          adminUserApi.getUserDetail(userId),
          adminRentalApi.getUserRentalHistory({ userId }),
        ]);
        setMember(detail);
        setLocalStatus(detail.status);
        setRentals(rentalData);
      } catch (err) {
        console.error('조회 실패', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId]);

  const handleSaveAndBack = async () => {
    try {
      await adminUserApi.updateUserStatus({ userId, status: localStatus });
      alert('상태가 변경되었습니다.');
      navigate('/admin/users');
    } catch {
      alert('상태 변경에 실패했습니다.');
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6c5ce7]"></div>
        <span className="ml-3 text-gray-500 text-sm">로딩 중...</span>
      </div>
    );
  if (!member)
    return <div className="p-10 text-gray-500">회원을 찾을 수 없습니다.</div>;

  return (
    <div className="pt-2 pb-10 w-full mx-auto text-left">
      <div className="w-[90%] mx-auto text-left">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            회원관리 상세
          </h2>
          <div className="flex gap-2">
            <button
              className="border border-[#6c5ce7] text-[#6c5ce7] bg-white px-4 py-1.5 rounded-md font-semibold text-sm hover:bg-indigo-50 transition"
              onClick={() => navigate(`/admin/users/${member.userId}/penalty`)}
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
        <div className="bg-white border border-gray-200 rounded-[15px] p-[50px] min-h-[850px] shadow-sm flex flex-col w-full h-full">
          <div className="flex gap-20">
            <div className="flex-1">
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
                    {member.userName} ({member.studentNum})
                  </span>
                  <div className="mt-1.5 text-sm text-gray-500">
                    <span>{ROLE_LABEL[member.role]}</span>
                    <span className="ml-4 font-medium text-[#6c5ce7]">
                      {STATUS_LABEL[localStatus]}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[13px] font-medium text-gray-500 whitespace-nowrap">
                  상태 변경 :
                </span>
                <div className="flex gap-1.5">
                  {(['ACTIVE', 'BANNED'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setLocalStatus(s)}
                      className={`px-3 py-1 rounded text-xs transition-all border ${localStatus === s ? (s === 'BANNED' ? 'bg-[#e53e3e] border-[#e53e3e] text-white font-bold' : 'bg-[#6c5ce7] border-[#6c5ce7] text-white font-bold') : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                    >
                      {STATUS_LABEL[s]}
                    </button>
                  ))}
                </div>
              </div>
              <hr className="border-t border-gray-100 my-8" />
              <div className="flex justify-between items-center mb-10">
                <span className="text-sm text-gray-700">
                  연락처 :{' '}
                  <strong className="ml-1 text-gray-900">
                    {member.phoneNum || '-'}
                  </strong>
                </span>
              </div>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800">징계내역</h3>
                  <button
                    className="text-[#ff4d4f] border border-[#ff4d4f] px-3 py-1 rounded text-xs font-semibold hover:bg-red-50 transition"
                    onClick={() =>
                      navigate(`/admin/users/${member.userId}/penalty`)
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
                    {member.penalties.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-8 text-center text-gray-400 text-sm"
                        >
                          징계 내역이 없습니다.
                        </td>
                      </tr>
                    ) : (
                      member.penalties.map(
                        (p: AdminUserPenaltyDto, idx: number) => (
                          <tr
                            key={p.penaltyId}
                            className="text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <td className="py-4 px-2">{idx + 1}</td>
                            <td className="py-4 px-2">
                              {p.createdAt
                                ? new Date(p.createdAt).toLocaleDateString(
                                    'ko-KR',
                                  )
                                : '-'}
                            </td>
                            <td className="py-4 px-2 font-semibold">
                              {p.itemName}
                            </td>
                            <td className="py-4 px-2 text-gray-500">
                              {PENALTY_LABEL[p.penaltyType] || p.penaltyType}
                            </td>
                          </tr>
                        ),
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  대여 중인 물품
                </h3>
                <button
                  className="text-[#6c5ce7] border border-[#6c5ce7] px-3 py-1 rounded text-xs font-semibold hover:bg-indigo-50 transition"
                  onClick={() =>
                    navigate(`/admin/users/${member.userId}/rental-edit`)
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
                  {rentals.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="py-8 text-center text-gray-400"
                      >
                        대여 내역이 없습니다.
                      </td>
                    </tr>
                  ) : (
                    rentals.map((r) => (
                      <tr
                        key={r.rentalId}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-2 font-semibold">
                          {r.itemName}
                        </td>
                        <td className="py-4 px-2">
                          {r.rentDate?.substring(0, 10) || '-'}
                        </td>
                        <td className="py-4 px-2 font-bold text-red-500">
                          {r.dueDate?.substring(0, 10) || '-'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMemberDetail;
