import Navigation from "@/components/Navigation";
import LoginForm from "@/components/LoginForm";

const IndustryLogin = () => {
  return (
    <>
      <Navigation />
      <LoginForm userType="industry" />
    </>
  );
};

export default IndustryLogin;