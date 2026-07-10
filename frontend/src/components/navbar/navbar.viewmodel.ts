import { useLocation } from "react-router";
import { useMemo } from "react";

export const useNavbar = () => {
  const location = useLocation();

  const currentPage = useMemo(() => {
    return location.pathname.slice(1);
  }, [location]);

  return {
    currentPage,
  };
};
