import { LOADING, FETCH_STATE_WISE_SUCCESS, FETCH_STATE_WISE_FAIL, SET_TOTAL_CASES, SET_CHART_DATA, SET_CONFIRM_CHART_DATA, SET_TODAY_NEWS, SET_DISTRICT_WISE, SET_STATE_TOTAL, SET_STATE_CODE, SET_STATE_DAILY_CONFIRMED, SET_STATE_DAILY_DEAD, SET_DEAD_CHART_DATA, SET_RECOVERED_CHART_DATA, SET_TEST_DATA, SET_STATE_MAP_DATA, SET_STATE_DISTRICT_DATA } from "./ActionTypes";

const INITIAL_STATE = {
  mapData: [],
  setTotalCases: {},
  loading: false,
  chartData: [],
  chatConfirmData: {},
  chartRecoveredData: {},
  chartDeadData: {},
  stateData: [],
  newsUpdate: [],
  districtWiseData: {},
  selectedStateTotal: {},
  selectedStateCode: "",
  dailyConfirmed: [],
  dailyDead: [],
  testData: [],
  selectedStateMapData: {},
  stateDistricts:[],
};

export default  (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case LOADING:
        return {
          ...state,
          loading: action.payload,
        };
      case FETCH_STATE_WISE_SUCCESS:
        return {
          ...state,
          mapData: [...action.mapData],
          stateData: action.stateData,
        };
      case FETCH_STATE_WISE_FAIL:
        return {
          ...state,
        };
      case SET_TOTAL_CASES:
        return {
          ...state,
          setTotalCases: action.payload,
        };
      case SET_TODAY_NEWS:
        return {
          ...state,
          newsUpdate: action.payload,
        };
      case SET_CHART_DATA:
        return {
          ...state,
          chartData: action.payload,
        };
      case SET_CONFIRM_CHART_DATA:
        return {
          ...state,
          chatConfirmData: action.payload,
        };

      case SET_DEAD_CHART_DATA:
        return {
          ...state,
          chartDeadData: action.payload,
        };
      case SET_RECOVERED_CHART_DATA:
        return {
          ...state,
          chartRecoveredData: action.payload,
        };
      case SET_DISTRICT_WISE:
        return {
          ...state,
          districtWiseData: action.payload,
        };
      case SET_STATE_TOTAL:
        return {
          ...state,
          selectedStateTotal: action.payload,
        };
      case SET_STATE_DAILY_CONFIRMED:
        return {
          ...state,
          dailyConfirmed: action.payload,
        };
      case SET_STATE_DAILY_DEAD:
        return {
          ...state,
          dailyDead: action.payload,
        };
      case SET_STATE_CODE:
        return {
          ...state,
          selectedStateCode: action.payload,
        };
      case SET_TEST_DATA:
        return {
          ...state,
          testData: action.payload,
        };
      case SET_STATE_MAP_DATA:
        return {
          ...state,
          selectedStateMapData: action.payload,
        };
      case SET_STATE_DISTRICT_DATA:
        return {
          ...state,
          stateDistricts: action.payload,
        };
      default:
        return state;
    }
};