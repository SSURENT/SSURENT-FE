import { useState } from 'react';
import SelectCategory from './SelectCategory';
import SelectItem from './SelectItem';
import SelectHelper from './SelectHelper';
import { Item } from '../components/ItemCard';

export default function RentalPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">대여하기</h2>

      {step === 1 && <SelectCategory onNext={() => setStep(2)} />}

      {step === 2 && (
        <SelectItem
          onPrev={() => setStep(1)}
          onNext={(item) => {
            setSelectedItem(item);
            setStep(3);
          }}
        />
      )}

      {step === 3 && (
        <SelectHelper item={selectedItem} onPrev={() => setStep(2)} />
      )}
    </div>
  );
}
