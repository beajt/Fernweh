import React, { useEffect, useState } from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";

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