import React from 'react';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  icon,
  disabled = false,
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full rounded-xl border border-gray-300
          ${icon ? 'pl-12' : 'pl-4'} pr-4 py-3.5
          text-base text-gray-900 placeholder-gray-400
          focus:border-teal-500 focus:ring-2 focus:ring-teal-200
          disabled:bg-gray-100 disabled:cursor-not-allowed
          transition-all
        `}
      />
    </div>
  );
};

export default Input;
