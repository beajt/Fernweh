import React, { useEffect, useState } from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup, signOut, getAuth, signInAnonymously } from "firebase/auth";

const authAnon = getAuth();
signInAnonymously(authAnon)
  .then(() => {
    // signed in
  });
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  // });

function SignIn() {
  const [value, setValue] = useState("");
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
    });
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  }, []);

  const logout = () => {
    signOut(auth);
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="signIn">
      {value ? (
        <button onClick={logout}>Log Out</button>
      ) : (
        <button onClick={handleClick}>Sign In With Google</button>
      )}
    </div>
  );
}

export default SignIn;