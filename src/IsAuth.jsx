import { useState, useEffect } from "react";
import supabase from "./supabase-client";
import { Navigate } from "react-router-dom";

const IsAuth = ({ children }) => {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (session === undefined) {
    return <div>loading .....</div>;
  }

  if (!session) {
    return <Navigate to={"/"} replace={true} />;
  }

  return children;
};

export default IsAuth;
