import { useState, useCallback, useEffect, useRef } from 'react';
import { CUSTOM_OAUTH2_STATE } from './utils';

const getPopupPositionProperties = ({ width = 600, height = 600 }) => {
  const left = screen.width / 2 - width / 2;
  const top = screen.height / 2 - height / 2;
  return `left=${left},top=${top},width=${width},height=${height}`;
};

const generateRandomString = (length = 20) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export function useCustomOAuth({
  redirectUri,
  onSuccess,
  onError,
  state = '',
  closePopupMessage = 'User closed the popup'
}) 
{
  const popupRef = useRef(null);
  const popUpIntervalRef = useRef(null);

  const [providerUri, setProviderUri] = useState('');

  const receiveMessage = useCallback((event) => {
      const savedState = localStorage.getItem(CUSTOM_OAUTH2_STATE);

      if (event.origin === window.location.origin) {
        if (event.data.errorMessage && event.data.from === 'CustomOAuth') {
          // Prevent CSRF attack by testing state
          if (event.data.state !== savedState) {
            popupRef.current && popupRef.current.close();
            return;
          }
          onError && onError(event.data);
          popupRef.current && popupRef.current.close();
        } 
        else if (event.data.code && event.data.from === 'CustomOAuth') {
          // Prevent CSRF attack by testing state
          if (event.data.state !== savedState) {
            console.error('State does not match');
            popupRef.current && popupRef.current.close();
            return;
          }
          onSuccess && onSuccess(event.data.code);
          popupRef.current && popupRef.current.close();
        }
      }
    },
    [onError, onSuccess],
  );

  useEffect(() => {
    return () => {
      window.removeEventListener('message', receiveMessage, false);

      if (popupRef.current) {
        popupRef.current.close();
        popupRef.current = null;
      }
      if (popUpIntervalRef.current) {
        window.clearInterval(popUpIntervalRef.current);
        popUpIntervalRef.current = null;
      }
    };
  }, [receiveMessage]);

  useEffect(() => {
    window.addEventListener('message', receiveMessage, false);
    return () => {
      window.removeEventListener('message', receiveMessage, false);
    };
  }, [receiveMessage]);

  const getUrl = () => {
    const generatedState = generateRandomString();
    localStorage.setItem(CUSTOM_OAUTH2_STATE, generatedState);
    const linkedInAuthLink = providerUri;
    return linkedInAuthLink;
  };

  const customOAuthHandler = () => {
    popupRef.current?.close();
    popupRef.current = window.open(
      getUrl(),
      '_blank',
      getPopupPositionProperties({ width: 600, height: 600 }),
    );

    if (popUpIntervalRef.current) {
      window.clearInterval(popUpIntervalRef.current);
      popUpIntervalRef.current = null;
    }
    popUpIntervalRef.current = window.setInterval(() => {
      try {
        if (popupRef.current && popupRef.current.closed) {
          window.clearInterval(popUpIntervalRef.current);
          popUpIntervalRef.current = null;
          if (onError) {
            onError({
              error: 'user_closed_popup',
              errorMessage: closePopupMessage,
            });
          }
        }
      } catch (error) {
        console.error(error);
        window.clearInterval(popUpIntervalRef.current);
        popUpIntervalRef.current = null;
      }
    }, 1000);
  };

  return {
    customOAuthHandler,
    setProviderUri
  };
}