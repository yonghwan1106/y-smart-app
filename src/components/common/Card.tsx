import React from 'react';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  shadow?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  onClick,
  className = '',
  padding = 'medium',
  shadow = true,
}) => {
  const paddingStyles = {
    none: '',
    small: 'p-3',
    medium: 'p-4',
    large: 'p-6',
  };

  const shadowStyle = shadow ? 'shadow-md' : '';
  const clickableStyle = onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : '';

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl ${paddingStyles[padding]} ${shadowStyle} ${clickableStyle} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
