import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useAuthStatus = () => {
  const { user } = useSelector((state) => state.auth);

  const [checkUser, setCheckUser] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!user); // initialize based on user

  useEffect(() => {
    setIsLoggedIn(!!user); // convert user to boolean directly
    setCheckUser(false);
  }, [user]);

  return { checkUser, isLoggedIn };
};

export default useAuthStatus;
