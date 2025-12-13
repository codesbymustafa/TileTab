import React from 'react';

interface BlankProps {
  bgColor?: string;
}

const Blank: React.FC<BlankProps> = ({ bgColor = 'transparent' }) => (
  <div style={{ backgroundColor: bgColor, width: '100%', height: '100%' }} />
);

export default Blank;
