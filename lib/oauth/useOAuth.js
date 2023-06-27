import { useRef } from 'react';

const getPopupPositionProperties = ({ width = 600, height = 600 }) => {
  const left = screen.width / 2 - width / 2;
  const top = screen.height / 2 - height / 2;
  return `left=${left},top=${top},width=${width},height=${height}`;
};

export function useCustomOAuth({onSuccess}) {
  const popupRef = useRef(null);
  
  const customOAuthHandler = (providerUri) => {
    debugger
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
    popupRef.current.addEventListener('beforeunload', function(event) {
      debugger
      onSuccess(undefined)
      window.removeEventListener('message', onMessage)      
    })
  }

  return {
    customOAuthHandler
  };
}