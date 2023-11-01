import { FC, useEffect, useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { IUser } from '../../interfaces';
import { tesloApi } from '../../api';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';

export interface Authstate {
  isLoggedIn: boolean
  user?: IUser
}

const AUTH_INITIAL_STATE: Authstate = {
  isLoggedIn: false,
  user: undefined
}

interface Props {
  children: JSX.Element | JSX.Element[]
}


export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)
  const router = useRouter()


  useEffect(() => {
    checkToken()
  }, [])
  

  const checkToken = async () => {
    try {
      const { data } = await tesloApi.get('/user/validate-token')
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: '[auth] - Login', payload: user })
    } catch (error) {
      Cookies.remove('token')
    }
  }


  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password })
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: '[auth] - Login', payload: user })
      return true
    } catch (error) {
      return false
    }
  }

  const registerUser = async (name:string , email:string, password:string):Promise<{hasError:boolean; message?:string}> => {
    try {
      const { data } = await tesloApi.post('/user/register', { name, email, password })
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: '[auth] - Login', payload: user })
      return {
        hasError: false
      }
    
    } catch (error) {
      if (axios.isAxiosError(error)){
        return {
          hasError:true,
          message:error.response?.data.message
        }
      }

      return {
        hasError:true,
        message:'No se ha podido crear el usuario - intentelo de nuevo'
      }
    }
  }

  const logout = () => {
    Cookies.remove('cart')
    Cookies.remove('token')
    router.reload()
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      loginUser,
      registerUser,
      logout

    }}>
      {children}
    </AuthContext.Provider>
  )
}