import {
    SET_URLS,
    SET_URLS_STARTED,
    SERVER_ERROR,
    // SET_BASE_URL,
    SET_CHECK_URL,
    CLEAR_URLS
  } from '../actions/types';


  const initialState = {
    loading: false,
    urls: [],
    serverError: null,
    // baseUrl: "",//this url is used if isset relative links for ajax
    checkUrl: "",//this url pasted to input
    
};

export default function urlReducer(state = initialState, action) {
    switch (action.type) {
        case SET_URLS_STARTED:
            return {
                ...state,
                loading: true
            };
        case SET_URLS:
            // console.log(action.payload);
            return {
                ...state,
                loading: false,
                serverError: null,
                urls: [...state.urls, action.payload]
            };
        case SERVER_ERROR:
            return {
                ...state,
                loading: false,
                serverError: action.payload.error
            };
        // case SET_BASE_URL:
        //     console.log(action.payload.url);
        //     return {
        //         ...state,
        //         baseUrl: action.payload.url
        //     };
        case SET_CHECK_URL:
            // console.log(action.payload.url);
            return {
                ...state,
                checkUrl: action.payload.url
            };
        case CLEAR_URLS:
            return {
                ...state,
                urls: []
            };        
        default:
            return state;
    }
}
















// import {
//     CHECK_URL_SUCCESS,
//     CHECK_URL_FAILURE,
//     CHECK_URL_STARTED,
//     SET_BASE_URL,
//     SET_CHECK_URL
// } from '../actions/types';

// const initialState = {
//     loading: false,
//     baseUrl: "",//this url is used if isset relative links for ajax
//     checkUrl: "",//this url pasted to input
//     urls: [],
//     error: null
// };

// export default function urlReducer(state = initialState, action) {
//     switch (action.type) {
//         case CHECK_URL_STARTED:
//             return {
//                 ...state,
//                 loading: true
//             };
//         case CHECK_URL_SUCCESS:
//             console.log(action.payload);
//             return {
//                 ...state,
//                 loading: false,
//                 error: null,
//                 urls: [...state.urls, action.payload]
//             };
//         case CHECK_URL_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload.error
//             };
//         case SET_BASE_URL:
//             console.log(action.payload.url);
//             return {
//                 ...state,
//                 baseUrl: action.payload.url
//             };
//         case SET_CHECK_URL:
//             console.log(action.payload.url);
//             return {
//                 ...state,
//                 checkUrl: action.payload.url
//             };    
//         default:
//             return state;
//     }
// }