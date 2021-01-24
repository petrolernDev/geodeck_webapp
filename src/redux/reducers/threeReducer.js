import get from 'lodash.get'
import initialState from '../state/three'
import { CHANGE_WIDGET, CHANGE_SAMPLE } from '../actions/types'

export default function threeReducer(state = initialState, action) {
  const payload = get(action, 'payload')
  switch (action.type) {
    case CHANGE_WIDGET: {
      return { ...state, activeWidget: payload }
    }
    case CHANGE_SAMPLE: {
      return { ...state, sample: { ...payload } }
    }

    default: {
      return state
    }
  }
}
