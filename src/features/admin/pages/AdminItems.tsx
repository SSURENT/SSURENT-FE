import React, { useState } from 'react';
import { Form, Button, Dropdown, Card, Row, Col, Modal } from 'react-bootstrap';
import { Trash3 } from 'react-bootstrap-icons';
import './Admin.css';

type ActiveStatus = '활성화' | '비활성화' | '분실';

interface Item {
  id: string;
  name: string;
  code: string;
  status: string;
  active: ActiveStatus;
}

const INITIAL_CATEGORIES = ['우산', '자', '무선마우스', '보조배터리'];

const INITIAL_ITEMS: Item[] = [
  { id: '1', name: '우산', code: '101', status: '대여중', active: '활성화' },
  { id: '2', name: '우산', code: '102', status: '보관중', active: '활성화' },
  { id: '3', name: '우산', code: '103', status: '보관중', active: '활성화' },
  { id: '4', name: '우산', code: '104', status: '보관중', active: '활성화' },
];

const AdminItems: React.FC = () => {
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);
  const [categories, setCategories] = useState<string[]>(INITIAL_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchValue, setSearchValue] = useState('');

  // 물품추가 모달
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newStatus, setNewStatus] = useState('보관중');

  // 카테고리 변경 모달
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  // 필터링
  const filtered = items.filter((item) => {
    const matchCategory =
      selectedCategory === '전체' || item.name === selectedCategory;
    const matchSearch =
      searchValue.trim() === '' ||
      item.name.includes(searchValue.trim()) ||
      item.code.includes(searchValue.trim());
    return matchCategory && matchSearch;
  });

  const handleActiveChange = (id: string, value: ActiveStatus) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, active: value } : item)),
    );
  };

  const handleDelete = (id: string) => {
    if (window.confirm('해당 물품을 삭제하시겠습니까?')) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleAddItem = () => {
    if (!newName.trim() || !newCode.trim()) return;
    const newItem: Item = {
      id: Date.now().toString(),
      name: newName.trim(),
      code: newCode.trim(),
      status: newStatus,
      active: '활성화',
    };
    setItems((prev) => [...prev, newItem]);
    setNewName('');
    setNewCode('');
    setNewStatus('보관중');
    setShowAddModal(false);
  };

  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (!trimmed || categories.includes(trimmed)) return;
    setCategories((prev) => [...prev, trimmed]);
    setNewCategory('');
  };

  const handleDeleteCategory = (cat: string) => {
    setCategories((prev) => prev.filter((c) => c !== cat));
    if (selectedCategory === cat) setSelectedCategory('전체');
  };

  const handleSave = () => {
    // TODO: API 연동
    console.log('저장할 데이터:', items);
    alert('변경사항이 저장되었습니다.');
  };

  return (
    <div className="admin-items-container py-4">
      <div className="mb-4">
        <h2 className="fw-bold">물품관리</h2>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-2">
          {/* 물품 종류 필터 드롭다운 */}
          <Dropdown>
            <Dropdown.Toggle variant="light" className="border">
              {selectedCategory}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSelectedCategory('전체')}>
                전체
              </Dropdown.Item>
              {categories.map((cat) => (
                <Dropdown.Item
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  active={selectedCategory === cat}
                >
                  {cat}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          {/* 검색 */}
          <div className="position-relative">
            <Form.Control
              placeholder="검색어를 입력하세요"
              className="ps-4"
              style={{ width: '250px' }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex gap-2">
          <Button
            variant="outline-primary"
            onClick={() => setShowAddModal(true)}
          >
            물품추가
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => setShowCategoryModal(true)}
          >
            카테고리 변경
          </Button>
        </div>
      </div>

      {/* 카드 목록 */}
      <div className="p-4 border rounded-3 bg-white shadow-sm">
        {filtered.length === 0 ? (
          <div className="text-center text-muted py-4">
            해당 물품이 없습니다.
          </div>
        ) : (
          <Row xs={1} sm={2} lg={4} className="g-4">
            {filtered.map((item) => (
              <Col key={item.id}>
                <Card className="h-100 border-0">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-4">
                      <h5 className="fw-bold mb-0">
                        {item.name}({item.code})
                      </h5>
                      <Trash3
                        className="text-muted"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDelete(item.id)}
                      />
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <span
                        className={`fw-bold ${item.status === '대여중' ? 'text-danger' : 'text-primary'}`}
                      >
                        {item.status}
                      </span>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="light"
                          size="sm"
                          className="border"
                        >
                          {item.active}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() =>
                              handleActiveChange(item.id, '활성화')
                            }
                          >
                            활성화
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              handleActiveChange(item.id, '비활성화')
                            }
                          >
                            비활성화
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="bg-primary text-white"
                            onClick={() => handleActiveChange(item.id, '분실')}
                          >
                            분실
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>

      <div className="text-end mt-4">
        <Button variant="primary" className="px-5" onClick={handleSave}>
          변경사항 저장하기
        </Button>
      </div>

      {/* ===== 물품추가 모달 ===== */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>물품 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>물품명</Form.Label>
            <Form.Select
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            >
              <option value="">카테고리 선택</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>코드번호</Form.Label>
            <Form.Control
              placeholder="예: 105"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>초기 상태</Form.Label>
            <Form.Select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="보관중">보관중</option>
              <option value="대여중">대여중</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            취소
          </Button>
          <Button
            variant="primary"
            onClick={handleAddItem}
            disabled={!newName || !newCode}
          >
            추가
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ===== 카테고리 변경 모달 ===== */}
      <Modal
        show={showCategoryModal}
        onHide={() => setShowCategoryModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>카테고리 변경</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            {categories.map((cat) => (
              <div
                key={cat}
                className="d-flex justify-content-between align-items-center py-2 border-bottom"
              >
                <span>{cat}</span>
                <Trash3
                  className="text-muted"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDeleteCategory(cat)}
                />
              </div>
            ))}
          </div>
          <div className="d-flex gap-2 mt-3">
            <Form.Control
              placeholder="새 카테고리 이름"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
            />
            <Button variant="outline-primary" onClick={handleAddCategory}>
              추가
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowCategoryModal(false)}>
            완료
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminItems;
