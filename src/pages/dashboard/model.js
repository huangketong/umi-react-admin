
export default {
    namespace: 'dashboard',
    state: {
        text: 'dashboard.....',
    },
    subscriptions: {

    },
    effects: {

    },
    reducers: {
        updateStates(state, {payload}){
            return {
                ...state,
                ...payload
            }
        }
    },
};
