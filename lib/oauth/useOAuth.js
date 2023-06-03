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

export function useCustomOAuth({onSuccess}) {
  const popupRef = useRef(null);
  
  const customOAuthHandler = (providerUri) => {
    popupRef.current?.close();
    popupRef.current = window.open(
      providerUri,
      '_blank',
      getPopupPositionProperties({ width: 600, height: 600 }),
    );

    function onMessage(event) {
      debugger;
      
      const data = event.data;
      onSuccess(data)
      window.removeEventListener('message', onMessage)
    }    
    window.addEventListener('message', onMessage);    
  }

  return {
    customOAuthHandler
  };
}