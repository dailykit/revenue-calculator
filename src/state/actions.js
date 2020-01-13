export const nextStage = (payload) => {
    return {
        type : 'NEXT_STAGE',
        payload
    }
}

export const nextSubStage = (payload) => {
    return {
        type : 'NEXT_SUB_STAGE',
        payload
    }
}

export const reset = () => {
    return {
        type : 'RESET'
    }
}

export const changePhase = (payload) => {
    return {
        type : 'CHANGE_PHASE',
        payload
    }
}