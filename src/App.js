import React, { Component } from 'react'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";  
import Hello from './Hello'
import Dashboard from './Components/Dashboard';
import {BrowserRouter,Link,Route, Switch} from 'react-router-dom'
import Header from './Components/Header';
import Districtwise from './Components/Districtwise';
import Testdata from './Components/Testdata';
function App() {
  return (
    <div className="App">
      {/* <Hello></Hello> */}
      <BrowserRouter>
        <Header />

        <Switch>
          <Route exact path={"/dashboard"} component={Dashboard} />{" "}
          <Route exact path={"/districtwise"} component={Districtwise} />{" "}
          <Route exact path={"/testdata"} component={Testdata} />{" "}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
