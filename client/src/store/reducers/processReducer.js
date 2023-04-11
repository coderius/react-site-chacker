import { VIEW_SHOW_TABLE, VIEW_SHOW_LISTGROUP, CURRENT_SAVE, POPULATE_RESULT, CALC_CONFIG_MODE_COUNT, CALC_CONFIG_ITEMS_COUNT, IS_WSS_OPEN, MESSAGE, GET_ERROR } from '../types'

const initialState = {
    toSave: [], //for server saving
    result: [], //from server to view
    currentStatictic: [],//getted from wss and rewriten in life process
    configModeCount: 3, //calc mode 
    configItems: 3, //count of items recived by websocket
    showListGroup: false,
    showTable: false,
    isWssOpen: false,
    message: "",
    error: ""
}

export default function (state = initialState, action) {

    //Save to toSave:[]
    switch (action.type) {
        case CURRENT_SAVE:
            console.log('CURRENT_SAVE');
            return {
                ...state,
                currentStatictic: action.payload,
            }
            break;
        //Save to result:[]
        case POPULATE_RESULT:
            console.log('POPULATE_RESULT');
            return {
                ...state,
                result: action.payload,
            }
            break;

        case VIEW_SHOW_TABLE:
            console.log('VIEW_SHOW_TABLE');
            return {
                ...state,
                showTable: action.payload,
            }
            break;

        case VIEW_SHOW_LISTGROUP:
            console.log('VIEW_SHOW_LISTGROUP');
            return {
                ...state,
                showListGroup: action.payload,
            }
            break;

        case CALC_CONFIG_MODE_COUNT:
            console.log('CALC_CONFIG_MODE_COUNT');
            return {
                ...state,
                configModeCount: action.payload,
            }
            break;

        case CALC_CONFIG_ITEMS_COUNT:
            console.log('CALC_CONFIG_ITEMS_COUNT');
            return {
                ...state,
                configItems: action.payload,
            }
            break;

        case IS_WSS_OPEN:
            console.log('IS_WSS_OPEN');
            return {
                ...state,
                isWssOpen: action.payload,
            }
            break;

        case MESSAGE:
            console.log('MESSAGE');
            return {
                ...state,
                message: action.payload,
            }
            break;

        case GET_ERROR:
            console.log('GET_ERROR');
            return {
                ...state,
                error: action.payload,
            }
            break;
            
            
        default: return state
    }

}