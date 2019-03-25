import React, {useReducer} from 'react'

const initialState = {
  messages: [],
} 

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGES':
    
      const messages = [...state.messages, ...action.payload]
      return {
        ...state,
        messages,
      }
  
    default:
      return state
  }
}

export const AppContext = React.createContext(initialState);

export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>
    {props.children}
  </AppContext.Provider>
}