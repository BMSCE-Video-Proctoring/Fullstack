import { createReducer } from '@reduxjs/toolkit'

const initialState= {
    isAuthenticated:false
 }

export const userreducer= createReducer(initialState,{
    loginRequest: (state)=>{
        state.loading= true
    },
    loginSuccess: (state, action)=>{
        state.loading= false
        state.user = action.payload
        state.isAuthenticated= true 
        
    },
    loginFailure: (state, action )=>{
        state.loading= false
        state.error= action.payload
        state.isAuthenticated= false
    },
    loadUserRequest:(state)=>{
        state.loading= true
    },
    loadUserSuccess:(state,action)=>{
        state.loading= false
        state.user= action.payload
        state.isAuthenticated= true
    },
    loadUserFailure: (state, action )=>{
        state.loading= false
        state.error= action.payload
        state.isAuthenticated= false
    },
    logoutRequest:(state)=>{
        state.loading=true
    },
    logoutSuccess: (state)=>{
        state.loading= false
        state.isAuthenticated=false
        state.user=null
    },
    logoutFailure:(state,action)=>{
    state.loading= false
    state.error= action.payload
    state.user=null
    }
})
