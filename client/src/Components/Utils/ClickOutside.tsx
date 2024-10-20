import React, { useEffect, useRef } from 'react';

interface ClickOutsideProps {
  onClickOutside: () => void;
  children: React.ReactNode;
}

const ClickOutside: React.FC<ClickOutsideProps> = ({ onClickOutside, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onClickOutside();
    }
  };

  useEffect(() => {
    // Attach event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return <div ref={ref}>{children}</div>;
};

export default ClickOutside;
