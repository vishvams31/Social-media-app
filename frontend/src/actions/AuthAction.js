// src/actions/AuthActions.js
import axios from 'axios'
import toast from 'react-hot-toast';
export const loginStart = () => ({
    type: 'LOGIN_START',
});

export const loginSuccess = (user) => (dispatch) => {
    dispatch({
        type: 'LOGIN_SUCCESS',
        payload: user,
    });
    // Store user in localStorage
    // console.log(user)
    localStorage.setItem('user', JSON.stringify(user));
};

export const loginFailure = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: error,
});
export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
});

export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
});
export const loginCall = (userCredentials) => async (dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:8800/api/auth/login", userCredentials);
        dispatch(loginSuccess(res.data));
        toast.success("Login successfully")
    } catch (err) {
        dispatch(loginFailure(err.message));
    }
};
