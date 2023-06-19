import { useRef } from 'react';

const getPopupPositionProperties = ({ width = 600, height = 600 }) => {
  const left = screen.width / 2 - width / 2;
  const top = screen.height / 2 - height / 2;
  return `left=${left},top=${top},width=${width},height=${height}`;
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