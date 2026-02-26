import React from 'react';
import { Form, Button, Dropdown, Card, Row, Col } from 'react-bootstrap';
import { Trash3 } from 'react-bootstrap-icons';
import './Admin.css';

const AdminItems: React.FC = () => {
  const mockItems = [
    { id: '1', name: '우산', code: '101', status: '대여중', active: '활성화' },
    { id: '2', name: '우산', code: '102', status: '보관중', active: '활성화' },
    { id: '3', name: '우산', code: '103', status: '보관중', active: '활성화' },
    { id: '4', name: '우산', code: '104', status: '보관중', active: '활성화' },
  ];

  return (
    <div className="admin-items-container py-4">
      <div className="mb-4">
        <small className="text-muted">물품 상태관리</small>
        <h2 className="fw-bold">물품관리</h2>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-2">
          <Dropdown>
            <Dropdown.Toggle variant="light" className="border">
              우산
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>우산</Dropdown.Item>
              <Dropdown.Item>자</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="position-relative">
            <Form.Control
              placeholder="검색어를 입력하세요"
              className="ps-4"
              style={{ width: '250px' }}
            />
          </div>
        </div>
        <div className="d-flex gap-2">
          <Button variant="outline-primary">물품추가</Button>
          <Button variant="outline-primary">카테고리 변경</Button>
        </div>
      </div>

      <div className="p-4 border rounded-3 bg-white shadow-sm">
        <Row xs={1} sm={2} lg={4} className="g-4">
          {mockItems.map((item) => (
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
                        <Dropdown.Item>활성화</Dropdown.Item>
                        <Dropdown.Item>비활성화</Dropdown.Item>
                        <Dropdown.Item className="bg-primary text-white">
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
      </div>

      <div className="text-end mt-4">
        <Button variant="primary" className="px-5">
          변경사항 저장하기
        </Button>
      </div>
    </div>
  );
};

export default AdminItems;
