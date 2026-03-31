import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { useMemberContext, Member } from '../context/MemberContext';

const AdminMemberUpload: React.FC = () => {
  const { setMembers } = useMemberContext();
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // 엑셀 파싱 로직
  const parseExcelFile = (file: File) => {
    setFileName(file.name);
    const sizeInMB = file.size / (1024 * 1024);
    setFileSize(
      sizeInMB > 1
        ? `${sizeInMB.toFixed(2)} MB`
        : `${(file.size / 1024).toFixed(2)} KB`,
    );

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      setPreviewData(data);
    };
    reader.readAsBinaryString(file);
    setIsDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) parseExcelFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) parseExcelFile(file);
  };

  const handleClear = () => {
    setFileName('');
    setFileSize('');
    setPreviewData([]);
  };

  const handleUpdate = () => {
    if (previewData.length === 0) return;
    if (window.confirm('전체 회원 정보를 갱신하시겠습니까?')) {
      const newMembers: Member[] = previewData.map((item, index) => ({
        id: String(Date.now() + index),
        name: item['이름'] || '',
        studentId: String(item['학번'] || ''),
        phone: item['전화번호'] || '',
        role: '일반학우',
        status: 'active',
      }));
      setMembers(newMembers);
      alert('회원 정보가 성공적으로 갱신되었습니다.');
      handleClear();
    }
  };

  return (
    <div className="flex flex-col gap-8 p-2">
      {/* ⚠️ 경고 섹션 */}
      <div className="flex items-start gap-4 p-5 rounded-xl bg-orange-50 border border-orange-200 shadow-sm">
        <svg
          className="w-6 h-6 text-orange-500 mt-0.5 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <div>
          <h4 className="text-orange-900 font-bold">회원 정보 갱신 주의사항</h4>
          <p className="text-orange-800 text-sm mt-1 leading-relaxed">
            업로드 시 기존 데이터는 <strong>전부 삭제</strong>되고 새로운 엑셀
            데이터로 대체됩니다. <br />
            파일의 [학번, 이름, 전화번호] 컬럼명이 정확한지 확인해 주세요.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ☁️ 업로드 영역 */}
        <div className="flex flex-col gap-4">
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`relative flex flex-col items-center justify-center h-64 rounded-2xl border-2 border-dashed transition-all cursor-pointer
              ${isDragging ? 'border-indigo-500 bg-indigo-50 scale-[1.01]' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'}
              ${fileName ? 'border-emerald-400 bg-emerald-50' : ''}`}
          >
            <input
              type="file"
              className="hidden"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
            />

            {!fileName ? (
              <div className="text-center">
                <svg
                  className="w-12 h-12 mx-auto mb-4 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-slate-600 font-medium">
                  엑셀 파일을 드래그하거나 클릭하세요
                </p>
                <p className="text-slate-400 text-xs mt-2">
                  XLSX, XLS 형식 지원 (최대 100MB)
                </p>
              </div>
            ) : (
              <div className="w-full px-8 text-center">
                <div className="inline-flex p-3 rounded-full bg-emerald-100 text-emerald-600 mb-3">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-slate-800 font-bold truncate">{fileName}</p>
                <p className="text-slate-500 text-xs mt-1">{fileSize}</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleClear();
                  }}
                  className="mt-4 text-xs text-red-500 font-medium hover:underline"
                >
                  파일 취소하기
                </button>
              </div>
            )}
          </label>
        </div>

        {/* 📊 미리보기 영역 */}
        <div className="flex flex-col p-6 rounded-2xl border border-slate-200 bg-white shadow-sm h-64 overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h5 className="font-bold text-slate-800">
              데이터 미리보기 (상위 5건)
            </h5>
            {previewData.length > 0 && (
              <span className="text-[11px] px-2 py-1 bg-indigo-100 text-indigo-600 rounded-lg font-bold">
                총 {previewData.length}명 확인됨
              </span>
            )}
          </div>

          <div className="flex-1 overflow-auto rounded-lg border border-slate-100">
            {previewData.length > 0 ? (
              <table className="w-full text-xs text-center border-collapse">
                <thead className="sticky top-0 bg-slate-50 border-bottom border-slate-100">
                  <tr className="text-slate-500">
                    <th className="py-2.5 px-3 font-semibold">학번</th>
                    <th className="py-2.5 px-3 font-semibold">이름</th>
                    <th className="py-2.5 px-3 font-semibold">전화번호</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-700">
                  {previewData.slice(0, 5).map((row, i) => (
                    <tr key={i}>
                      <td className="py-2.5 px-3">{row['학번']}</td>
                      <td className="py-2.5 px-3">{row['이름']}</td>
                      <td className="py-2.5 px-3">{row['전화번호']}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 italic">
                <p>업로드 시 데이터 구조가 표시됩니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🚀 제출 버튼 */}
      <div className="flex justify-end pt-4">
        <button
          onClick={handleUpdate}
          disabled={previewData.length === 0}
          className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg
            ${
              previewData.length > 0
                ? 'bg-red-600 text-white hover:bg-red-700 hover:shadow-red-200 active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
        >
          {previewData.length > 0
            ? '전체 회원 데이터 갱신하기'
            : '데이터를 먼저 업로드하세요'}
        </button>
      </div>
    </div>
  );
};

export default AdminMemberUpload;
