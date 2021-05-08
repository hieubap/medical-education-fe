import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { Provider } from "react-redux";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { applyMiddleware,createStore } from 'redux';
import thunk from 'redux-thunk';
import './App.css';
import Main from "./Main";
import AppReducer from './reducer/index';
const store = createStore(AppReducer,applyMiddleware(thunk));

const Kernel = () => (
    <>
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} autoClose={6000}></ToastContainer>
        <Provider store={store}>
            <Main />
        </Provider>
        
    </>
)

export default Kernel;