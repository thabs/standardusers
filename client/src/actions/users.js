import axios from 'axios';
import {
    CREATE_USER,
    UPDATE_USER,
    FETCH_USERS,
    DELETE_USER,
} from './types';

export const createUser = values => async dispatch => {
    try{
        const res = await axios.post('/api/users', values);
        dispatch({ type: CREATE_USER, payload: res.data });

    }catch(error){
        throw(error);
    }   
};

export const updateUser = (userId, values) => async dispatch => {
    try{
        const res = await axios.put(`/api/users/${userId}`, values);
        dispatch({ type: UPDATE_USER, payload: res.data });

    }catch(error){
        throw(error);
    }   
};

export const fetchUsers = () => async dispatch => {
    try{ 
        const res = await axios.get('/api/users');
        dispatch({ type: FETCH_USERS, payload: res.data });
    }catch(error){
        throw(error);
    }   
};

export const deleteUser = (userId) => async dispatch => {
    try{
        const res = await axios.delete(`/api/users/${userId}`);
        dispatch({ type: DELETE_USER, payload: res.data });

    }catch(error){
        throw(error);
    }   
};



