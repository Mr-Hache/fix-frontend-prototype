import { InputProps } from '@/resources/types/props';
import { useState } from 'react';
import { DotLoader } from 'react-spinners';
import { colors } from '@/resources/colors';

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  name,
  options,
  loadingOptions,
  label,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredOptions = options
    ? options.filter(option =>
        option.toLowerCase().includes(value.toLowerCase())
      )
    : [];

  const handleSuggestionClick = (suggestion: string) => {
    onChange({
      target: { value: suggestion, name },
    } as React.ChangeEvent<HTMLInputElement>);
    setShowSuggestions(false);
  };

  return (
    <div className="relative flex w-full">
      <div className="flex  flex-col sm:flex-row w-full justify-center sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <label className=" font-semibold text-white-1 whitespace-nowrap  ">
          {label}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => {
            onChange(e);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
          name={name}
          className="placeholder-orange-1/60 bg-gray-2 shadow-layout rounded-lg p-2 w-full outline-none"
        />
      </div>
      {showSuggestions && (filteredOptions.length > 0 || loadingOptions) && (
        <div className="absolute scrollbar-thin scrollbar-thumb-orange-1/40 scrollbar-track-gray-1 z-10 mt-16 sm:mt-9 w-full bg-gray-2/50 shadow-layout backdrop-blur-sm rounded-lg max-h-48 overflow-y-auto">
          {filteredOptions.length > 0 &&
            filteredOptions.map((option, index) => (
              <div
                key={index}
                className="p-2 hover:bg-orange-1/5 cursor-pointer"
                onMouseDown={() => handleSuggestionClick(option)}
              >
                {option}
              </div>
            ))}
          {loadingOptions && (
            <div className="flex justify-center w-full py-2">
              <DotLoader color={colors.orange[1]} size={20} />{' '}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
