import React, { FC } from 'react';
import theme from '../../../theme';

interface PaletteColorfulIconProps {
  width?: string;
  color?: string;
}

const PaletteColorfulIcon: FC<PaletteColorfulIconProps> = ({ width }) => {
  const DEFAULT_WIDTH = '22';

  return (
    <svg width={width || DEFAULT_WIDTH} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256c35.2 0 68.1-8.7 97.2-23.9 13.4-7.2 15.4-25.9 5.8-35.8-4.9-4.9-11.3-7.6-18-7.6-3.2 0-6.4.6-9.3 1.8-17.2 7.3-36.3 11.5-56.7 11.5-88.2 0-160-71.8-160-160s71.8-160 160-160 160 71.8 160 160c0 20.4-4.2 39.5-11.5 56.7-1.2 2.9-1.8 6.1-1.8 9.3 0 6.7 2.7 13.1 7.6 18 9.9 9.6 28.6 7.6 35.8-5.8C503.3 324.1 512 291.2 512 256 512 114.6 397.4 0 256 0z"
        fill={theme.colors.general.primary}
      />
      <circle cx="128" cy="256" r="32" fill="#ff0000" />
      <circle cx="256" cy="128" r="32" fill="#00ff00" />
      <circle cx="384" cy="256" r="32" fill="#0000ff" />
      <circle cx="256" cy="384" r="32" fill="#ffff00" />
    </svg>
  );
};

export default PaletteColorfulIcon; 