import { LOADING, FETCH_STATE_WISE_SUCCESS, FETCH_STATE_WISE_FAIL, SET_TOTAL_CASES, SET_CHART_DATA, SET_CONFIRM_CHART_DATA } from "./ActionTypes";

export const fetchStateWise = () => {
return (dispatch)=>{
    fun().then(resp => {
        const arr = resp.statewise
        
        let confirmData={}
        resp.cases_time_series.forEach(element => {
            confirmData[element.date+"2020"] = element.totalconfirmed
        });
        
        dispatch(setConfirmChartData(confirmData))
        console.log("arr", arr, resp);
        let DataArray = [['State', 'Active cases']]

        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            if (element.state !== 'Total') {
                console.log(element.state);
                DataArray.push([element.state, parseInt(element.active)])

            } 
            if(index===0){
                dispatch(setTotalCases({ ...element }))
                
            }
            
            else {
                continue
            }

        }
        dispatch(fetchStateWiseSuccess(DataArray, arr))
        dispatch(loading(false))
        
    })
    .catch(err=>{
        if (err) {
            console.log(err);
            dispatch(fetchStateWiseFail())
            dispatch(loading(false))
        }
    })
}
}



const loading=(payload)=>{
    return{
        type: LOADING,
        payload
    }
}
const fetchStateWiseSuccess=(mapData,stateData)=>{
    return{
        type: FETCH_STATE_WISE_SUCCESS,
        mapData,
        stateData
    }
}
const fetchStateWiseFail = (payload) => {
    return {
        type: FETCH_STATE_WISE_FAIL,
        payload
    }
}
const setTotalCases = (payload) => {
    return {
        type: SET_TOTAL_CASES,
        payload
    }
}
const setChartData = (payload) => {
    return {
        type: SET_CHART_DATA,
        payload
    }
}
const setConfirmChartData = (payload) => {
    return {
        type: SET_CONFIRM_CHART_DATA,
        payload
    }
}
const fun = async () => {
    const result = await fetch("https://api.covid19india.org/data.json")
    const res = await result.json()
    return res
}

