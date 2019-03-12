import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'

export const SET_ATTRIBUTES = 'attributes/SET_ATTRIBUTES'
export const REMOVE_ATTRIBUTE = 'attributes/REMOVE_ATTRIBUTE'
export const ADD_ATTRIBUTE = 'attributes/ADD_ATTRIBUTE'
export const EDIT_ATTRIBUTE = 'attributes/EDIT_ATTRIBUTE'

const initialState = {
  attributes: []
}

export default (state = initialState, action) => {
  let attributes = null
  switch (action.type) {
    case SET_ATTRIBUTES:
      return {
        ...state,
        attributes: action.payload
      }
    case REMOVE_ATTRIBUTE:
      attributes = state.attributes.slice()
      attributes = attributes.filter(a => a.id !== action.payload)
      return {
        ...state,
        attributes
      }
    case ADD_ATTRIBUTE:
      attributes = state.attributes.slice()
      attributes.push(action.payload)
      return {
        ...state,
        attributes
      }
    case EDIT_ATTRIBUTE:
      attributes = state.attributes.slice()
      const index = attributes.findIndex(attribute => attribute.id === action.payload.id)
      attributes[index].name = action.payload.name
      return {
        ...state,
        attributes
      }
    default:
      return state
  }
}

export const fetchAttributes = () => {
  return async dispatch => {
    try {
      const res = await axios.get('attributes')
      if (res.status === 200)
        dispatch({ type: SET_ATTRIBUTES, payload: res.data })
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

export const deleteAttribute = id => {
  return async dispatch => {
    try {
      const res = await axios.delete(`attributes/${id}`)
      if (res.status === 200) dispatch({ type: REMOVE_ATTRIBUTE, payload: id })
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

export const createAttribute = values => {
  return async dispatch => {
    try {
      const res = await axios.post(`attributes`, values)
      if (res.status === 200)
        dispatch({ type: ADD_ATTRIBUTE, payload: res.data })
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

export const editAttribute = (id, name) => {
  return async dispatch => {
    try {
      const res = await axios.put(`attributes/${id}`, { name })
      if (res.status === 200) dispatch({ type: EDIT_ATTRIBUTE, payload: {id, name} })
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
