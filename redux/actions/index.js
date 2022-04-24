export const fetchUser = (currentUser) => {
    return (dispatch) => {
        dispatch({
            type: "currentUser",
            payload: currentUser
        })
    }
}
