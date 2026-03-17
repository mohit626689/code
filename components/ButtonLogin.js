"use client";
import Link from "next/link";

const ButtonLogin = ({ isloggedin, name, extraStyle }) => {
  console.log(extraStyle);

  if (isloggedin) {
    return (
      <Link
        href="/dashboard"
        className={`btn btn-primary ${extraStyle ? extraStyle : ""}`}
      >
        Welcome Back {name}
      </Link>
    );
  } else {
    return (
      <button className={`btn btn-primary ${extraStyle ? extraStyle : ""}`}>
        Login
      </button>
    );
  }
};

export default ButtonLogin;
