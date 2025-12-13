import React, { JSX } from 'react';

interface BlankProps {
  bgColor?: string;
}

export default function Blank ({ bgColor = 'transparent' }:BlankProps): JSX.Element {
  return <div style={{ backgroundColor: bgColor, width: '100%', height: '100%' }} />
};


