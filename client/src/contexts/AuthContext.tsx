import React, { ReactNode, createContext, useEffect, useReducer } from 'react';
import { authReducer, initialState, AuthState } from '../reducers/authReducer';
import { useNavigate } from 'react-router-dom';
import { Helper } from '../services/helper';

interface AuthContextType {
  authState: AuthState;
  dispatch: React.Dispatch<any>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  const checkUserStatus = async () => {
    //TODO: Replace with /me API call
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (Object.keys(user).length) {
      const roleData = await Helper.getUserByRole(user.token ? user.user.role : user.role);
      const newUserData = { ...user, user: { ...user.user, ...roleData }};
      localStorage.setItem('user', JSON.stringify(newUserData));
      dispatch({
        type: 'LOGIN',
        payload: newUserData
      });
      navigate('/app');
    }
  }

  useEffect(() => {
    checkUserStatus();
  }, [])

  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
