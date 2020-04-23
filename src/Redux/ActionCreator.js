import {
  LOADING,
  FETCH_STATE_WISE_SUCCESS,
  FETCH_STATE_WISE_FAIL,
  SET_TOTAL_CASES,
  SET_CHART_DATA,
  SET_CONFIRM_CHART_DATA,
  SET_TODAY_NEWS,
  SET_DISTRICT_WISE,
  SET_STATE_TOTAL,
  SET_STATE_CODE,
  SET_STATE_DAILY_CONFIRMED,
  SET_STATE_DAILY_DEAD,
  SET_DEAD_CHART_DATA,
  SET_RECOVERED_CHART_DATA,
} from "./ActionTypes";

export const fetchStateWise = () => {
    return (dispatch) => {
        fun().then(resp => {
            const arr = resp.statewise

            let confirmData = {},
              deadData = {},
              recoverData = {};
            resp.cases_time_series.forEach(element => {
                confirmData[element.date + "2020"] = element.totalconfirmed
            });
             resp.cases_time_series.forEach((element) => {
               deadData[element.date + "2020"] = element.totaldeceased;
             });
               resp.cases_time_series.forEach((element) => {
                 recoverData[element.date + "2020"] = element.totalrecovered;
               });

            dispatch(setConfirmChartData(confirmData))
            dispatch(setDeadChartData(deadData));
            dispatch(setRecoveredChartData(recoverData));
            console.log("arr", arr, resp);
            let DataArray = [['State', 'Active cases']]

            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                if (element.state !== 'Total') {
                    console.log(element.state);
                    DataArray.push([element.state, parseInt(element.active)])

                }
                if (index === 0) {
                    dispatch(setTotalCases({ ...element }))

                }

                else {
                    continue
                }

            }
            dispatch(fetchStateWiseSuccess(DataArray, arr))
            dispatch(loading(false))

        })
            .catch(err => {
                if (err) {
                    console.log(err);
                    dispatch(fetchStateWiseFail())
                    dispatch(loading(false))
                }
            })


        newsFun().then(data => {
            let Arr = []
            data.forEach(element => {
                console.log(new Date().getHours() - new Date(element.timestamp  * 1000).getHours()<6);
                if ((new Date(element.timestamp * 1000).toDateString() == new Date().toDateString()) && new Date().getHours() - new Date(element.timestamp  * 1000).getHours()<6) {
                    Arr.push({ update: element.update, timeHour: new Date().getHours() - new Date(element.timestamp * 1000).getHours()})
                }
                else {
                    console.log("object");

                }
            })
            dispatch(setTodayNews(Arr))
            console.log('data :', Arr,data);

        })
    }
}

const setTodayNews = (payload) => {
    return {
        type: SET_TODAY_NEWS,
        payload
    }
}

const loading = (payload) => {
    return {
        type: LOADING,
        payload
    }
}
const fetchStateWiseSuccess = (mapData, stateData) => {
    return {
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
const setDeadChartData = (payload) => {
  return {
    type: SET_DEAD_CHART_DATA,
    payload,
  };
};
const setRecoveredChartData = (payload) => {
  return {
    type: SET_RECOVERED_CHART_DATA,
    payload,
  };
};

const fun = async () => {
    const result = await fetch("https://api.covid19india.org/data.json")
    const res = await result.json()
    return res
}
const newsFun = async () => {
    const result = await fetch("https://api.covid19india.org/updatelog/log.json")
    const res = await result.json()
    return res
}
const districtwise = async () => {
  const result = await fetch(
    "https://api.covid19india.org/state_district_wise.json"
  );
  const res = await result.json();
  return res;
};
const states_daily = async () => {
  const result = await fetch("https://api.covid19india.org/states_daily.json");
  const res = await result.json();
  return res;
};
export const fetchDistrictWise=(stateName)=>{
return (dispatch,getState)=>{
     districtwise().then(result=>{
         
        if (result[stateName].districtData) {
         dispatch(setDistrictWiseData(result[stateName].districtData));
         console.log(getState()["stateData"]);
         getState()["stateData"].forEach(element => {
             if (element.state === stateName) {
                 console.log(element);
                 dispatch(setStateTotalData(element));
                 dispatch(setStateCode(element.statecode.toLowerCase()));
             }
         });
         
        }
        states_daily().then(data=>{
            let dataConf={},dataDead={}
            console.log(data.states_daily);
            if (data.states_daily.length!==0) {
                for (let index = 0; index < data.states_daily.length; index++) {
                  const element = data.states_daily[index];
                  
                  if (element.status === "Confirmed") {
                      console.log(
                        getState()["selectedStateCode"],
                        element[getState()["selectedStateCode"]]
                      );
                      dataConf[element.date] =
                        element[getState()["selectedStateCode"]];
                    //   arrConf.push({
                    //     confirmed: element[getState()["selectedStateCode"]],
                    //     date: element.date
                    //   });
                  }
                      if (element.status === "Deceased") {
                           dataDead[element.date] =
                             element[getState()["selectedStateCode"]];
                        // arrDead.push({
                        //   dead: element[getState()["selectedStateCode"]],
                        //   date: element.date,
                        // });
                      }
                }
                dispatch(setStateDailyConfirmed(dataConf));
                dispatch(setStateDailyDead(dataDead));
            }
        })
         console.log(result[stateName].districtData);
     })
} 
}
const setDistrictWiseData = (payload) => {
  return {
    type: SET_DISTRICT_WISE,
    payload,
  };
};
const setStateTotalData = (payload) => {
  return {
    type: SET_STATE_TOTAL,
    payload,
  };
};
const setStateCode = (payload) => {
  return {
    type: SET_STATE_CODE,
    payload,
  };
};
const setStateDailyConfirmed= (payload) => {
  return {
    type: SET_STATE_DAILY_CONFIRMED,
    payload,
  };
};
const setStateDailyDead = (payload) => {
  return {
    type: SET_STATE_DAILY_DEAD,
    payload,
  };
};
