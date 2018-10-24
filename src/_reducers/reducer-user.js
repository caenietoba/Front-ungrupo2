const initial_state = {
    logged_in: false,
    data: {}
};

const userReducer = function(state = initial_state, action){
    const {type, data} = action;
    
    switch(type){
        case 'LOGIN-SUCCESS':
            return({
                logged_in: true,
                data
            });
        case 'LOGIN-FAILURE':
            console.log(data)
            return({
                logged_in: false,
                data
            });
        case 'LOGOUT-SUCCESS':
            return state;
        default:
            return state;
    }
};

export default userReducer;