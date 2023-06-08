import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import {
  IUserContext,
  IUser,
  ILoginForm,
  ILoginResponse,
  IRegisterForm,
} from '../interfaces/interfaces';
import useFetch from '../hooks/useFetch';
import fetchData from '../utils/FetchData';

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
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userModal, setUserModal] = useState<boolean>(false);
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const alreadyLoggedIn = async (): Promise<void> => {
      try {
        const isAuth = await fetchData<IUser>('/api/users/authorize');
        setUser(isAuth);
      } catch (error) {
        console.log('error alreadyloggedin');
      }
    };
    alreadyLoggedIn();
  }, []);

  //funktion som tar in en product i string
  const login = async (credentials: ILoginForm): Promise<void> => {
    setIsLoading(true);
    try {
      const user = await fetchData<IUser>(
        '/api/users/login',
        'POST',
        JSON.stringify(credentials)
      );
      setUser(user);
      setIsLoading(false);
      setErrorMessage(null);
      setUserModal(false);
    } catch (error) {
      setErrorMessage('Felaktiga användaruppgifter');
      setIsLoading(false);
    }
  };

  const register = async (credentials: IRegisterForm): Promise<void> => {
    setIsLoading(true);
    try {
      await fetchData<IUser>(
        '/api/users/register',
        'POST',
        JSON.stringify(credentials)
      );
      setRegisterSuccess(true);
      setIsLoading(false);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage('Epostaddress redan registrerad');
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await fetchData<IUser>('/api/users/logout', 'POST');
      //if (!res.ok !== 200) throw new Error('res error login');

      console.log('logging out');
      setUser(null);
      navigate('/');
    } catch (error) {
      console.log(error as Error);
      console.log((error as Error).message);
    }
  };

  //Expoerterar ut contextens provider
  //emmellan Contexten lägger vi (props.)children
  //Proivdea med value ut det vi vill göra synligt. Value måste matcha Interface. Eftersom vi typat upp context så. Därför value propen. {{}} pga gör det som ett objekt
  return (
    <UserContext.Provider
      value={{
        isLoading,
        errorMessage,
        user,
        login,
        register,
        logout,
        setUserModal,
        userModal,
        registerSuccess,
        setRegisterSuccess,
        setErrorMessage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

//Children i mitten - > se App.tsx

export default UserProvider;
