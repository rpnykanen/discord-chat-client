import React, {useReducer} from 'react'

const initialState = {
  messages: [],
  users: []
} 

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGES':
      return {
        ...state,
        messages: [...state.messages, ...action.payload],
      }

      case 'ADD_USERS':
      return {
        ...state,
        users: action.payload,
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
