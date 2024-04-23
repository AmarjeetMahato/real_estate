



import React , { createContext, useEffect, useState } from "react";

interface User {
    _id: string;
    email: string;
    username: string;
    password: string;
    createdAt: string;
    updatedAt: string;
  }
  
  interface AuthContextType {
    currentUser: User | null;
  }

export const AuthContext = createContext<AuthContextType>({ currentUser: null })



export const AuthContextProvider = ({children}:{children:React.ReactNode}) => {
    const storedUser = localStorage.getItem('User');
    const [currentUser, setCurrentUser] =  useState(storedUser ? JSON.parse(storedUser) : null);


    useEffect(() => {
        // Save currentUser to localStorage whenever it changes
        localStorage.setItem('User', JSON.stringify(currentUser));
    }, [currentUser]);
    
     return (
           <AuthContext.Provider value={{currentUser}}>
            {children}
           </AuthContext.Provider>
     )
}