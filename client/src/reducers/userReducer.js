import {
    CREATE_USER,
    UPDATE_USER,
    FETCH_USERS,
    DELETE_USER,
} from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case CREATE_USER:
            return [ ...state, action.payload ];
        case UPDATE_USER:
            return state.map(
                (item) => ((item.Id) === (action.payload.Id)) ? {...item, ...action.payload }  : item 
            ); 
        case FETCH_USERS:
            return action.payload;
        case DELETE_USER:
            const newState = [...state];
            return newState.filter(function( obj ) {
                return ( obj.Id !== action.payload.Id );
            }); 
        default:
            return state;
    }
};