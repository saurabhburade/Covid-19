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
  SET_TEST_DATA,
  SET_STATE_MAP_DATA,
  SET_STATE_DISTRICT_DATA,
} from "./ActionTypes";
import { MH_TOPO, MP_TOPO, UP_TOPO, TN_TOPO, RJ_TOPO, DL_TOPO, GJ_TOPO, AP_TOPO, JK_TOPO, WB_TOPO, CH_TOPO, KA_TOPO, KL_TOPO, BR_TOPO, PB_TOPO, HR_TOPO, OR_TOPO, JH_TOPO, UT_TOPO, HP_TOPO, AS_TOPO, CT_TOPO, AN_TOPO, LA_TOPO, ML_TOPO, PY_TOPO, GA_TOPO, MN_TOPO, TR_TOPO, MZ_TOPO, AR_TOPO, NL_TOPO, DN_TOPO, DD_TOPO, LD_TOPO, SK_TOPO, TG_TOPO } from "../TopoJSON/StateWiseTopoJson";

export const fetchStateWise = () => {
  return (dispatch) => {
    fun()
      .then((resp) => {
        const arr = resp.statewise;

        let confirmData = {},
          deadData = {},
          recoverData = {};
        resp.cases_time_series.forEach((element) => {
          confirmData[element.date + "2020"] = element.totalconfirmed;
        });
        resp.cases_time_series.forEach((element) => {
          deadData[element.date + "2020"] = element.totaldeceased;
        });
        resp.cases_time_series.forEach((element) => {
          recoverData[element.date + "2020"] = element.totalrecovered;
        });

        dispatch(setConfirmChartData(confirmData));
        dispatch(setDeadChartData(deadData));
        dispatch(setRecoveredChartData(recoverData));
        // console.log("arr", arr, resp);
        let DataArray = [["State", "Active cases"]];

        for (let index = 0; index < arr.length; index++) {
          const element = arr[index];
          if (element.state !== "Total") {
            // console.log(element.state);
            DataArray.push([element.state, parseInt(element.active)]);
          }
          if (index === 0) {
            dispatch(setTotalCases({ ...element }));
          } else {
            continue;
          }
        }
        dispatch(fetchStateWiseSuccess(DataArray, arr));
        setTimeout(() => {
          dispatch(loading(false));
        }, 2000);
      })
      .catch((err) => {
        if (err) {
          // console.log(err);
          dispatch(fetchStateWiseFail());
          // dispatch(loading(false))
          setTimeout(() => {
            dispatch(loading(false));
          }, 2000);
        }
      });

    newsFun()
      .then((data) => {
        let Arr = [];
        data.forEach((element) => {
          // console.log(
          //   new Date().getHours() -
          //     new Date(element.timestamp * 1000).getHours() <
          //     6
          // );
          if (
            new Date(element.timestamp * 1000).toDateString() ==
              new Date().toDateString() &&
            new Date().getHours() -
              new Date(element.timestamp * 1000).getHours() <
              6
          ) {
            Arr.push({
              update: element.update,
              timeHour:
                new Date().getHours() -
                new Date(element.timestamp * 1000).getHours(),
            });
          } else {
            // console.log("object");
          }
        });
        dispatch(setTodayNews(Arr));
        // console.log("data :", Arr, data);
      })
      .catch((err) => console.log(err));
    states_tested_data().then((res) => {
      // console.log(res.states_tested_data);
      let arr = [];
      if (res.states_tested_data.length !== 0) {
        for (let index = 0; index < res.states_tested_data.length; index++) {
          const element = res.states_tested_data[index];
          if (
            new Date().getDate() -
              1 +
              "/" +
              "0" +
              (new Date().getMonth() + 1) +
              "/" +
              new Date().getFullYear() ==
            element.updatedon
          ) {
            arr.push(element);
          }
        }
        dispatch(setStateTestData(arr));
      }
    }).catch(err=>console.log(err))
    states_district().then((res) => {
      // console.log("statedistricts", res);
      dispatch(setStateDistrictData(res));
    }).catch(err=>{
      console.log(err);
    })
  };
};
const setStateTestData = (payload) => {
  return {
    type: SET_TEST_DATA,
    payload,
  };
};
const setTodayNews = (payload) => {
  return {
    type: SET_TODAY_NEWS,
    payload,
  };
};

