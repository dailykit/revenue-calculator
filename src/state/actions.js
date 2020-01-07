export const nextStage = (payload) => {
    return {
        type : 'NEXT_STAGE',
        payload
    }
}

export const nextStage = () => {
    return {
        type : 'RESET'
    }
}