import React from 'react';
import { Box } from '@mui/material';
import { keyframes } from '@mui/system';

const StarBackground = () => {
  // Generate random star positions
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 3}s`,
    size: Math.random() * 3 + 1
  }));

  // Define pulse animation
  const pulse = keyframes`
    0%, 100% {
      opacity: 0.3;
      transform: scale(0.8);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  `;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1
      }}
    >
      {stars.map(star => (
        <Box
          key={star.id}
          sx={{
            position: 'absolute',
            borderRadius: '50%',
            bgcolor: 'yellow',
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `${pulse} 2s infinite`,
            animationDelay: star.animationDelay,
            opacity: Math.random() * 0.7 + 0.3,
            boxShadow: '0 0 4px #fff',
          }}
        />
      ))}
    </Box>
  );
};

export default StarBackground;