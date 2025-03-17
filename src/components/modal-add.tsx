import { ModalAddProps } from '@/resources/types/props';
import { useState } from 'react';
import { DotLoader } from 'react-spinners';
import Button from './button';
import { on } from 'events';

const ModalAdd: React.FC<ModalAddProps> = ({
  title,
  loading,
  name,
  setShowModal,
  onClick,
}) => {
  const [value, setValue] = useState('');

  const handleCreate = () => {
    onClick(name, value);
    setValue('');
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-white-1/40 backdrop-blur-xs z-50 flex justify-center items-center px-3">
      <div className="bg-gray-3/90 p-5 rounded-lg w-full space-y-3 sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-4/12">
        <div className="flex justify-between items-center space-x-2">
          <h1 className="font-semibold whitespace-nowrap">{title}</h1>
          <input
            type="text"
            placeholder={`Agregar ${name}`}
            value={value}
            onChange={e => setValue(e.target.value)}
            className="bg-gray-2 p-2 rounded-lg w-full
            outline-none"
          />
          <span
            className="material-icons select-none cursor-pointer"
            onClick={() => setShowModal(false)}
          >
            close
          </span>
        </div>
        <div className="flex justify-center ">
          <Button
            text={`
            Agregar ${name}
            `}
            loading={loading}
            onClick={handleCreate}
            disabled={loading}
            state="secondary"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalAdd;