const loading = (payload) => {
  return {
    type: LOADING,
    payload,
  };
};
const fetchStateWiseSuccess = (mapData, stateData) => {
  return {
    type: FETCH_STATE_WISE_SUCCESS,
    mapData,
    stateData,
  };
};
const fetchStateWiseFail = (payload) => {
  return {
    type: FETCH_STATE_WISE_FAIL,
    payload,
  };
};
const setTotalCases = (payload) => {
  return {
    type: SET_TOTAL_CASES,
    payload,
  };
};
const setChartData = (payload) => {
  return {
    type: SET_CHART_DATA,
    payload,
  };
};
const setConfirmChartData = (payload) => {
  return {
    type: SET_CONFIRM_CHART_DATA,
    payload,
  };
};
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
  const result = await fetch("https://api.covid19india.org/data.json");
  const res = await result.json();
  return res;
};
const newsFun = async () => {
  const result = await fetch("https://api.covid19india.org/updatelog/log.json");
  const res = await result.json();
  return res;
};
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
const states_district = async () => {
  const result = await fetch(
    "https://api.covid19india.org/v2/state_district_wise.json"
  );
  const res = await result.json();
  return res;
};
const states_tested_data = async () => {
  const result = await fetch(
    "https://api.covid19india.org/state_test_data.json"
  );
  const res = await result.json();
  return res;
};
export const fetchDistrictWise = (stateName) => {
  return (dispatch, getState) => {
    dispatch(loading(true));
    districtwise().then((result) => {
      if (result[stateName]) {
        dispatch(setDistrictWiseData(result[stateName].districtData));
        // console.log(getState()["stateData"]);
        getState()["stateData"].forEach((element) => {
          if (element.state === stateName) {
            // console.log(element);
            dispatch(setStateTotalData(element));
            dispatch(setStateCode(element.statecode.toLowerCase()));
            // dispatch(loading(false));
            setTimeout(() => {
              dispatch(loading(false));
            }, 2000);
          }
        });
      }
      dispatch(loading(true));

      states_daily().then((data) => {
        let dataConf = {},
          dataDead = {};
        // console.log(data.states_daily);
        if (data.states_daily.length !== 0) {
          for (let index = 0; index < data.states_daily.length; index++) {
            const element = data.states_daily[index];

            if (element.status === "Confirmed") {
              // console.log(
              //   getState()["selectedStateCode"],
              //   element[getState()["selectedStateCode"]]
              // );
              dataConf[element.date] = element[getState()["selectedStateCode"]];
              //   arrConf.push({
              //     confirmed: element[getState()["selectedStateCode"]],
              //     date: element.date
              //   });
            }
            if (element.status === "Deceased") {
              dataDead[element.date] = element[getState()["selectedStateCode"]];
              // arrDead.push({
              //   dead: element[getState()["selectedStateCode"]],
              //   date: element.date,
              // });
            }
          }
          dispatch(setStateDailyConfirmed(dataConf));
          dispatch(setStateDailyDead(dataDead));

          switch (getState()["selectedStateCode"].toUpperCase()) {
            case "MH":
              dispatch(
                setStateMapData({
                  topo: MH_TOPO,
                  center: [76.96504187, 19.01000633],
                  scaleZoom: 1,
                })
              );
              break;
            case "MP":
              dispatch(
                setStateMapData({
                  topo: MP_TOPO,
                  // center: [78.0629, 23.5937],
                  center: [78.40204187, 23.50000633],
                  scaleZoom: 1,
                })
              );
              break;
            case "GJ":
              dispatch(
                setStateMapData({
                  topo: GJ_TOPO,
                  center: [71.96504187, 22.00000633],
                  scaleZoom: 1.05,
                })
              );
              break;
            case "DL":
              dispatch(
                setStateMapData({
                  topo: DL_TOPO,
                  // center: [77.23000403, 28.6699929],
                  center: [77.10504187, 28.695000633],
                  scaleZoom: 10,
                })
              );
              break;
            case "RJ":
              dispatch(
                setStateMapData({
                  topo: RJ_TOPO,
                  // center: [74.63998124, 26.44999921],
                  center: [74.63998124, 26.40000633],
                  scaleZoom: 1,
                })
              );
              break;
            case "TN":
              dispatch(
                setStateMapData({
                  topo: TN_TOPO,
                  // center: [79.15004187, 12.92038576],
                  center: [79.15004187, 10.92038576],
                  scaleZoom: 1.5,
                })
              );
              break;
            case "UP":
              dispatch(
                setStateMapData({
                  topo: UP_TOPO,
                  // center: [78.05000565, 27.59998069],
                  center: [81.05000565, 27.09998069],
                  scaleZoom: 1.1,
                })
              );
              break;
            case "AP":
              dispatch(
                setStateMapData({
                  topo: AP_TOPO,
                  // center: [78.57002559, 14.7504291],
                  center: [80.73598262, 15.76702557],
                  scaleZoom: 1,
                })
              );
              break;
            case "TG":
              dispatch(
                setStateMapData({
                  topo: TG_TOPO,
                  center: [79.73598262, 17.76702557],
                  scaleZoom: 1.7,
                })
              );
              break;
            case "WB":
              dispatch(
                setStateMapData({
                  topo: WB_TOPO,
                  // center: [88.32994665, 22.58039044],
                  center: [88.32994665, 24.48039044],
                  scaleZoom: 1.19,
                })
              );
              break;
            case "JK":
              dispatch(
                setStateMapData({
                  topo: JK_TOPO,
                  scaleZoom: 1.9,

                  center: [75.46665849, 33.59995933],
                })
              );
              break;
            case "KA":
              dispatch(
                setStateMapData({
                  topo: KA_TOPO,

                  center: [76.91999711, 14.77038129],
                  scaleZoom: 1.1,
                  
                })
              );
              break;
            case "KL":
              dispatch(
                setStateMapData({
                  topo: KL_TOPO,
                  center: [76.91999711, 10.77038129],
                  scaleZoom: 1.5,
                })
              );
              break;
            case "BR":
              dispatch(
                setStateMapData({
                  topo: BR_TOPO,
                  center: [86.0629, 25.35937],
                  scaleZoom: 1.7,
                })
              );
              break;
            case "PB":
              dispatch(
                setStateMapData({
                  topo: PB_TOPO,
                  center: [76.0629, 30.71997398],
                  scaleZoom: 1.9,
                })
              );
              break;
            case "HR":
              dispatch(
                setStateMapData({
                  topo: HR_TOPO,
                  center: [77.01999101, 28.99000633],
                  scaleZoom: 1.9,
                })
              );
              break;
            case "OR":
              dispatch(
                setStateMapData({
                  topo: OR_TOPO,
                  center: [84.10001746, 19.82042971],
                  scaleZoom: 1.3,
                })
              );
              break;

            case "JH":
              dispatch(
                setStateMapData({
                  topo: JH_TOPO,
                  center: [85.51998572, 23.80039349],
                  scaleZoom: 1.7,
                })
              );
              break;
            case "CH":
              dispatch(
                setStateMapData({
                  topo: CH_TOPO,
                  center: [76.78000565, 30.71999697],
                  scaleZoom: 15,
                })
              );
              break;
            case "UT":
              dispatch(
                setStateMapData({
                  topo: UT_TOPO,
                  center: [79.78000565, 29.71999697],
                  scaleZoom: 1.7,
                })
              );
              break;
            case "HP":
              dispatch(
                setStateMapData({
                  topo: HP_TOPO,
                  center: [76.98000565, 31.10002545],
                  scaleZoom: 1.5,
                })
              );
              break;
            case "AS":
              dispatch(
                setStateMapData({
                  topo: AS_TOPO,
                  center: [93.21666744, 25.7499809],
                  scaleZoom: 1.5,
                })
              );
              break;
            case "CT":
              dispatch(
                setStateMapData({
                  topo: CT_TOPO,
                  center: [82.78000565, 20.71999697],
                  scaleZoom: 1.1,
                })
              );
              break;
            case "AN":
              dispatch(
                setStateMapData({
                  topo: AN_TOPO,
                  center: [92.73598262, 9.66702557],
                  scaleZoom: 1.1,
                })
              );
              break;
            case "LA":
              dispatch(
                setStateMapData({
                  topo: LA_TOPO,
                  center: [76.577049, 34.152588],
                  scaleZoom: 1,
                })
              );
              break;
            case "ML":
              dispatch(
                setStateMapData({
                  topo: ML_TOPO,
                  center: [91.8800142, 25.57049217],
                  scaleZoom: 2.4,
                })
              );
              break;
            case "PY":
              dispatch(
                setStateMapData({
                  topo: PY_TOPO,
                  center: [79.80000037, 11.93499371],
                  scaleZoom: 21,
                })
              );
              break;
            case "GA":
              dispatch(
                setStateMapData({
                  topo: GA_TOPO,
                  center: [74.11800065, 15.291997],
                  scaleZoom: 8,
                })
              );
              break;
            case "MN":
              dispatch(
                setStateMapData({
                  topo: MN_TOPO,
                  center: [93.95001705, 24.79997072],
                  scaleZoom: 2.4,
                })
              );
              break;
            case "TR":
              dispatch(
                setStateMapData({
                  topo: TR_TOPO,
                  center: [91.57999914, 23.83540428],
                  scaleZoom: 3,
                })
              );
              break;
            case "MZ":
              dispatch(
                setStateMapData({
                  topo: MZ_TOPO,
                  center: [92.72001461, 23.01039899],
                  scaleZoom: 2.4,
                })
              );
              break;
            case "AR":
              dispatch(
                setStateMapData({
                  topo: AR_TOPO,
                  center: [94.61660071, 27.50039878],
                  scaleZoom: 1.8,
                })
              );
              break;
            case "NL":
              dispatch(
                setStateMapData({
                  topo: NL_TOPO,
                  center: [94.11657019, 25.6669979],
                  scaleZoom: 1,
                })
              );
              break;
            case "DN":
              dispatch(
                setStateMapData({
                  topo: DN_TOPO,
                  center: [78.0629, 23.5937],
                  scaleZoom: 1,
                })
              );
              break;
            case "DD":
              dispatch(
                setStateMapData({
                  topo: DD_TOPO,
                  center: [78.0629, 23.5937],
                  scaleZoom: 1,
                })
              );
              break;
            case "LD":
              dispatch(
                setStateMapData({
                  topo: LD_TOPO,
                  center: [78.0629, 23.5937],
                  scaleZoom: 1,
                })
              );
              break;
            case "SK":
              dispatch(
                setStateMapData({
                  topo: SK_TOPO,
                  center: [88.6166475, 27.3333303],
                  scaleZoom: 1,
                })
              );
              break;
            default:
              break;
          }

          // dispatch(loading(false));
          setTimeout(() => {
            dispatch(loading(false));
          }, 2000);
        }
      });
      // console.log(result[stateName]);
    });
  };
};
const setDistrictWiseData = (payload) => {
  return {
    type: SET_DISTRICT_WISE,
    payload,
  };
};
const setStateDistrictData = (payload) => {
  return {
    type: SET_STATE_DISTRICT_DATA,
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
const setStateDailyConfirmed = (payload) => {
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
const setStateMapData = (payload) => {
  return {
    type: SET_STATE_MAP_DATA,
    payload,
  };
};
