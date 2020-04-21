const initState = {};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log('Login failed')
            return {
                ...state,
                authError: 'Login failed',

            };

        case 'LOGIN_SUCCESS':
            console.log('Login success');
            console.log(state);
            return {
                ...state,
                authError: 'Login success',

            };
        case 'SIGNOUT_SUCCESS' :
            console.log('signout success');
            return {
                ...state,
                authError: 'Logout success'
            }
        default:
            return state
    }
};

export default authReducer