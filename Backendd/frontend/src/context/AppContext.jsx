import { createContext, useContext, useState } from "react";

const AppContext = createContext({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const isAuthenticated = Boolean(user);

  // Updated login function that accepts a user object and a token from the backend
  const login = async (userData, token) => {
    try {
      if (!userData || !token) {
        throw new Error("Invalid credentials");
      }
      // Optionally store the token (for example, in localStorage)
      localStorage.setItem("token", token);
      setUser(userData);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
