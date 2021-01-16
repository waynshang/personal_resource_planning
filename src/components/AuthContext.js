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
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }
  function logout() {
    return auth.signOut()
  }
  function updateCurrentUserProfile(firstName, lastName){
    const displayName = firstName + ' ' + lastName
    const currentUser = auth.currentUser
    return currentUser.updateProfile({displayName: displayName})
  }
  function updatePhoneNumber(phoneNumber){
    const currentUser = auth.currentUser
    return currentUser.updatePhoneNumber(phoneNumber)

  }


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      // console.log("unsubscribe")
      // console.log(user)
      if (user){
        setCurrentUser(user)
      }else{
        setCurrentUser(null)
      }
      setLoading(false)
    })

    return unsubscribe
  },[])

  const value = {currentUser, signup, login, logout, updateCurrentUserProfile, updatePhoneNumber}

  //賦全域變數值
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}