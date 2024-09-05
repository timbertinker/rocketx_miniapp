import React, { memo, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import "../css_generated/InputNumber.css";
import UpArrow from '../component/svg/up-arrow';
import DownArrow from '../component/svg/down-arrow';
import { cn } from '../utils';

const InputNumber = memo(({ InputProps }) => {
  const [value, setValue] = useState(InputProps.value);


  const handleKeyPress = (e) => {

    const allowedChars = '0123456789.';
    const isInvalidKey = (e.key.length === 1 && !allowedChars.includes(e.key)) ||
      (e.key === '.' && value.includes('.'));

    if (isInvalidKey) {
      e.preventDefault();
    }

    if (e.key === ',' && !value.includes('.')) {
      e.preventDefault();
      const newValue = parseFloat(value).toFixed(1).slice(0, -1);
      // setValue(newValue);
      InputProps.onChange && InputProps.onChange({ target: { value: newValue } });
    }
  };

  const inputElement = useRef(null);

  useEffect(() => {
    inputElement.current.onfocus = () => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
    };
  }, [inputElement]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    // Validate input: Only allow numbers and decimal points
    if (/^\d*\.?\d*$/.test(newValue)) {
      newValue >= 0 || newValue === '' ? setValue(newValue) : setValue(0.1);
      InputProps.onChange && InputProps.onChange({ target: { value: newValue } });
    }

  };

  const incrementValue = () => {
    const newValue = (parseFloat(value) || 0.1) + 1;
    newValue >= 0.1 ? setValue(newValue) : setValue(0.1);
    InputProps.onChange && InputProps.onChange({ target: { value: newValue } });
  };

  const decrementValue = () => {
    const newValue = (parseFloat(value) || 0.1) - 1;
    newValue >= 0.1 || newValue === '' ? setValue(newValue) : setValue(0.1);
    InputProps.onChange && InputProps.onChange({ target: { value: newValue } });
  };

  return (
    <div className={`input-number-parent relative w-full h-11 hover:outline-[#0000FF4D] hover:outline-4 ${InputProps.disabled ? "text-[#FFFFFF99]" : "text-black"}`}>

      <input
        className={`input-number absolute w-full h-11 top-0 left-0 box-border rounded-xl pl-4 ${InputProps.disabled ? "text-[#FFFFFF99] bg-white_20 cursor-none contain-none select-none" : ""}`}
        type='number'
        ref={inputElement}
        value={value}
        inputMode='decimal'
        pattern='[0-9]*'
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        disabled={InputProps.disabled}
        min={1}
      />
      {InputProps.type === "xWithNumber" && <div className='absolute left-2 top-1/2 transfrom -translate-y-1/2'>x</div>}
      <div className='absolute right-2.5 top-1/2 transform -translate-y-1/2'>
        <div className={cn('flex flex-col cursor-pointer', InputProps.disabled ? "cursor-none contain-none select-none" : "")}>
          <UpArrow className="cursor-pointer w-3 h-3"
            action={() => !InputProps.disabled && incrementValue()}
          />
          <DownArrow className="cursor-pointer w-3 h-3"
            action={() => !InputProps.disabled && decrementValue()}
          />

        </div>
      </div>
    </div>
  );
});

InputNumber.propTypes = {
  InputProps: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func,
  }).isRequired,
};

export default InputNumber;