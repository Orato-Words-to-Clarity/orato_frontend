"use client"
import { publicGateway } from '@/services/gateways';
import { orato } from '@/services/urls';
import { CredentialDataType, SignupDataType } from '@/app/types';
import { Dispatch } from 'react';




export const authLogin = async(
    credentialData : CredentialDataType,
    setError : Dispatch<React.SetStateAction<string>>,
    setLoading : Dispatch<React.SetStateAction<boolean>>
) =>{
   
    
    publicGateway
    .post(orato.login, credentialData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then((response) => {
        
        localStorage.setItem('accessToken', response.data.data.access_token);
        localStorage.setItem('refreshToken', response.data.data.refresh_token);
        console.log(response.data.data);
        
        window.location.href='/dashboard';
    })
    .catch((error) => {
        console.log(error);
        setError(error.response.data.message);
        
    })
    .finally(()=>{
        setLoading(false);
    })    
    
}

export const authSignup = async(signupData : SignupDataType,
    setError : Dispatch<React.SetStateAction<string>>,
    setLoading : Dispatch<React.SetStateAction<boolean>>
) =>{
    
   publicGateway
   .post(orato.signup, signupData)

   .then((response) => {
      console.log(response)
      const credData = {
        email: signupData.email,
        password: signupData.password,
      };
  
      authLogin(credData, setError, setLoading);
      
    //   localStorage.setItem('accessToken', response.data.data.access_token);
    //   localStorage.setItem('refreshToken', response.data.data.refresh_token);
    //   console.log(response.data.data);
      
   })
   .catch((error) =>{
    console.log(error);
    setError(error.response.data.message);
   })
   .finally(() =>{
      setLoading(false);
   })

}