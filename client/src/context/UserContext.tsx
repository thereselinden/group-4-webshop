import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  IUserContext,
  IUser,
  ILoginForm,
  ILoginResponse,
} from '../interfaces/interfaces';
import useFetch from '../hooks/useFetch';

/* export const UserContext = createContext<IUserContext>({
  user: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    isAdmin: false,
  },
  isLoggedIn: false,
  login: ():Promise<ILoginResponse>  => {},
  logout: () => {},
}); */

export const UserContext = createContext<IUserContext>(null as any);

export const useUserContext = () => useContext(UserContext);

// Provider
const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const alreadyLoggedIn = async (): Promise<void> => {
      const res = await fetch('api/users/authorize');
      if (res.status === 200) {
        const data = await res.json();
        setUser(data);
        setIsLoggedIn(true);
      }
    };
    alreadyLoggedIn();
  }, []);

  /*   const {
    data: auth,
    isLoading,
    errorMessage,
  } = useFetch<IUser | undefined>('api/users/authorize');

  useEffect(() => {
    if (auth) setUser(auth);
  }, []); */

  //funktion som tar in en product i string
  const login = async (credentials: ILoginForm): Promise<ILoginResponse> => {
    try {
      const res = await fetch('api/users/login', {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (res.status !== 200) throw new Error('res error login');
      const user = await res.json();
      console.log('Submit data', user);
      setUser(user);
      setIsLoggedIn(true);
      return { success: true, message: '' };
    } catch (error) {
      console.log((error as Error).message);
      return { success: false, message: 'Login error' };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await fetch('api/users/logout', {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
      });
      //if (!res.ok !== 200) throw new Error('res error login');

      console.log('logging out');
      setUser(undefined);
      setIsLoggedIn(false);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  //Expoerterar ut contextens provider
  //emmellan Contexten lägger vi (props.)children
  //Proivdea med value ut det vi vill göra synligt. Value måste matcha Interface. Eftersom vi typat upp context så. Därför value propen. {{}} pga gör det som ett objekt
  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

//Children i mitten - > se App.tsx

export default UserProvider;
