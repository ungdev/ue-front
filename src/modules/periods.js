import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'

export const SET_PERIODS = 'periods/SET_PERIODS'
export const REMOVE_PERIOD = 'periods/REMOVE_PERIOD'
export const ADD_PERIOD = 'periods/ADD_PERIOD'
export const EDIT_PERIOD = 'periods/EDIT_PERIOD'

const initialState = {
  periods: []
}

export default (state = initialState, action) => {
  let periods = null
  switch (action.type) {
    case SET_PERIODS:
      return {
        ...state,
        periods: action.payload
      }
    case REMOVE_PERIOD:
      periods = state.periods.slice()
      periods = periods.filter(a => a.id !== action.payload)
      return {
        ...state,
        periods
      }
    case ADD_PERIOD:
      periods = state.periods.slice()
      periods.push(action.payload)
      return {
        ...state,
        periods
      }
    case EDIT_PERIOD:
      periods = state.periods.slice()
      const index = periods.findIndex(period => period.id === action.payload.id)
      periods[index].name = action.payload.name
      return {
        ...state,
        periods
      }
    default:
      return state
  }
}

export const fetchPeriods = () => {
  return async dispatch => {
    try {
      const res = await axios.get('periods')
      if (res.status === 200)
        dispatch({ type: SET_PERIODS, payload: res.data })
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

export const deletePeriod = id => {
  return async dispatch => {
    try {
      const res = await axios.delete(`periods/${id}`)
      if (res.status === 200) dispatch({ type: REMOVE_PERIOD, payload: id })
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

export const createPeriod = values => {
  return async dispatch => {
    try {
      const res = await axios.post(`periods`, values)
      if (res.status === 200)
        dispatch({ type: ADD_PERIOD, payload: res.data })
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

export const editPeriod = (id, name) => {
  return async dispatch => {
    try {
      const res = await axios.put(`periods/${id}`, { name })
      if (res.status === 200)
        dispatch({ type: EDIT_PERIOD, payload: { id, name } })
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
