import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RegisterButton = () => {
  return (
    <Link to="/register">
      <Button variant="outline" className="text-sm">
        Register
      </Button>
    </Link>
  );
};

export default RegisterButton;