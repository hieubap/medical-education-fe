import React from 'react'
import PropTypes from 'prop-types'
import constants from '../resourses/const';

const defaultState = {
    userApp:{
        currentUser:{

        },
        image:"",
        isLogin:false,
        loginToken:"",
        email:''
    }
}

const reducer = (state = defaultState,action) => {
    var newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case constants.action.action_user_login:
            newState.userApp.currentUser = action.value ? action.value : newState.userApp.currentUser;
            newState.userApp.isLogin = action.value != null ? true : false ;//newState.userApp.currentUser && newState.userApp.currentUser.id;
            newState.userApp.loginToken = newState.userApp.currentUser ? newState.userApp.currentUser.token : "";
            console.log(action);
            return newState;
    }
    return newState;
}

export default reducer
