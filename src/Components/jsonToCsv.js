import axios from "axios"
// import { unwind } from "json2csv/transforms";
// const {writeFileSync}=require('');
const JSONToCSV = require("json2csv").parse;
const { Parser, transforms: { unwind } } = require('json2csv');
export const csvfy=()=>{
    return axios.get("https://api.covid19india.org/v2/state_district_wise.json")


}