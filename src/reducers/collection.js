import {
    GET_COLLECTIONS,
    GET_COLLECTION,
    ADD_COLLECTION,
    UPDATE_COLLECTION,
    COMPLETE_COLLECTION,
    DELETE_COLLECTION,
    COLLECTION_ERROR
} from '../actions/types';

const initialState = { 
    collections: [],
    collection: null,
    loadingCollection:true,
    error:{}
 }

 export default function (state=initialState, action){
     const {type, payload} = action;

     switch(type){
         case GET_COLLECTIONS:
            return {
                ...state,
                collections: payload,
                loadingCollection:false
            }
         case GET_COLLECTION:
            return {
                ...state,
                collection: payload,
                loadingCollection:false
            }
         case ADD_COLLECTION:
            return{
                ...state,
                collections: [...payload,...state.collections],
                loadingCollection:false
            }
         case UPDATE_COLLECTION:
            console.log(payload);
            return{
                ...state,
                collections: state.collections.map(collection=>collection.id === payload.id ? payload.data : collection),
                loadingCollection:false
            }
         case COMPLETE_COLLECTION:
            return{
                ...state,
                collections: state.collections.map(collection=>collection.id === payload ? {...collection,status:1} : collection),
                loadingCollection:false
            }
         case DELETE_COLLECTION:
            return{
                ...state,
                collections: state.collections.filter(collection=>collection.id !== payload),
                loadingCollection:false
            }
         case COLLECTION_ERROR:
            return {
                ...state,
                error: payload,
                loadingCollection:false
            }
        default:
            return state;
     }
 }