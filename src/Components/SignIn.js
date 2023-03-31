import React, { useEffect, useState } from "react";
import { auth, provider } from "./firebase";
import {
  signInWithPopup,
  signOut,
  getAuth,
  signInAnonymously,
} from "firebase/auth";

function SignIn() {
  const [value, setValue] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    const authAnon = getAuth();
    signInAnonymously(authAnon)
      .then(() => {
        setIsAnonymous(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

    setValue(localStorage.getItem("email"));
  }, []);

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      setIsAnonymous(false);
      localStorage.setItem("email", data.user.email);
    });
  };

  const handleAnonClick = () => {
    setIsAnonymous(true);
  };

  const logout = () => {
    signOut(auth);
    localStorage.clear();
    setIsAnonymous(true);
    window.location.reload();
  };

  return (
    <div className="signIn">
      {isAnonymous ? (
        <button onClick={handleClick}>Sign In With Google</button>
      ) : (
        <button onClick={logout}>Log Out</button>
      )}
      {isAnonymous && (
        <button className="hide" onClick={handleAnonClick}></button>
      )}
    </div>
  );
}

export default SignIn;