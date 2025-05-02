import React, { createContext, useState, useCallback, useMemo } from "react";

// Initial state with more robust structure
const initialState = {
  id: null,
  username: "",
  email: "",
  mobileNo: "",
  isAuthenticated: false
};

// Create context with more explicit typing
const UserContext = createContext({
  user: initialState,
  setUser: () => {},
  clearUser: () => {}
});

const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(initialState);

  // Memoized setter with additional logic
  const setUser = useCallback((userData) => {
    setUserState(prevState => ({
      ...prevState,
      ...userData,
      isAuthenticated: !!userData.id
    }));
  }, []);

  // Clear user method for logout
  const clearUser = useCallback(() => {
    setUserState(initialState);
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    setUser,
    clearUser
  }), [user, setUser, clearUser]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider, initialState };