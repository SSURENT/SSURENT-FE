import React, { useState } from 'react';

interface Item {
  id: number;
  name: string;
  code: string;
  status: string;
  condition?: string;
}

const AdminItems: React.FC = () => {
  const [isItemModalOpen, setItemModalOpen] = useState(false);
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const [items, setItems] = useState<Item[]>([
    { id: 1, name: '우산', code: '101', status: '보관중', condition: 'normal' },
    { id: 2, name: '우산', code: '102', status: '대여중', condition: 'normal' },
    {
      id: 3,
      name: '보조배터리',
      code: '201',
      status: '보관중',
      condition: 'normal',
    },
    {
      id: 4,
      name: '충전케이블',
      code: '301',
      status: '대여중',
      condition: 'damaged',
    },
    { id: 5, name: '자', code: '401', status: '보관중', condition: 'lost' },
  ]);

  const [searchCode, setSearchCode] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [categories, setCategories] = useState([
    '자',
    '우산',
    '보조배터리',
    '충전케이블',
    '스테이플러',
    'CtoC',
  ]);

  const [newItemName, setNewItemName] = useState('');
  const [newItemCode, setNewItemCode] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const handleDeleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleAddItem = () => {
    if (!newItemName || !newItemCode) return;
    setItems([
      ...items,
      {
        id: Date.now(),
        name: newItemName,
        code: newItemCode,
        status: '보관중',
        condition: 'normal',
      },
    ]);
    setNewItemName('');
    setNewItemCode('');
    setItemModalOpen(false);
  };

  const handleAddCategory = () => {
    if (!newCategory || categories.includes(newCategory)) return;
    setCategories([...categories, newCategory]);
    setNewCategory('');
  };

  const handleDeleteCategory = (cat: string) => {
    if (items.some((item) => item.name === cat)) {
      alert('해당 카테고리에 속한 물품이 있어 삭제할 수 없습니다.');
      return;
    }
    setCategories(categories.filter((c) => c !== cat));
  };

  const handleSaveSystemData = async () => {
    setIsSaving(true);
    try {
      // TODO: Call real API endpoint (e.g., apiClient for sync)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert('데이터가 성공적으로 동기화되었습니다.');
    } catch (error) {
      alert('데이터 동기화 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="pt-2 pb-10 w-full mx-auto text-left">
      <div className="w-[90%] mx-auto text-left">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            물품관리
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-[15px] p-[50px] min-h-[850px] shadow-sm flex flex-col w-full h-full">
          {/* 컨트롤 영역 */}
          <div className="flex justify-between items-center mb-10">
            <div className="flex gap-4">
              <select
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-bold bg-white cursor-pointer hover:bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-100 transition"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="전체">전체</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="물품 코드를 입력하세요"
                className="border border-gray-200 rounded-full px-6 py-2 w-80 outline-none focus:ring-2 focus:ring-indigo-100 text-sm bg-[#fcfcfc]"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setItemModalOpen(true)}
                className="bg-[#6c5ce7] text-white px-5 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-[#5a4ccb] transition"
              >
                물품 추가
              </button>
              <button
                onClick={() => setCategoryModalOpen(true)}
                className="bg-white border border-[#6c5ce7] text-[#6c5ce7] px-5 py-2 rounded-lg text-sm font-bold hover:bg-indigo-50 transition"
              >
                카테고리 설정
              </button>
            </div>
          </div>

          {/* 물품 그리드: MemberList와 통일된 레이아웃 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 flex-1">
            {items
              .filter(
                (item) =>
                  selectedCategory === '전체' || item.name === selectedCategory,
              )
              .filter((item) => item.code.includes(searchCode.trim()))
              .map((item) => (
                <div
                  key={item.id}
                  className="h-44 border border-[#f0f0f0] rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer bg-white group shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-lg font-bold text-gray-800 group-hover:text-[#6c5ce7] transition-colors">
                      {item.name}({item.code})
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteItem(item.id);
                      }}
                      className="text-gray-300 hover:text-red-500 text-xl transition-colors font-bold leading-none select-none"
                      title="물품 삭제"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full ${item.status === '대여중' ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-500'}`}
                    >
                      {item.status}
                    </span>
                    <span className="text-[10px] bg-slate-100 px-3 py-1 rounded-full font-bold text-slate-500">
                      {item.condition === 'normal'
                        ? '정상'
                        : item.condition === 'damaged'
                          ? '파손'
                          : item.condition === 'lost'
                            ? '분실'
                            : '기타'}
                    </span>
                  </div>
                </div>
              ))}
          </div>

          {/* 하단 저장 버튼 */}
          <div className="mt-10 pt-8 border-t border-gray-100 flex justify-end">
            <button
              onClick={handleSaveSystemData}
              disabled={isSaving}
              className="bg-[#6c5ce7] text-white px-10 py-3 rounded-xl text-sm font-bold shadow-lg hover:bg-[#5a4ccb] active:scale-95 transition-all disabled:bg-gray-400"
            >
              {isSaving ? '동기화 중...' : '시스템 데이터 동기화 및 저장'}
            </button>
          </div>
        </div>
      </div>

      {/* 물품 추가 모달 */}
      {isItemModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-item-modal-title"
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setItemModalOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setItemModalOpen(false);
          }}
        >
          <div
            className="bg-white rounded-2xl p-8 w-full max-w-[420px] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              id="add-item-modal-title"
              className="text-xl font-bold text-gray-800 mb-6"
            >
              물품 추가
            </h3>
            <div className="space-y-4">
              <select
                className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-100 cursor-pointer bg-white"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                autoFocus
              >
                <option value="" disabled>
                  카테고리 선택 (물품명)
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="고유코드 (예: 101)"
                className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-100"
                value={newItemCode}
                onChange={(e) => setNewItemCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
              />
            </div>
            <div className="flex justify-end gap-2 mt-8">
              <button
                onClick={handleAddItem}
                className="px-5 py-2.5 bg-[#6c5ce7] text-white rounded-xl font-bold hover:bg-[#5a4ccb] transition"
              >
                추가
              </button>
              <button
                onClick={() => setItemModalOpen(false)}
                className="px-5 py-2.5 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 카테고리 설정 모달 */}
      {isCategoryModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setCategoryModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-8 w-full max-w-[420px] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              카테고리 설정
            </h3>
            <div className="space-y-2 mb-6 max-h-40 overflow-y-auto pr-2">
              {categories.map((cat) => (
                <div
                  key={cat}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {cat}
                  </span>
                  <button
                    onClick={() => handleDeleteCategory(cat)}
                    className="text-red-400 text-xs hover:text-red-600 font-bold"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="새 카테고리 기입"
                className="flex-1 border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-100"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
              />
              <button
                onClick={handleAddCategory}
                className="bg-indigo-50 text-[#6c5ce7] font-bold px-4 rounded-xl hover:bg-indigo-100 transition"
              >
                등록
              </button>
            </div>
            <div className="flex justify-end mt-8">
              <button
                onClick={() => setCategoryModalOpen(false)}
                className="px-5 py-2.5 bg-[#6c5ce7] text-white rounded-xl font-bold hover:bg-[#5a4ccb] transition shadow-md"
              >
                저장 및 닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminItems;
