import {
    SET_URL,
    SET_URL_STARTED,
    SET_URL_SUCCESS,
    SET_URL_FAILURE,
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

  const defaultState = {
    loading: false,
    onPopulateUrls: false,
    statusSetUrl: [],
    urls: [],
    urlsCount: 0,
    serverError: null,
    checkUrl: "",//this url pasted to input
};

  const initialState = {
    loading: false,
    onPopulateUrls: false,
    statusSetUrl: [],
    urls: [],
    urlsCount: 0,
    serverError: null,
    // baseUrl: "",//this url is used if isset relative links for ajax
    checkUrl: "",//this url pasted to input
};

export default function urlReducer(state = initialState, action) {
    switch (action.type) {
        case SET_URL_STARTED:
            console.log(SET_URL_STARTED);
            return {
                ...state,
                statusSetUrl: [...state.statusSetUrl, action.payload.statusSetUrl],
                // loading: true
            };
        case SET_URL:
            console.log(SET_URL, action.payload.params);
            return {
                ...state,
                urls: [...state.urls, action.payload.params]
            };    
        case SET_URL_SUCCESS:
            console.log(SET_URL_SUCCESS);
            return {
                ...state,
                // loading: false,
                statusSetUrl: [...state.statusSetUrl, action.payload.statusSetUrl],
            };
        case SET_URL_FAILURE:
            console.log(SET_URL_FAILURE);
            return {
                ...state,
                // loading: false,
                statusSetUrl: [...state.statusSetUrl, action.payload.statusSetUrl],
            };    
        case START_POPULATE_URLS:
            console.log(POPULATE_URLS_STARTING);
            return {
                ...state,
                loading: true,
                onPopulateUrls: POPULATE_URLS_STARTING
            }; 
        case END_POPULATE_URLS:
            console.log(POPULATE_URLS_ENDING);
            return {
                ...state,
                loading: false,
                onPopulateUrls: POPULATE_URLS_ENDING
            };       
        case SERVER_ERROR:
            console.log(SERVER_ERROR);
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
            console.log(SET_CHECK_URL);
            return {
                ...state,
                checkUrl: action.payload.url
            };
        case CLEAR_URLS:
            console.log(CLEAR_URLS);
            return {
                ...state,
                ...defaultState

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