import {
  createContext,
  useMemo,
  useContext,
  useState,
  useCallback,
} from 'react';

export const UserContext = createContext({ user: {}, setUser: () => {} });

export const useUserContext = () => {
  return useContext(UserContext);
};

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch (e) {
      return {};
    }
  });

  const handleSetUser = useCallback((user) => {
    const userString = JSON.stringify(user);
    localStorage.setItem('user', userString);
    setUser(user);
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser: handleSetUser,
    }),
    [user, handleSetUser]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
