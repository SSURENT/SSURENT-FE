import React, { useState } from 'react';
import './AdminHelpers.css';

interface Helper {
  id: string;
  name: string;
  studentId: string;
  role: string;
}

const AdminHelpers: React.FC = () => {
  const [activeTab, setActiveTab] = useState('도우미관리');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // 샘플 데이터
  const helpers: Helper[] = [
    { id: '1', name: '양도영', studentId: '2024XXXX', role: '최고관리자' },
    { id: '2', name: '이웅재', studentId: '2024XXXX', role: '일반학우' },
    { id: '3', name: '김세훈', studentId: '2025XXXX', role: '관리자' },
    { id: '4', name: '오승연', studentId: '2024XXXX', role: '일반학우' },
  ];

  // 전체 선택/해제
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(helpers.map((h) => h.id));
    } else {
      setSelectedIds([]);
    }
  };

  // 개별 선택/해제
  const handleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDelete = () => {
    if (selectedIds.length === 0) return alert('삭제할 항목을 선택해주세요.');
    if (
      window.confirm(`${selectedIds.length}명의 도우미를 삭제하시겠습니까?`)
    ) {
      // 삭제 로직 실행
      console.log('Deleting:', selectedIds);
    }
  };

  return (
    <div className="admin-helpers-container">
      <div className="page-header-section">
        <h1 className="page-title">회원관리</h1>
        <div className="tab-menu">
          <span
            className={activeTab === '회원관리' ? 'active' : ''}
            onClick={() => setActiveTab('회원관리')}
          >
            회원관리
          </span>
          <span
            className={activeTab === '도우미관리' ? 'active' : ''}
            onClick={() => setActiveTab('도우미관리')}
          >
            도우미관리
          </span>
          <span
            className={activeTab === '전체회원갱신' ? 'active' : ''}
            onClick={() => setActiveTab('전체회원갱신')}
          >
            전체회원갱신
          </span>
        </div>
      </div>

      <div className="content-card">
        <div className="helper-table-actions">
          <button className="btn-delete-red" onClick={handleDelete}>
            삭제
          </button>
        </div>

        <table className="helper-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedIds.length === helpers.length}
                />
              </th>
              <th>이름(학번)</th>
              <th>역할</th>
            </tr>
          </thead>
          <tbody>
            {helpers.map((helper) => (
              <tr key={helper.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(helper.id)}
                    onChange={() => handleSelectOne(helper.id)}
                  />
                </td>
                <td>
                  {helper.name} ({helper.studentId})
                </td>
                <td>{helper.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHelpers;
