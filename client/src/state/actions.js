export const nextStage = () => {
    return {
        type : 'NEXT_STAGE',
    }
}

export const nextSubStage = () => {
    return {
        type : 'NEXT_SUB_STAGE'
    }
}

export const prevSubStage = () => {
    return {
        type : 'PREV_SUB_STAGE'
    }
}

export const reset = () => {
    return {
        type : 'RESET'
    }
}

export const customSubStage = (payload) => {
    return {
        type : 'CUSTOM_SUB_STAGE',
        payload
    }
} 

export const changeValue = (payload) => {
    return {
        type : 'CHANGE_VALUE',
        payload
    }
}