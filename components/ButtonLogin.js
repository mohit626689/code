"use client";
import Link from "next/link";

const ButtonLogin = ({ session, extraStyle }) => {
  console.log(extraStyle);

  if (session) {
    return (
      <Link
        href="/dashboard"
        className={`btn btn-primary ${extraStyle ? extraStyle : ""}`}
      >
        Welcome Back {session.user.name || "fiends"}
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
