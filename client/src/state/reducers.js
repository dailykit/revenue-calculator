const initialState = {
    stage : 0,
    sub_stage : 0,
    last_stage: 2,
    phase: 1,
    capacity : 300,
    utilization : 200,
    utilization_percentage: 60,
    revenue : 500,
    profit : 10,
    price : 6.85,
    mealKitsPerDay : 100,
    recommendedPrice : 6.85
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'NEXT_STAGE':
            return { ...state, stage : state.stage + 1 };
        case 'NEXT_SUB_STAGE':
            return { ...state, sub_stage : state.sub_stage + 1 }
        case 'PREV_SUB_STAGE':
            return { ...state, sub_stage : state.sub_stage - 1 }
        case 'CUSTOM_SUB_STAGE':
            return { ...state, sub_stage : action.payload.sub_stage };
        case 'RESET':
            return { ...state, stage : 0, sub_stage : 0 };
        case 'CHANGE_VALUE':
            return { ...state, ...action.payload }
        default:
            return state;
    }
}

export default reducer;