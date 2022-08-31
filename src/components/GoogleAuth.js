import React, { useEffect, useRef } from "react";
import { signIn, signOut } from "../redux-index";
import { useSelector, useDispatch } from "react-redux";

const GoogleAuth = () => {
  const auth = useRef("");
  const dispatch = useDispatch();
  const authentication = useSelector((state) => state.user.isSignedIn);

  const clientID =
    "797401886567-9cumct9mrt3v2va409rasa7fa6fq02hh.apps.googleusercontent.com";
  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: clientID,
          scope: "email",
          plugin_name: "streamy",
        })
        .then(() => {
          auth.current = window.gapi.auth2.getAuthInstance();
          onAuthChange(auth.current.isSignedIn.get());
          auth.current.isSignedIn.listen(onAuthChange);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    const onAuthChange = (isSignedIn) => {
      if (isSignedIn) {
        dispatch(signIn(auth.current.isSignedIn.get()));
      } else {
        dispatch(signOut());
      }
    };
  }, [dispatch]);
  const handleSignIn = () => {
    auth.current.signIn();
  };

  const handleSignOut = () => {
    auth.current.signOut();
  };
  console.log("auth", authentication);
  const renderAuthButton = () => {
    if (authentication === null) return null;
    else if (authentication) {
      return (
        <button className="ui red google button" onClick={handleSignOut}>
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={handleSignIn}>
          <i className="google icon" />
          Sign In With Google
        </button>
      );
    }
  };

  return renderAuthButton();
};

export default GoogleAuth;
