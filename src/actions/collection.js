import axios from 'axios';
import {setAlert} from './alert';
import {
    GET_COLLECTIONS,
    GET_COLLECTION,
    ADD_COLLECTION,
    UPDATE_COLLECTION,
    DELETE_COLLECTION,
    COLLECTION_ERROR,
    COMPLETE_COLLECTION
} from './types';

// Add addCollection
export const addCollection = data => async dispatch => {
    try {
        console.log("add collection running")
        dispatch({
            type:ADD_COLLECTION,
            payload:[data]
        });
    } catch (err) {
        dispatch({
            type: COLLECTION_ERROR,
            payload: {status: err.response.status }
        });
    }
}

// Get post
export const getCollections = () => async dispatch => {
    try {
        const res=await axios.get('https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list');

        dispatch({
            type:GET_COLLECTIONS,
            payload:res.data
        });
    } catch (err) {
        console.error(err);
        dispatch({
            type: COLLECTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get post
export const getCollection = id => async dispatch => {
    try {
        const res=await axios.get(`/api/collection/load/${id}`);

        dispatch({
            type:GET_COLLECTION,
            payload:res.data
        });
    } catch (err) {
        console.error(err);
        dispatch({
            type: COLLECTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Update Collection
export const updateCollection = (id,data) => async dispatch => {
    try {

        dispatch({
            type:UPDATE_COLLECTION,
            payload:{id,data}
        });

        dispatch(setAlert('Collection Completed', 'success'));
    } catch (err) {
        dispatch({
            type: COLLECTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Complete Collection
export const completeCollection = id => async dispatch => {
    try {


        dispatch({
            type:COMPLETE_COLLECTION,
            payload:id
        });

        // dispatch(setAlert('Collection Completed', 'success'));
    } catch (err) {
        dispatch({
            type: COLLECTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete Collection
export const deleteCollection = id => async dispatch => {
    try {

        dispatch({
            type:DELETE_COLLECTION,
            payload:id
        });

        dispatch(setAlert('Collection Removed', 'success'));
    } catch (err) {
        dispatch({
            type: COLLECTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}