import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const TokenCountdown = ({ accessToken }) => {
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (!accessToken) {
      console.log('No access token provided');
      return;
    }

    try {
      const tokenPayload = jwtDecode(accessToken.access_token);
      const expirationTime = tokenPayload.exp;

      const interval = setInterval(() => {
        const currentTime = Math.floor(Date.now() / 1000);
        const remainingSeconds = expirationTime - currentTime;
        setRemainingTime(remainingSeconds);
      }, 1000);

      return () => clearInterval(interval);
    } catch (error) {
      console.error('Error decoding access token:', error);
    }
  }, [accessToken]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return <div>Token Expires In: {formatTime(remainingTime)}</div>;
};

export default TokenCountdown;
