import React, {useContext, useState, useEffect} from 'react'
import {auth} from '../firebase'
//設全域變數
const AuthContext = React.createContext()

//取出全域變數值
export function useAuth(){
  return useContext(AuthContext)
}

export function AuthProvider({children}){
  const [currentUser, setCurrentUser] = useState()

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])

  const value = {currentUser, signup}

  //賦全域變數值
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}