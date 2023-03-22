import "./App.css";

// You can specify which plugins you need here
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  fetchDeadStat,
  fetchInjureStat,
  fetchWeatherStat,
  findAccidentOnRoad,
  fetchRoadAvailable,
  fetchYearAvailable,
  findAccidentFreq
} from "../data-visualize-webapp/src/lib/api";
// Import from components file
import { NavbarApp } from "../data-visualize-webapp/src/components/NavbarApp";
import { Header } from "./components/Header";
import { CardInformation } from "../data-visualize-webapp/src/components/CardInformation";
import { CardWeather } from "../data-visualize-webapp/src/components/CardWeather";
import { Barchart, Linechart, Piechart } from "../data-visualize-webapp/src/components/plot";

function App() {

  // Declare a new state variable
  const [yearArray, setYearArray] = useState([]);
  const [roadArray, setRoadArray] = useState([]);

  const [yearVal, setYear] = useState('');
  const [roadNameVal, setRoadName] = useState('');
  // for dead, injure, weather stats
  const [deadStat, setDeadStat] = useState({total: 0, man: 0, female: 0});
  const [injureStat, setInjureStat] = useState({total: 0, man: 0, female: 0});
  const [weatherStat, setWeatherStat] = useState({total: 0, normal: 0, abmormal: 0});
  // for pie chart
  const labels = ["Death", "Injured"];
  // for bar chart
  const [barChartData, setbarChartData] = useState({ roadNames: [], counts: [] });
  // for line chart
  const [lineChartData, setLineChartData] = useState({times:[], counts:[]});
  

  // ========================
  // Fetch initial data
  // ========================
  useEffect(() => {
    // fetch year available
    const fetchYears = fetchYearAvailable();
    fetchYears.then((res) => {
      setYearArray(res);
    });
    // fetch road available
    const fetchRoads = fetchRoadAvailable();
    fetchRoads.then((res) => {
      setRoadArray(res);
    });
    
    // fetch dead stat
    const resDeadStat = fetchDeadStat();
    resDeadStat.then((res) => {
      setDeadStat(res);
    });

    // fetch injure stat
    const resInjureStat = fetchInjureStat();
    resInjureStat.then((res) => {
      setInjureStat(res);
    });

    // fetch weather stat
    const resWeatherStat = fetchWeatherStat();
    resWeatherStat.then((res) => {
      setWeatherStat(res);
    });
        
    // fetch accident available on each road
    const accidents = findAccidentOnRoad();
    accidents.then((res) => {
      setbarChartData(res);
    });

    // fetch accident freq.
    const resAccidentFreq = findAccidentFreq();
    resAccidentFreq.then((res)=>{
      setLineChartData(res);
    })
  }, []);

  // Toggle event when year or road changed
  useEffect(() => {
    const fetchData = fetchDeadStat(yearVal, roadNameVal);
    fetchData.then((res) => {
      setDeadStat(res);
    });

    // fetch injure stat
    const resInjureStat = fetchInjureStat(yearVal, roadNameVal);
    resInjureStat.then((res) => {
      setInjureStat(res);
    });

    // fetch weather stat
    const resWeatherStat = fetchWeatherStat(yearVal, roadNameVal);
    resWeatherStat.then((res) => {
      setWeatherStat(res);
    });

    // fetch accident available on each road
    const accidents = findAccidentOnRoad(yearVal);
    accidents.then((res) => {
      setbarChartData(res);
    });

    // fetch accident freq.
    const resAccidentFreq = findAccidentFreq(yearVal, roadNameVal);
    resAccidentFreq.then((res)=>{
      setLineChartData(res);
    })
  }, [yearVal, roadNameVal]);

  return (
    
    <div>
      <NavbarApp
        YearArray={yearArray}
        RoadArray={roadArray}
        setYear={setYear}
        setRoadName={setRoadName}
      />
      <Container>
        <Row>
          <Col>
            <Header className={'selected-info'} year={yearVal==='' ? 'ทั้งหมด': yearVal} roadName={roadNameVal==='' ? 'ทั้งหมด': roadNameVal} />
          </Col>
        </Row>
        <Row>
          <div class="App-container">
            <div class="item-1">
              <CardInformation
                variant="dark"
                CardTitle="Death"
                TotalNumber={deadStat.total}
                TotalManNumber={deadStat.man}
                TotalWomanNumber={deadStat.female}
              />
            </div>
            <div class="item-2">
              <CardInformation
                variant="danger"
                CardTitle="Injured"
                TotalNumber={injureStat.total}
                TotalManNumber={injureStat.man}
                TotalWomanNumber={injureStat.female}
              />
            </div>
            <div class="item-3">
              <CardWeather
                variant="info"
                CardTitle="Weather"
                TotalCaseNumber={weatherStat.total}
                TotalNormalNumber={weatherStat.normal}
                TotalAbnormalNumber={weatherStat.abnormal}
              />
            </div>
            <div class="item-4">
              <Linechart times={lineChartData.times} death_counts={lineChartData.counts} />
            </div>
            <div class="item-5">
              <Barchart y={barChartData.roadNames} x={barChartData.counts} />
            </div>
            <div class="item-5-mobile">
              <Barchart x={barChartData.roadNames} y={barChartData.counts} orientation='w' transforms={[{
                  type: 'sort',
                  target: 'y',
                  order: 'asscending'
                }]}
              />
            </div>
            <div class="item-6">
              <Piechart labels={labels} values={[deadStat.total, injureStat.total]} />
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default App;
