import {
  CHANGE_WIDGET,
  CHANGE_SAMPLE
} from './types'



export const changeWidget = (name) => {
  return  (dispatch,getState) => {
    dispatch({
      type:CHANGE_WIDGET,
      payload:name
    }
    )
  }
}


export const changeSample = (obj) => {
  return  (dispatch,getState) => {
    dispatch({
      type:CHANGE_SAMPLE,
      payload:obj
    }
    )
  }
}
