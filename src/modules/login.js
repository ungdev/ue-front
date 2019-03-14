import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'
import { push } from 'react-router-redux'
import { fetchUser, SET_USER } from './user'

export const SET_TOKEN = 'login/SET_TOKEN'

const initialState = { token: null }

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    default:
      return state
  }
}

export const contactEtuutt = () => {
  return async dispatch => {
    try {
      const res = await axios.get('etuutt/link')
      if (res.status === 200) {
        window.location = res.data.redirectUri // eslint-disable-line no-restricted-globals
      }
    } catch (err) {
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
        })
      )
    }
  }
}

export const getToken = code => {
  return async dispatch => {
    try {
      const res = await axios.post('etuutt/token', { code })
      dispatch(saveToken(res.data.access_token))
      dispatch(push('/dashboard/home'))
      dispatch(
        notifActions.notifSend({
          message: 'Connexion validée',
          dismissAfter: 2000
        })
      )
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
        })
      )
    }
  }
}

export const autoLogin = () => {
  return async dispatch => {
    if (localStorage.hasOwnProperty('ue-token')) {
      //TODO refresh token
      dispatch({
        type: SET_TOKEN,
        payload: localStorage.getItem('ue-token')
      })

      return dispatch(fetchUser())
    } else {
      return dispatch(logout())
    }
  }
}


export const saveToken = token => {
  return async dispatch => {
    dispatch({
      type: SET_TOKEN,
      payload: token
    })

    localStorage.setItem('ue-token', token)
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({ type: SET_TOKEN, payload: null })
    dispatch({ type: SET_USER, payload: null })

    localStorage.removeItem('ue-token')

    //return dispatch(push('/'))
  }
}
