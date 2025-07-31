import Navigation from "@/components/Navigation";
import LoginForm from "@/components/LoginForm";

const UserLogin = () => {
  return (
    <>
      <Navigation />
      <LoginForm userType="user" />
    </>
  );
};

export default UserLogin;