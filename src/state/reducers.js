const initialState = {
    stage : 2,
    sub_stage : 0
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'NEXT_STAGE':
            return { ...state, stage : state.stage + 1 };
        case 'RESET':
            return { ...state, stage : 0, sub_stage : 0 };
        default:
            return state;
    }
}

export default reducer;