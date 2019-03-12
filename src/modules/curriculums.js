import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'

export const SET_CURRICULUMS = 'curriculums/SET_CURRICULUMS'
export const SET_ROOTS = 'curriculums/SET_ROOTS'
export const ADD_CHILDS = 'curriculums/ADD_CHILDS'
export const ADD_CHILD = 'curriculums/ADD_CHILD'
export const REMOVE_CHILD = 'curriculums/REMOVE_CHILD'

const initialState = {
  curriculums: [],
  treeData: null
}

export default (state = initialState, action) => {
  let treeData = null
  let pos = null
  let node
  switch (action.type) {
    case SET_CURRICULUMS:
      return {
        ...state,
        curriculums: action.payload
      }
    case SET_ROOTS:
      return {
        ...state,
        treeData: action.payload
      }
    case ADD_CHILDS:
      treeData = state.treeData.slice()
      pos = action.payload.pos
      pos = pos.split('-')
      node = treeData[pos[1]]
      for (let index = 2; index < pos.length; index++) {
        node = node.children[pos[index]]
      }
      node.children = action.payload.children
      return {
        ...state,
        treeData
      }
    case ADD_CHILD:
      treeData = state.treeData.slice()
      pos = action.payload.pos
      node = treeData[pos[1]]
      for (let index = 2; index < pos.length; index++) {
        node = node.children[pos[index]]
      }
      node.children.push(action.payload.child)
      return {
        ...state,
        treeData
      }
    case REMOVE_CHILD:
      treeData = state.treeData.slice()
      pos = action.payload.pos
      node = treeData[pos[1]]
      for (let index = 2; index < pos.length; index++) {
        node = node.children[pos[index]]
      }
      node.children = node.children.filter(c => c.key !== action.payload.childId)
      return {
        ...state,
        treeData
      }
    default:
      return state
  }
}

export const fetchCurriculums = () => {
  return async dispatch => {
    try {
      const res = await axios.get('curriculums')
      if (res.status === 200)
        dispatch({ type: SET_CURRICULUMS, payload: res.data })
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
export const fetchRoots = () => {
  return async dispatch => {
    try {
      const res = await axios.get('curriculums/roots')
      if (res.status === 200)
        dispatch({
          type: SET_ROOTS,
          payload: res.data.map(r => {
            return { key: r.id, title: r.name }
          })
        })
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

export const fetchChilds = (id, pos) => {
  return async dispatch => {
    try {
      const res = await axios.get(`curriculums/childs/${id}`)
      if (res.status === 200)
        dispatch({
          type: ADD_CHILDS,
          payload: {
            id,
            pos,
            children: res.data.map(child => {
              return {
                key: child.id,
                title: child.name,
                isLeaf: child.lastChild
              }
            })
          }
        })
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

export const addChild = (id, pos, name) => {
  return async dispatch => {
    try {
      const res = await axios.post(`curriculums`, { name, parentId: id })
      if (res.status === 200)
        dispatch({
          type: ADD_CHILD,
          payload: {
            id,
            pos,
            child: {
              key: res.data.id,
              title: name,
              isLeaf: true
            }
          }
        })
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
export const removeChild = (id, pos, childId) => {
  return async dispatch => {
    try {
      const res = await axios.delete(`curriculums/${childId}`)
      if (res.status === 200)
        dispatch({
          type: REMOVE_CHILD,
          payload: {
            id,
            pos,
            childId
          }
        })
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
