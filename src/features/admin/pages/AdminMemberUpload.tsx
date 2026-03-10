import React from 'react';

const AdminMemberUpload: React.FC = () => {
  return (
    <div className="upload-content-wrapper">
      <div className="upload-warning">
        *전체 회원 정보를 갱신하는 것이므로 엑셀 데이터 맞는지 확인할 것*
      </div>
      <div className="upload-controls">
        <span className="file-name">파일이름파일이름파일이름.exel</span>
        <div className="upload-buttons">
          <label className="btn-upload">☁️ Upload File</label>
          <span className="file-limit">Max file size 100MB.</span>
        </div>
      </div>
      <div className="upload-footer">
        <button className="btn-submit-red">갱신하기</button>
      </div>
    </div>
  );
};

export default AdminMemberUpload;
