import { useState } from 'react';
import { Item } from '../components/ItemCard';

type Props = {
  item: Item | null;
  onPrev: () => void;
};

export default function SelectHelper({ item, onPrev }: Props) {
  const [helperName, setHelperName] = useState('');
  const [agreed, setAgreed] = useState(false);

  const isValid = helperName.trim().length > 0 && agreed;

  if (!item) return null;

  return (
    <>
      <h5 className="fw-bold mb-4">대여사업 도우미를 입력해주세요</h5>

      <div className="row g-4">
        {/* 왼쪽 입력 영역 */}
        <div className="col-md-5">
          <label className="form-label small text-muted">
            도우미 이름을 입력하세요.
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="정확한 이름을 입력해주세요"
            value={helperName}
            onChange={(e) => setHelperName(e.target.value)}
          />

          {helperName.trim().length === 0 && (
            <div className="text-danger small mt-1">
              잘못된 정보 입력 시 이용에 제한이 있을 수 있습니다.
            </div>
          )}
        </div>

        {/* 오른쪽 안내 박스 */}
        <div className="col-md-7">
          <div className="border rounded p-4 bg-light">
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                📌 대여 및 반납은 평일 10:00 ~ 16:00에 가능합니다.
              </li>
              <li className="mb-2">
                📌 대여 시 꼭 장부를 올바르게 작성해주세요.
              </li>
              <li className="mb-2">
                📌 반납 기한은 대여 후 3일입니다. (주말 및 공휴일 미포함)
              </li>
              <li className="mb-0">
                📌 반납 연체 시 2회까지는 경고가 주어지며, 3회 연체부터는 대여가
                영구 정지됩니다.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 동의 체크 */}
      <div className="form-check mt-4 d-flex justify-content-end">
        <input
          className="form-check-input"
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          id="agreeCheck"
        />
        <label className="form-check-label" htmlFor="agreeCheck">
          본인은 위 내용을 숙지하였으며 이에 동의합니다.
        </label>
      </div>

      {/* 하단 버튼 */}
      <div className="d-flex justify-content-end gap-2 mt-4">
        <button className="btn btn-outline-secondary px-4" onClick={onPrev}>
          이전으로
        </button>

        <button
          className="btn btn-primary px-4"
          disabled={!isValid}
          onClick={() => {
            // 🔹 여기서 최종 제출 or API 호출 예정
            console.log('선택 물품:', item);
            console.log('도우미:', helperName);
          }}
        >
          제출하기
        </button>
      </div>
    </>
  );
}
