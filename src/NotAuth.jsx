import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabase-client";

const NotAuth = ({ children }) => {
  const navigate = useNavigate();

  const [check, setCheck] = useState(true);

  useEffect(() => {
    async function NotAuthUser() {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        navigate("/taskManagement");
      } else {
        setCheck(false);
      }
    }

    NotAuthUser();
  }, [navigate]);

  if (check) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 animate-pulse">
          Checking authentication...
        </p>
      </div>
    );
  }

  return children;
};

export default NotAuth;
