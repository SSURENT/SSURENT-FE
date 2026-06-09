import React, { useState, useEffect } from 'react';
import { adminCategoryApi } from '../../../api/endpoints/AdminCategory';
import { adminItemApi } from '../../../api/endpoints/AdminItem';
import { AdminCategoryResponseDto } from '../../../api/dto/AdminCategory.dto';

// API 응답 필드명이 다를 수 있으므로 유연하게 처리
interface DisplayItem {
  id: number;
  name: string;
  description: string;
  status: string;
  condition: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normalizeItem = (raw: any): DisplayItem => ({
  id: raw.itemId ?? raw.id ?? 0,
  name: raw.itemName ?? raw.name ?? `물품 ${raw.itemId ?? raw.id ?? '?'}`,
  description: raw.itemDescription ?? raw.description ?? '',
  status: raw.status ?? 'ACTIVE',
  condition: raw.condition ?? 'KEEP',
});

const AdminItems: React.FC = () => {
  const [isItemModalOpen, setItemModalOpen] = useState(false);
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  const [items, setItems] = useState<DisplayItem[]>([]);
  const [categories, setCategories] = useState<AdminCategoryResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [searchCode, setSearchCode] = useState('');

  const [newItemCategory, setNewItemCategory] = useState('');
  const [newItemCode, setNewItemCode] = useState('');
  const [newCategory, setNewCategory] = useState('');

  // 카테고리 목록 조회
  const fetchCategories = async () => {
    try {
      const data = await adminCategoryApi.getCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('카테고리 목록 조회 실패', err);
    }
  };

  // 물품 목록 조회
  const fetchItems = async (categoryId?: number) => {
    try {
      setLoading(true);
      if (categoryId != null) {
        // 특정 카테고리 조회
        const data = await adminItemApi.getItems(categoryId);
        const arr = Array.isArray(data) ? data : [];
        setItems(arr.map(normalizeItem));
      } else {
        // 백엔드에서 제공하는 단일 엔드포인트 사용 (전체 조회)
        const data = await adminItemApi.getItems();
        const arr = Array.isArray(data) ? data : [];
        setItems(arr.map(normalizeItem));
      }
    } catch (err) {
      console.error('물품 목록 조회 실패', err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchCategories();
    };
    init();
  }, []);

  // 카테고리 로딩 완료 후 전체 물품 조회
  useEffect(() => {
    if (categories.length > 0) {
      fetchItems();
    }
  }, [categories]);

  // 카테고리 변경 시 물품 재조회
  const handleCategoryChange = (value: string) => {
    if (value === '전체') {
      setSelectedCategoryId(null);
      fetchItems();
    } else {
      const catId = Number(value);
      setSelectedCategoryId(catId);
      fetchItems(catId);
    }
  };

  // 물품 추가 (더블클릭 방지)
  const handleAddItem = async () => {
    if (!newItemCategory || !newItemCode || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await adminItemApi.createItem({
        categoryName: newItemCategory,
        itemNum: newItemCode,
      });
      setNewItemCategory('');
      setNewItemCode('');
      setItemModalOpen(false);
      await fetchItems(selectedCategoryId ?? undefined);
    } catch (err) {
      console.error('물품 추가 실패', err);
      alert('물품 추가에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 카테고리 추가 (더블클릭 방지)
  const handleAddCategory = async () => {
    if (!newCategory || isSubmitting) return;
    if (categories.some((c) => c.categoryName === newCategory)) {
      alert('이미 존재하는 카테고리입니다.');
      return;
    }
    setIsSubmitting(true);
    try {
      await adminCategoryApi.createCategory({ categoryName: newCategory });
      setNewCategory('');
      await fetchCategories();
    } catch (err) {
      console.error('카테고리 추가 실패', err);
      alert('카테고리 추가에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 카테고리 삭제
  const handleDeleteCategory = async (cat: AdminCategoryResponseDto) => {
    if (isSubmitting) return;
    if (window.confirm(`"${cat.categoryName}" 카테고리를 삭제하시겠습니까?`)) {
      setIsSubmitting(true);
      try {
        await adminCategoryApi.deleteCategory(cat.categoryId);
        await fetchCategories();
      } catch (err) {
        console.error('카테고리 삭제 실패', err);
        alert('카테고리 삭제에 실패했습니다.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // 물품 상태 토글 (ACTIVE ↔ INACTIVE)
  const handleToggleItemStatus = async (item: DisplayItem) => {
    if (isSubmitting) return;
    const newStatus = item.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    setIsSubmitting(true);
    try {
      await adminItemApi.updateItemStatus({
        itemUpdates: [
          { itemId: item.id, status: newStatus as 'ACTIVE' | 'INACTIVE' },
        ],
      });
      await fetchItems(selectedCategoryId ?? undefined);
    } catch (err) {
      console.error('물품 상태 변경 실패', err);
      alert('물품 상태 변경에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 검색
  const filteredItems = items.filter((item) =>
    searchCode.trim() === ''
      ? true
      : item.name.toLowerCase().includes(searchCode.trim().toLowerCase()) ||
        item.description
          ?.toLowerCase()
          .includes(searchCode.trim().toLowerCase()),
  );

  const getConditionLabel = (condition: string) => {
    switch (condition) {
      case 'KEEP':
        return '보관중';
      case 'RENT':
        return '대여중';
      case 'OVERDUE':
        return '연체';
      default:
        return condition || '-';
    }
  };

  const getConditionBadge = (condition: string) => {
    switch (condition) {
      case 'RENT':
        return 'bg-orange-100 text-orange-600 border border-orange-200';
      case 'KEEP':
        return 'bg-blue-100 text-blue-600 border border-blue-200';
      case 'OVERDUE':
        return 'bg-red-100 text-red-600 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-500 border border-gray-200';
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'ACTIVE'
      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
      : 'bg-slate-100 text-slate-500 border border-slate-200';
  };

  return (
    <div className="pt-2 pb-10 w-full mx-auto text-left">
      <div className="w-[90%] mx-auto text-left">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            물품관리
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-[15px] p-8 md:p-[50px] min-h-[850px] shadow-sm flex flex-col w-full h-full">
          {/* 컨트롤 영역 */}
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <div className="flex gap-4 items-center">
              <select
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-bold bg-white cursor-pointer hover:bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-100 transition"
                value={selectedCategoryId ?? '전체'}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="전체">전체</option>
                {categories.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="물품명을 입력하세요"
                className="border border-gray-200 rounded-full px-6 py-2 w-64 outline-none focus:ring-2 focus:ring-indigo-100 text-sm bg-[#fcfcfc]"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
              />
              <span className="text-xs text-gray-400 font-medium">
                총 {filteredItems.length}건
              </span>
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

          {/* 물품 카드 그리드 */}
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6c5ce7]"></div>
              <span className="ml-3 text-gray-500 text-sm">로딩 중...</span>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              물품이 없습니다.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 flex-1 content-start">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`min-h-[150px] border rounded-2xl p-5 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all cursor-default group shadow-sm ${
                    item.status === 'INACTIVE'
                      ? 'border-gray-300 bg-gray-50 opacity-60'
                      : 'border-[#e8e8e8] bg-white'
                  }`}
                >
                  {/* 상단: 물품명 + 상태 뱃지 */}
                  <div className="mb-3">
                    <p className="text-lg font-bold text-gray-800 group-hover:text-[#6c5ce7] transition-colors leading-snug break-words">
                      {item.name}
                    </p>
                    <div className="flex gap-1.5 mt-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${getStatusBadge(item.status)}`}
                      >
                        {item.status === 'ACTIVE' ? '활성' : '비활성'}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${getConditionBadge(item.condition)}`}
                      >
                        {getConditionLabel(item.condition)}
                      </span>
                    </div>
                  </div>
                  {/* 하단: 활성화/비활성화 버튼 */}
                  <div className="flex justify-end items-center mt-2">
                    <button
                      onClick={() => handleToggleItemStatus(item)}
                      disabled={isSubmitting}
                      className={`text-[11px] font-bold px-3 py-1 rounded-lg transition-colors whitespace-nowrap ${
                        item.status === 'ACTIVE'
                          ? 'text-red-500 bg-red-50 hover:bg-red-100 border border-red-200'
                          : 'text-green-600 bg-green-50 hover:bg-green-100 border border-green-200'
                      } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {item.status === 'ACTIVE' ? '비활성화' : '활성화'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 물품 추가 모달 */}
      {isItemModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-item-modal-title"
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => !isSubmitting && setItemModalOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape' && !isSubmitting) setItemModalOpen(false);
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
                value={newItemCategory}
                onChange={(e) => setNewItemCategory(e.target.value)}
                disabled={isSubmitting}
                autoFocus
              >
                <option value="" disabled>
                  카테고리 선택 (물품명)
                </option>
                {categories.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryName}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>

              <div className="mt-3" />

              <input
                type="text"
                placeholder="고유코드 (예: 101)"
                className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-100"
                value={newItemCode}
                onChange={(e) => setNewItemCode(e.target.value)}
                disabled={isSubmitting}
                onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
              />
            </div>
            <div className="flex justify-end gap-2 mt-8">
              <button
                onClick={handleAddItem}
                disabled={isSubmitting || !newItemCategory || !newItemCode}
                className={`px-5 py-2.5 bg-[#6c5ce7] text-white rounded-xl font-bold hover:bg-[#5a4ccb] transition ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? '추가 중...' : '추가'}
              </button>
              <button
                onClick={() => setItemModalOpen(false)}
                disabled={isSubmitting}
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
          onClick={() => !isSubmitting && setCategoryModalOpen(false)}
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
                  key={cat.categoryId}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {cat.categoryName}
                  </span>
                  <button
                    onClick={() => handleDeleteCategory(cat)}
                    disabled={isSubmitting}
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
                disabled={isSubmitting}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
              />
              <button
                onClick={handleAddCategory}
                disabled={isSubmitting || !newCategory}
                className={`bg-indigo-50 text-[#6c5ce7] font-bold px-4 rounded-xl hover:bg-indigo-100 transition ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? '등록 중...' : '등록'}
              </button>
            </div>
            <div className="flex justify-end mt-8">
              <button
                onClick={() => setCategoryModalOpen(false)}
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-[#6c5ce7] text-white rounded-xl font-bold hover:bg-[#5a4ccb] transition shadow-md"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminItems;
