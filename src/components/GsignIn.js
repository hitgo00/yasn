import React, { useRef, useEffect } from 'react';
import { GoogleClientId } from '../constants';
import { useCookies, withCookies } from 'react-cookie';

export default function GsignIn(props) {
  const [cookies, setCookie] = useCookies(['']);

  let auth2;
  const googleLoginBtn = useRef(null);

  useEffect(() => {
    googleSDK();
    console.log('sfsfd');
  });

  const prepareLoginButton = () => {
    console.log(googleLoginBtn.current);

    auth2.attachClickHandler(
      googleLoginBtn.current,

      {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

        let AuthCookie = {
          Token: googleUser.getAuthResponse().id_token,
          ID: profile.getId(),
          Name: profile.getName(),
          Email: profile.getEmail(),
        };

        setCookie('userCookie', AuthCookie, { path: '/' });

        window.location.reload();
      },
      (error) => {
        alert(JSON.stringify(error.reason, undefined, 2));
      }
    );
  };

  const googleSDK = () => {
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        auth2 = window['gapi'].auth2.init({
          client_id: GoogleClientId,
          hosted_domain: 'daiict.ac.in',
          cookiepolicy: 'single_host_origin',
          prompt: 'select_account',
          scope: 'profile email',
        });
        prepareLoginButton();
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'google-jssdk');
  };

  return <div ref={googleLoginBtn}>{props.element}</div>;
}
