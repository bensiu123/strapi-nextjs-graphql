import { MeDocument, MeQuery } from "@/graphql/generated";
import { useQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";

export const useAppContext = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<MeQuery["me"]>(null);

  const { loading, error } = useQuery(MeDocument, {
    onCompleted: (data) => {
      const user = data.me;
      if (!user) {
        localStorage.removeItem("token");
        return null;
      }
      setUser(user);
    },
    onError: (error) => {
      localStorage.removeItem("token");
      return null;
    },
  });

  useEffect(() => {
    if (user) setIsAuthenticated(true);
    else setIsAuthenticated(false);
  }, [user]);

  const afterLogin = (jwt: string, user: MeQuery["me"]) => {
    localStorage.setItem("token", jwt);
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return {
    isAuthenticated,
    user,
    loading,
    error,
    afterLogin,
    logout,
  };
};

export type IAppContext = ReturnType<typeof useAppContext>;

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const useApp = () => useContext(AppContext);
