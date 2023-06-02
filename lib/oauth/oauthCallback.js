import { useEffect, useState } from 'react';
import { CUSTOM_OAUTH2_STATE, parse } from './utils';


export function OAuthCallback() {
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    debugger;
    const params = parse(window.location.search);

    if (params.state !== localStorage.getItem(CUSTOM_OAUTH2_STATE)) {
      setErrorMessage('State does not match');
    } 
    else if (params.error) {
      const errorMessage = params.error_description || 'Login failed. Please try again.';
      
      window.opener &&
        window.opener.postMessage(
          {
            error: params.error,
            state: params.state,
            errorMessage,
            from: 'CustomOAuth',
          },
          window.location.origin,
        );

      // Close tab if user cancelled login
      if (params.error === 'user_cancelled_login') {
        window.close();
      }
    }

    if (params.code) {
      window.opener &&
        window.opener.postMessage(
          { code: params.code, state: params.state, from: 'CustomOAuth' },
          window.location.origin,
        );
    }
  }, []);

  return <div>{errorMessage}</div>;
}