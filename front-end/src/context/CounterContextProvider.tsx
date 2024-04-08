import React, { ReactNode, createContext, useReducer, useState } from 'react'

type CounterContextProviderProps = {
  children: ReactNode
}

export const CounterContext = createContext({} as any)

const initialState = {
  value : 10
}

const reducer = (state:any, action: any) =>{
  switch(action.type){
    case "INCREMENT": 
      return {value: state.value +1}
    case "DECREMENT": 
      return {value: state.value -1}
    case "INCREASE": 
      return {value: state.value + action.payload}
    default: return state
  }
}



const CounterContextProvider = ({children}: CounterContextProviderProps) => {
    const [count, dispatch] = useReducer(reducer, initialState)
  return (
    <div>
        <CounterContext.Provider value={{count, dispatch}}>{children}</CounterContext.Provider>
    </div>
  )
}

export default CounterContextProvider