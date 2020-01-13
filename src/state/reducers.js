const initialState = {
    stage : 0,
    sub_stage : 2,
    last_stage: 2
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'NEXT_STAGE':
            return { ...state, stage : state.stage + 1 };
        case 'NEXT_SUB_STAGE':
            return { ...state, sub_stage : state.sub_stage + 1 }
        case 'RESET':
            return { ...state, stage : 0, sub_stage : 0 };
        default:
            return state;
    }
}

export default reducer;