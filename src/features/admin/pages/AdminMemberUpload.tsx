import React, { useState } from 'react';
import './AdminMemberUpload.css';

interface PreviewData {
  studentId: string;
  name: string;
  phone: string;
}

const AdminMemberUpload: React.FC = () => {
  const [activeTab, setActiveTab] = useState('전체회원갱신');
  const [fileName, setFileName] = useState('파일이름파일이름파일이름.exel');

  // 미리보기 샘플 데이터
  const [previewList] = useState<PreviewData[]>(
    Array(10).fill({
      studentId: 'XXXXXXXX',
      name: 'OOO',
      phone: '010-7262-7505',
    }),
  );

  return (
    <div className="admin-upload-container">
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

      <div className="content-card upload-card">
        <div className="upload-warning">
          *전체 회원 정보를 갱신하는 것이므로 엑셀 데이터 맞는지 확인할 것*
        </div>

        <div className="upload-controls">
          <div className="file-info-row">
            <span className="file-name">{fileName}</span>
            <div className="upload-buttons">
              <label htmlFor="file-upload" className="btn-upload">
                ☁️ Upload File
              </label>
              <input id="file-upload" type="file" style={{ display: 'none' }} />
              <span className="file-limit">Max file size 100MB.</span>
            </div>
          </div>
        </div>

        <div className="preview-table-container">
          <table className="preview-table">
            <thead>
              <tr>
                <th>학번</th>
                <th>이름</th>
                <th>전화번호</th>
              </tr>
            </thead>
            <tbody>
              {previewList.map((data, idx) => (
                <tr key={idx}>
                  <td>{data.studentId}</td>
                  <td>{data.name}</td>
                  <td>{data.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="upload-footer">
          <button className="btn-submit-red">갱신하기</button>
        </div>
      </div>
    </div>
  );
};

export default AdminMemberUpload;
