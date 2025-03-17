import { ButtonProps } from '@/resources/types/props';
import { DotLoader } from 'react-spinners';
import { colors } from '@/resources/colors';

const Button: React.FC<ButtonProps> = ({
  loading,
  onClick,
  text,
  disabled,
  state,
  selected,
}) => {
  return (
    <button
      className={`${
        disabled
          ? 'text-gray-4'
          : `${
              state === 'primary' ? 'text-orange-1' : 'text-gray-2'
            } shadow-layout cursor-pointer`
      } ${
        state === 'primary'
          ? `${
              loading
                ? 'bg-transparent'
                : ` ${selected ? 'bg-white-1' : 'bg-gray-3'}`
            } `
          : `${
              loading
                ? 'bg-transparent'
                : ` ${selected ? 'bg-white-1' : 'bg-orange-1'}`
            }`
      } p-2 px-3 sm:p-1.5 rounded-md font-semibold`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? (
        <DotLoader
          color={state === 'primary' ? colors.orange[1] : colors.gray[2]}
          size={15}
        />
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
