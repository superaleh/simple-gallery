import React from 'react'
import axios from 'axios'

const initialState = {
  albums: null,
  photos: null,
  users: null,
  openAlbumId: null,
  openPhotoIndex: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALBUMS':
      return {
        ...state,
        albums: action.payload,
      }
    case 'SET_PHOTOS':
      return {
        ...state,
        photos: action.payload,
      }
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      }
    default:
      return state
  }
}

export const DataContext = React.createContext()

export const DataProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(() => {
    const resources = ['albums', 'photos', 'users']
    resources.forEach((r) => {
      axios('https://jsonplaceholder.typicode.com/' + r)
        .then((res) => {
          dispatch({ type: 'SET_' + r.toUpperCase(), payload: res.data })
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }, [])

  return <DataContext.Provider value={[state, dispatch]}>{children}</DataContext.Provider>
}
