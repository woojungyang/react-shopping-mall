import React, { useState } from 'react';

import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';

export const LikePin = ({
  onClick,
  like = false,
  position = { top: '3%', right: '3%' },
  defaultColor = 'white',
}) => {
  const [status, setStatus] = useState(like);
  function LikeItem() {
    setStatus(!status);
  }

  const colors = {
    white: '#fff',
    skeleton: '#c4c4c4',
  };
  return (
    <div
      style={{
        position: 'absolute',
        cursor: 'pointer',
        ...position,
      }}
      onClick={LikeItem}
    >
      {!status ? (
        <PushPinOutlinedIcon sx={{ color: colors[defaultColor] }} />
      ) : (
        <PushPinIcon sx={{ color: 'red' }} />
      )}
    </div>
  );
};
