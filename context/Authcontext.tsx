'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';


interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success:boolean, error?: string}>;
  register: (username: string, email: string, password: string) => Promise<{ success:boolean, error?: string}>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  accessToken: null,
  isLoading: true,
  login: async (_email, _password) => {
     throw new Error('login function must be used within AuthProvider') 
  },
  register: (_username, _email, _password) => {
    throw new Error('register function must be used within AuthProvider')
  },
  logout: () => { throw new Error('logout function must be used within AuthProvider')}  
});


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string|null>(null)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const tryRefreshToken = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/auth/refresh`, {
          method: 'POST',
          credentials: 'include'
        })

        const data = await response.json()

        if (!response.ok){
          throw new Error(data.message || 'Could not refresh token')
        }
        setAccessToken(data.accessToken)
        setIsAuthenticated(true)

      } catch (error){
          console.log('No valid refresh token found, user is not logged in')
      } finally {
        setIsLoading(false)
      }
    }

    tryRefreshToken()
  }, [])


  const register = async (username: string, email: string, password: string) => {
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/auth/register`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ username, email, password }),
        credentials: 'include'
      })

      const data = await response.json()

      if (!response.ok) {
        return {success: false, error: data.message || 'Registration failed'}
      }

      setAccessToken(data.accessToken)
      setIsAuthenticated(true)

      return { success: true }

    }catch (error){
      console.error("Registration error", error)
      return {success: false, error: 'An unexpected error occurred. Please try again'}
    }
  }

  const login = async (email: string, password: string) => {
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/auth/login`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      })

      const data = await response.json()

      if (!response.ok) {
        return {success: false, error: data.message || 'Registration failed'}
      }

      setAccessToken(data.accessToken)
      setIsAuthenticated(true)

      return { success: true }

    }catch (error){
      console.error("Registration error", error)
      return {success: false, error: 'An unexpected error occurred. Please try again'}
    }
  }

  const logout = () => {
    console.log('Logging out');
    setIsAuthenticated(false);
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    accessToken,
    isLoading,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};