import Navigation from "@/components/Navigation";
import LoginForm from "@/components/LoginForm";

const FarmerLogin = () => {
  return (
    <>
      <Navigation />
      <LoginForm userType="farmer" />
    </>
  );
};

export default FarmerLogin;