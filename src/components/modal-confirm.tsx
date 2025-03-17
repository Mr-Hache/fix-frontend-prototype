import { ModalConfirmProps } from '@/resources/types/props';
import Button from './button';

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  onClick,
  setShowModal,
}) => {
  return (
    <div className="fixed inset-0 bg-white-1/40 backdrop-blur-xs z-50 flex justify-center items-center px-3">
      <div className="bg-gray-3/90 p-5 rounded-lg w-full space-y-3 sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-4/12">
        <p>¿Estás seguro de que deseas Agregar esta mercancía?</p>
        <div className="flex justify-end space-x-2">
          <Button
            text="Cancelar"
            onClick={() => setShowModal(false)}
            loading={false}
            disabled={false}
            state="primary"
          />
          <Button
            text="Aceptar"
            onClick={onClick}
            loading={false}
            disabled={false}
            state="secondary"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
