import { useState } from 'react';
import { categories } from '../../data/mock.tsx';

type Props = {
  onNext: () => void;
};

export default function SelectCategory({ onNext }: Props) {
  const [category, setCategory] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const formatPhoneNumber = (value: string) => {
    // 숫자만 남기기
    const numbersOnly = value.replace(/\D/g, '');

    if (numbersOnly.length <= 3) {
      return numbersOnly;
    }

    if (numbersOnly.length <= 7) {
      return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
    }

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
    const normalizedPhone = phone.replace(/\s+/g, '');

    if (!validatePhone(normalizedPhone)) {
      setPhoneError('유효하지 않은 입력입니다.');
      return;
    }

    setPhoneError('');
    onNext();
  };

  return (
    <>
      {/* ===== 1행 : 물품 선택 / 대여 안내 ===== */}
      <div className="row mb-4">
        <div className="col-md-6">
          <h5 id="rentCategoryLabel" className="fw-bold mb-3">
            대여하고싶은 물품을 선택해주세요
          </h5>

          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-labelledby="rentCategoryLabel"
          >
            <option value="">선택하세요</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <div className="border rounded p-3 bg-light h-100">
            <ul className="mb-0 small">
              <li>📌 대여 및 반납은 평일 10:00 ~ 16:00에 가능합니다.</li>
              <li>📌 대여 시 꼭 입력을 올바르게 작성해주세요.</li>
              <li>📌 반납 기한은 대여 후 3일입니다. (주말 및 공휴일 미포함)</li>
              <li>
                📌 반납 연체 시 2회까지는 경고가 주어지며, 3회 연체부터는 대여가
                영구 정지됩니다.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===== 2행 : 전화번호 / 전화번호 안내 ===== */}
      <div className="row mb-4">
        <div className="col-md-6">
          <h5 id="rentPhoneLabel" className="fw-bold mb-3">
            전화번호를 확인해주세요
          </h5>

          <input
            type="text"
            className={`form-control ${phoneError ? 'is-invalid' : ''}`}
            placeholder="010-1234-5678"
            value={phone}
            onChange={(e) => {
              const formatted = formatPhoneNumber(e.target.value);
              setPhone(formatted);
            }}
            aria-labelledby="rentPhoneLabel"
          />

          {phoneError && (
            <div className="text-danger mt-1 small">{phoneError}</div>
          )}
        </div>

        <div className="col-md-6">
          <div className="border rounded p-3 bg-light h-100">
            <ul className="mb-0 small">
              <li>
                📌 전화번호는 대여물품 반납기한 임박 및 연체 시 알림 SMS를 위해
                사용될 예정입니다.
              </li>
              <li>📌 입력된 전화번호가 맞는지 확인해주세요.</li>
              <li>📌 전화번호 입력 형식을 맞춰서 작성해주세요.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===== 다음 버튼 ===== */}
      <div className="text-end">
        <button className="btn btn-outline-primary px-4" onClick={handleNext}>
          다음으로
        </button>
      </div>
    </>
  );
}
