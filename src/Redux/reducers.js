import { LOADING, FETCH_STATE_WISE_SUCCESS, FETCH_STATE_WISE_FAIL, SET_TOTAL_CASES, SET_CHART_DATA, SET_CONFIRM_CHART_DATA } from "./ActionTypes";

const INITIAL_STATE = {
    mapData: [],
    setTotalCases: {},
    loading: false,
    chartData:[],
    chatConfirmData:{},
    stateData:[]
};

export default  (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case FETCH_STATE_WISE_SUCCESS:
            return {
                ...state,
                mapData: [...action.mapData],
                stateData:action.stateData
            };
        case FETCH_STATE_WISE_FAIL:
            return {
                ...state
             
            };
        case SET_TOTAL_CASES:
            return {
                ...state,
               setTotalCases:action.payload
            };
        // case LOADING:
        //     return {
        //         ...state,
        //         loading: action.payload
        //     };
        case SET_CHART_DATA:
            return {
                ...state,
                chartData: action.payload
            };
        case SET_CONFIRM_CHART_DATA:
            return {
                ...state,
                chatConfirmData: action.payload
            };
        default:
            return state;
    }
};