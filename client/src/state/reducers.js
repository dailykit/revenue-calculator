const initialState = {
    stage : 0,
    sub_stage : 0,
    last_stage: 2,
    phase: 1,
    capacity : 300,
    utilization : 200,
    revenue : 150,
    profit : -10,
    price : 0,
    mealKitsPerDay : 0,
    recommendedPrice : 0
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'NEXT_STAGE':
            return { ...state, stage : state.stage + 1 };
        case 'NEXT_SUB_STAGE':
            return { ...state, sub_stage : state.sub_stage + 1 }
        case 'PREV_SUB_STAGE':
            return { ...state, sub_stage : state.sub_stage - 1 }
        case 'RESET':
            return { ...state, stage : 0, sub_stage : 0 };
        case 'CHANGE_VALUE':
            return { ...state, ...action.payload }
        default:
            return state;
    }
}

export default reducer;