import React from 'react'
import SignInSide from '../components/SignInSide.js'
import {AuthProvider} from '../components/AuthContext'

export default function SignInPage(){
    return (
        <AuthProvider>
            <SignInSide/>
        </AuthProvider>
    )
}