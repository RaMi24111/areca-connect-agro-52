import Navigation from "@/components/Navigation";
import LoginForm from "@/components/LoginForm";

const ArtisanLogin = () => {
  return (
    <>
      <Navigation />
      <LoginForm userType="artisan" />
    </>
  );
};

export default ArtisanLogin;