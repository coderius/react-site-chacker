import {
    SET_URL,
    SET_URL_STARTED,
    SERVER_ERROR,
    // SET_BASE_URL,
    SET_CHECK_URL,
    CLEAR_URLS,
    START_POPULATE_URLS,
    END_POPULATE_URLS,
    URLS_COUNT
  } from '../actions/types';

  import {
    POPULATE_URLS_STARTING,
    POPULATE_URLS_ENDING
  } from '../actions/events';

  const initialState = {
    loading: false,
    onPopulateUrls: false,
    urls: [],
    urlsCount: 0,
    serverError: null,
    // baseUrl: "",//this url is used if isset relative links for ajax
    checkUrl: "",//this url pasted to input
    
};

export default function urlReducer(state = initialState, action) {
    switch (action.type) {
        case SET_URL_STARTED:
            return {
                ...state,
                loading: true
            };
        case START_POPULATE_URLS:
            console.log(POPULATE_URLS_STARTING);
            return {
                ...state,
                onPopulateUrls: POPULATE_URLS_STARTING
            }; 
        case END_POPULATE_URLS:
            console.log(POPULATE_URLS_ENDING);
            return {
                ...state,
                onPopulateUrls: POPULATE_URLS_ENDING
            };       
        case SET_URL:
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
        case URLS_COUNT:
            console.log("urls count:", action.payload.count);
            return {
                ...state,
                urlsCount: action.payload.count
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