import axios from 'axios';

import authHeader from '../_helpers/Auth-header.js';
import API_ROUTE from '../_helpers/Route-api';
import Common from './actions-common';

const element = 'users';
const commonActions = new Common(element);

const userActions = {
    ...commonActions.getActions,
    login,
    logout,
    signUp,
};

export default userActions;

function login( user ){
    
    const { email, password } = user;
    
    return dispatch => {
        const data = {
        	"auth": {
        		"email": email,
        		"password": password
        	}
        };
        document.body.classList.add('busy-cursor');
        axios.post(API_ROUTE + 'user_token', data)
        .then(response => {
            console.log( response );
            const token = response.data;
            if( token && token.jwt ){
                dispatch(success( 'Log success' ));
                window.localStorage.setItem('user', JSON.stringify( token ));
                getUserId( email );
            }
        })
        .catch(error => {
            dispatch(failure('The user doesnt exist or doesnt match the password'));
        });
        document.body.classList.remove('busy-cursor');
    };
    
    function success(user) { return { type: 'LOGIN-SUCCESS', data: user } }
    function failure(error) { return { type: 'LOGIN-FAILURE', data: error } }
    function getUserId( email ){ 
        document.body.classList.add('busy-cursor'); 
        axios.get(API_ROUTE + 'users', {headers: authHeader()})
        .then(response => {
            response.data.data.map( user => {
                if(user.attributes.email === email){
                    window.localStorage.setItem('user-id', user.id);
                }
                return true;
            });  
        })
        .catch(error => {
            console.log(error.response);
        });
        document.body.classList.remove('busy-cursor');
    }
}

function logout(){
    window.localStorage.removeItem('user');
    return({
        type: 'LOGOUT-SUCCESS'
    });
}

function signUp(user){
    
    return async dispatch => {
        
        const newUser = {
            "user": {
                ...user
            }
        };
        
        document.body.classList.add('busy-cursor');
        await axios.post(API_ROUTE + 'users', newUser)
        .then(response => {
            dispatch(success('User added succesfully'));
            dispatch( login( user ) );
        })
        .catch(error => {
            dispatch(failure(error.response));
        });
        document.body.classList.remove('busy-cursor');
    };    
    
    function success(message) { return { type: 'SIGNUP-SUCCESS', data: message } }
    function failure(error) { return { type: 'SIGNUP-FAILURE', data: error } }
    
}