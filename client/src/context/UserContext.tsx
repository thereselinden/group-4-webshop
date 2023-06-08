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
  IRegisterForm,
} from '../interfaces/interfaces';
import fetchData from '../utils/FetchData';

export const UserContext = createContext<IUserContext>(null as any);

export const useUserContext = () => useContext(UserContext);

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
      setUser(null);
      navigate('/');
    } catch (error) {
      console.log(error as Error);
      console.log((error as Error).message);
    }
  };

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

export default UserProvider;
