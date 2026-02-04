export function reducer(state, action) {
    switch (action.type) {
        case "INIT": return action.data;
        case "CREATE": return [action.data, ...state];
        default: return state;
    }
}
