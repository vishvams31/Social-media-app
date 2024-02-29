// src/reducers/AuthReducer.js

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
    token: localStorage.getItem("token") || null
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return { ...state, isFetching: true, error: null };
        case 'LOGIN_SUCCESS':
            return { ...state, token: action.payload.token, user: action.payload.user, isFetching: false, error: null };
        case 'LOGIN_FAILURE':
            return { ...state, user: null, isFetching: false, error: action.payload };
        case 'FOLLOW':
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: [...state.user.followings, action.payload],
                },
            };
        case 'UNFOLLOW':
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: state.user.followings.filter(
                        (following) => following !== action.payload
                    ),
                },
            };
        default:
            return state;
    }
};
export default AuthReducer;
