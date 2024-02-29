import axios from 'axios'
import toast from 'react-hot-toast';
export const loginStart = () => ({
    type: 'LOGIN_START',
});

export const loginSuccess = (authUser) => (dispatch) => {
    // console.log(token)
    console.log(authUser)
    dispatch({
        type: 'LOGIN_SUCCESS',
        payload: authUser
    });
    // Store user in localStorage
    // console.log(user)
    console.log(authUser.token)
    localStorage.setItem('user', JSON.stringify(authUser.user));
    localStorage.setItem('token', authUser.token);
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
        const authUser = {
            user: res.data.user,
            token: res.data.token
        }
        console.log(authUser)
        dispatch(loginSuccess(authUser));
        toast.success("Login successfully")
        window.location.reload()
    } catch (err) {
        dispatch(loginFailure(err.message));
    }
};
