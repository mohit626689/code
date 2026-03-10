const ButtonLogin = (props) => {
  console.log(props);
  if (props.loggedin) {
    return <Link href="dashboard">go to dashboard</Link>;
  } else {
    return <button>Login</button>;
  }
};

export default ButtonLogin;
