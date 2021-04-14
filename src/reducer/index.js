import constants from '../resourses/const';

const defaultState = {
    userApp:{
        currentUser:{

        },
        image:"",
        isLogin:false,
        token:"",
        email:''
    }
}

const reducer = (state = defaultState,action) => {
    var newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case constants.action.action_user_login:
            newState.userApp.currentUser = action.value ? action.value : newState.userApp.currentUser;
            newState.userApp.isLogin = action.value ? true : false ;//newState.userApp.currentUser && newState.userApp.currentUser.id;
            newState.userApp.token = action.value ? "Bearer "+action.value.token : "";
            return newState;
        case constants.action.action_user_logout:
            newState.userApp.currentUser = {};
            newState.userApp.isLogin = false;
            newState.userApp.token = "";
            return newState;
        default:{}
    }
    return newState;
}

export default reducer
