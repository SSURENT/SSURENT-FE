import React, { useState } from 'react';

const AdminHelpers: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const helpers = [
    { id: '1', name: '양도영', studentId: '2024XXXX', role: '최고관리자' },
    { id: '2', name: '이웅재', studentId: '2024XXXX', role: '일반학우' },
    { id: '3', name: '김세훈', studentId: '2025XXXX', role: '관리자' },
    { id: '4', name: '오승연', studentId: '2024XXXX', role: '일반학우' },
  ];

  return (
    <div className="helper-content-wrapper">
      <div className="helper-table-actions">
        <button className="btn-delete-red">삭제</button>
      </div>
      <table className="helper-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>이름(학번)</th>
            <th>역할</th>
          </tr>
        </thead>
        <tbody>
          {helpers.map((h) => (
            <tr key={h.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(h.id)}
                  onChange={() => {}}
                />
              </td>
              <td>
                {h.name} ({h.studentId})
              </td>
              <td>{h.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHelpers;
