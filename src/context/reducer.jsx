export function reducer(state, action) {
    switch (action.type) {
        case "CREATE": return [action.data, ...state];
        case "DELETE": return state.filter((item) => String(item.seq) !== String(action.seq));
        default: return state;
    }
}
