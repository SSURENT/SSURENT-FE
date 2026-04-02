import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminMemberDetail.css';

interface Rental {
  id: number;
  item: string;
  rentDate: string;
  dueDate: string;
}

const AdminRentalEdit: React.FC = () => {
  const navigate = useNavigate();

  const [rentals, setRentals] = useState<Rental[]>([
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

  const [selectedRental, setSelectedRental] = useState<Rental | null>(
    rentals[0],
  );
  const [editItem, setEditItem] = useState('');
  const [editRentDate, setEditRentDate] = useState('');
  const [editDueDate, setEditDueDate] = useState('');

  // 추가 폼
  const [addMode, setAddMode] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [newRentDate, setNewRentDate] = useState('');
  const [newDueDate, setNewDueDate] = useState('');

  const handleSelect = (r: Rental) => {
    setSelectedRental(r);
    setEditItem(r.item);
    setEditRentDate(r.rentDate);
    setEditDueDate(r.dueDate);
  };

  const handleSaveEdit = () => {
    if (!selectedRental) return;
    setRentals((prev) =>
      prev.map((r) =>
        r.id === selectedRental.id
          ? {
              ...r,
              item: editItem,
              rentDate: editRentDate,
              dueDate: editDueDate,
            }
          : r,
      ),
    );
    setSelectedRental({
      ...selectedRental,
      item: editItem,
      rentDate: editRentDate,
      dueDate: editDueDate,
    });
    alert('수정되었습니다.');
  };

  const handleDelete = () => {
    if (!selectedRental) return;
    if (window.confirm('해당 대여 내역을 삭제하시겠습니까?')) {
      const updated = rentals.filter((r) => r.id !== selectedRental.id);
      setRentals(updated);
      setSelectedRental(updated[0] ?? null);
    }
  };

  const handleAdd = () => {
    if (!newItem || !newRentDate || !newDueDate) return;
    const newEntry: Rental = {
      id: Date.now(),
      item: newItem,
      rentDate: newRentDate,
      dueDate: newDueDate,
    };
    setRentals((prev) => [...prev, newEntry]);
    handleSelect(newEntry);
    setNewItem('');
    setNewRentDate('');
    setNewDueDate('');
    setAddMode(false);
  };

  return (
    <div className="admin-detail-container">
      <div className="detail-header-row">
        <h1 className="detail-title">대여내역 수정</h1>
        <button className="btn-view-all" onClick={() => navigate(-1)}>
          돌아가기
        </button>
      </div>

      <div className="detail-main-card">
        <div className="edit-layout" style={{ display: 'flex', gap: '32px' }}>
          {/* 왼쪽: 목록 */}
          <div className="edit-left" style={{ flex: 1 }}>
            <div
              className="list-header"
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '10px',
              }}
            >
              <button
                className="btn-outline-purple"
                onClick={() => setAddMode((v) => !v)}
              >
                내역추가
              </button>
            </div>

            {/* 추가 폼 */}
            {addMode && (
              <div className="add-form">
                <input
                  type="text"
                  placeholder="물품명 (예: 우산(101))"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="대여일 (예: 2026.01.25)"
                  value={newRentDate}
                  onChange={(e) => setNewRentDate(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="반납기한 (예: 2026.01.28)"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                />
                <div className="add-form-btns">
                  <button className="btn-outline-purple" onClick={handleAdd}>
                    저장
                  </button>
                  <button
                    className="btn-cancel-sm"
                    onClick={() => setAddMode(false)}
                  >
                    취소
                  </button>
                </div>
              </div>
            )}

            <table className="edit-table">
              <thead>
                <tr>
                  <th>물품명</th>
                  <th>대여일</th>
                  <th>반납기한</th>
                </tr>
              </thead>
              <tbody>
                {rentals.map((r) => (
                  <tr
                    key={r.id}
                    className={selectedRental?.id === r.id ? 'selected' : ''}
                    onClick={() => handleSelect(r)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{r.item}</td>
                    <td>{r.rentDate}</td>
                    <td>{r.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 오른쪽: 수정 폼 */}
          <div className="edit-right" style={{ width: '240px', flexShrink: 0 }}>
            {selectedRental ? (
              <div className="penalty-detail-view">
                <div className="input-group">
                  <label>물품명</label>
                  <input
                    type="text"
                    value={editItem}
                    onChange={(e) => setEditItem(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>대여일</label>
                  <input
                    type="text"
                    value={editRentDate}
                    onChange={(e) => setEditRentDate(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>반납기한</label>
                  <input
                    type="text"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                  />
                </div>
                <div
                  className="action-row"
                  style={{
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'flex-end',
                  }}
                >
                  <button
                    className="btn-outline-purple small"
                    onClick={handleSaveEdit}
                  >
                    수정
                  </button>
                  <button
                    className="btn-outline-purple small"
                    style={{ borderColor: '#e53e3e', color: '#e53e3e' }}
                    onClick={handleDelete}
                  >
                    삭제
                  </button>
                </div>
              </div>
            ) : (
              <div className="empty-view">항목을 선택해주세요.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRentalEdit;
