
// import Axios from '../axios'
import axios from "axios"
export const loginUser= (username,password)=> async(dispatch)=>{
    try {
        dispatch({
            type:'loginRequest'
        })

        const response= await axios.post('http://localhost:8000/signin/',{
           username: username,
           password: password
        },{
            Headers:{
                'Content-Type':'application/json',
                
            },
            
        })
        localStorage.setItem('token', response.data.token)

        dispatch({
            type:'loginSuccess',
            payload:response.data.user
        })
        
    } catch (error) {
        dispatch({
            type:'loginFailure',
            payload: error.message
        })
    }

}

export const loadUser=()=>async (dispatch)=>{

    try {
        
        dispatch({
            type: 'loadUserRequest'
        })

        const response= await axios.post('http://localhost:8000/isloggedin/',{
           token: `${localStorage.getItem('token')}`
        },{
            Headers:{
                'Content-Type':'application/json',
                
            },
            
        })

        dispatch({
            type: 'loadUserSuccess',
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type:'loadUserFailure',
            payload: error.message
        })
    }
}

export const logoutUser=()=> async(dispatch)=>{

   try {
    dispatch({
        type:'logoutRequest'
    })

    localStorage.removeItem('token')
    dispatch({
        type:'logoutSuccess'
    })
    
   } catch (error) {
    dispatch({
        type:'logoutFailure',
        payload: error
    })
   }
}

export const signUpUser= (username, name, email, password1, password2)=> async(dispatch)=>{
    try {
        dispatch({
            type:'signupRequest'
        })

        const response= await axios.post('http://localhost:8000/signup/',{
           username: username,
           name: name,
           email: email,
           password1: password1,
           password2: password2
        },{
            Headers:{
                'Content-Type':'application/json',
                
            },
            
        })
        // localStorage.setItem('token', response.data.token)

        dispatch({
            type:'signupSuccess',
            payload:response.data.user
        })
        
    } catch (error) {
        dispatch({
            type:'signupFailure',
            payload: error.message
        })
    }

}
