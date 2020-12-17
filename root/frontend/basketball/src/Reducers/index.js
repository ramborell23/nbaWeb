let defaultState = {
    scores: [],
    color:"blue",
    isLoaded:false
}

const mainReducer = (state = defaultState, action) => {
    if (action.type === "CHANGE_SCORES") {
        return {
            ...state,
            scores: action.scores,
            isLoaded:true
        }
    } else {
        return {
            ...state
        }
    }
}


const minReducer = (state = defaultState, action) => {
  if (action.type === "CHANGE_COLOR") {
    return {
      ...state,
      color: action.color,
    };
  } else {
    return {
      ...state,
    };
  }
};


export default mainReducer
