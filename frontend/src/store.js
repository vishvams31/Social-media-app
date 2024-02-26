// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './reducers/AuthReducer';
import { reducer as formReducer } from 'redux-form';

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        form: formReducer
    },
});

export default store;
