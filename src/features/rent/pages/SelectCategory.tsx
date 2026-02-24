import { useState } from 'react';
import { Category } from '../../../types/category';
import { getCategories } from '../../../hooks/getCategory';

type Props = {
  onNext: (categoryId: number) => void;
};

export default function SelectCategory({ onNext }: Props) {
  const { categories, isLoading, isError } = getCategories();

  const [category, setCategory] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // 🔹 로딩 UI
  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary mb-3" />
        <div>카테고리 불러오는 중...</div>
      </div>
    );
  }

  // 🔹 에러 UI
  if (isError) {
    return (
      <div className="alert alert-danger text-center">카테고리 조회 실패</div>
    );
  }

  const formatPhoneNumber = (value: string) => {
    const numbersOnly = value.replace(/\D/g, '');

    if (numbersOnly.length <= 3) return numbersOnly;
    if (numbersOnly.length <= 7)
      return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;

    return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(
      3,
      7,
    )}-${numbersOnly.slice(7, 11)}`;
  };

  const validatePhone = (value: string) => {
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    return phoneRegex.test(value);
  };

  const handleNext = () => {
    if (!category) {
      alert('대여할 물품을 선택해주세요.');
      return;
    }

    if (!validatePhone(phone)) {
      setPhoneError('유효하지 않은 입력입니다.');
      return;
    }

    setPhoneError('');
    onNext(Number(category));
  };

  return (
    <>
      {/* ===== 1행 : 물품 선택 / 대여 안내 ===== */}
      <div className="row mb-4">
        <div className="col-md-6">
          <h5 className="fw-bold mb-3">대여하고싶은 물품을 선택해주세요</h5>

          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">선택하세요</option>
            {categories.map((item: Category) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <div className="border rounded p-3 bg-light h-100">
            <ul className="mb-0 small">
              <li>📌 대여 및 반납은 평일 10:00 ~ 16:00에 가능합니다.</li>
              <li>📌 대여 시 꼭 입력을 올바르게 작성해주세요.</li>
              <li>📌 반납 기한은 대여 후 3일입니다.</li>
              <li>📌 3회 연체 시 대여 영구 정지됩니다.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===== 2행 : 전화번호 / 안내 ===== */}
      <div className="row mb-4">
        <div className="col-md-6">
          <h5 className="fw-bold mb-3">전화번호를 확인해주세요</h5>

          <input
            type="text"
            className={`form-control ${phoneError ? 'is-invalid' : ''}`}
            placeholder="010-1234-5678"
            value={phone}
            onChange={(e) => {
              const formatted = formatPhoneNumber(e.target.value);
              setPhone(formatted);
            }}
          />

          {phoneError && (
            <div className="text-danger mt-1 small">{phoneError}</div>
          )}
        </div>

        <div className="col-md-6">
          <div className="border rounded p-3 bg-light h-100">
            <ul className="mb-0 small">
              <li>📌 반납기한 임박 시 SMS 알림이 발송됩니다.</li>
              <li>📌 전화번호를 정확히 입력해주세요.</li>
              <li>📌 010-0000-0000 형식으로 입력해주세요.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-end">
        <button className="btn btn-outline-primary px-4" onClick={handleNext}>
          다음으로
        </button>
      </div>
    </>
  );
}
