import React, {useReducer} from 'react'

const initialState = {
  accessToken: '',
  refreshToken: '',
  messages: [],
} 

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TOKENS':
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      }

    case 'CLEAR_TOKEN':
      return {
        ...state,
        accessToken: initialState.accessToken,
        refreshToken: initialState.refreshToken,
      }

    case 'ADD_MESSAGES':
      return {
        ...state,
        messages: [...state.messages, ...action.payload],
      }
  
    default:
      return state
  }
}

export const AppContext = React.createContext(initialState)

export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <AppContext.Provider value={{state, dispatch}}>
    {props.children}
  </AppContext.Provider>
}
