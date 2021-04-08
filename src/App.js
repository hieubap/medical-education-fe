import React from "react";
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import AppReducer from './reducer/index';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import Main from "./Main";
import './App.css';

const store = createStore(AppReducer,applyMiddleware(thunk));

const Kernel = () => (
    <>
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} autoClose={3000}></ToastContainer>
        <Provider store={store}>
            <Main />
        </Provider>
        
    </>
)

export default Kernel;