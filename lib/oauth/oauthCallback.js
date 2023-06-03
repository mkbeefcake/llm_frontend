import { useEffect, useState } from 'react';
import { CUSTOM_OAUTH2_STATE, parse } from './utils';


export function OAuthCallback() {
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    debugger
    const params = parse(window.location.search);

    if (params.provider) {
      window.opener &&
        window.opener.postMessage(
          { provider: params.provider, 
            access_token: params.access_token,
            refresh_token: params.refresh_token,
            from: 'CustomOAuth' },
          window.location.origin,
        );
      window.close();
    }
    else {
      setErrorMessage('Issue happened');
    }
  }, []);

  return <div>{errorMessage}</div>;
}