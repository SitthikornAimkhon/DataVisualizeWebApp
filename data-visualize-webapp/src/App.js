import logo from './logo.svg';
import './App.css';

// You can specify which plugins you need here
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';

// Import from components file
import { NavbarApp } from './components/NavbarApp';
import { Header } from './components/Header';
import { CardInformation } from './components/CardInformation';
import { CardWeather } from './components/CardWeather';
import { Barchart, Linechart, Piechart } from './components/plot';

function App() {

  // Card number
  // const [TotalNumberDeath , setTotalNumberDeath] = useState(55);
  // const [TotalManNumberDeath , setTotalManNumberDeath] = useState(55);
  // const [TotalWomanNumberDeath , setTotalWomanNumberDeath] = useState(55);
  const TotalNumberDeath = 21
  const TotalManNumberDeath = 21
  const TotalWomanNumberDeath = 12

  // const [TotalNumberInjured , setTotalNumberInjured] = useState(55);
  // const [TotalManNumberInjured , setTotalManNumberInjured] = useState(55);
  // const [TotalWomanNumberInjured , setTotalWomanNumberInjured] = useState(55);
  const TotalNumberInjured = 34
  const TotalManNumberInjured = 32
  const TotalWomanNumberInjured = 3
  // const [TotalCaseNumber , setTotalCaseNumber] = useState(55);
  // const [TotalNormalNumber , setTotalNormalNumber] = useState(55);
  // const [TotalAbnormalNumber , setTotalAbnormalNumber] = useState(55);
  const TotalCaseNumber = 34
  const TotalNormalNumber = 34
  const TotalAbnormalNumber = 34

  // Declare a new state variable 
  const yearArray = ["No select", "2564", "2563", "2562", "2561", "2560", "2559"];  //please write function to update this variable
  const roadArray = ["No select", "1", "2", "3", "4"]; //please write function to update this variable

  const [yearVal, setYear] = useState(yearArray[0]);
  const [roadNameVal, setRoadName] = useState(roadArray[0]);

  const year = yearVal;
  const roadname = roadNameVal;

  // Plot graph
  // for pie chart
  const labels = ['Death', 'Injured']
  const values = [50, 12]
  // for bar chart
  const locations = ['KMUTNB', 'ศรีรัช', 'วงศ์สว่าง']
  const count1 = [50, 12, 11]
  // for line chart
  const time = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
  const count2 = [324, 3443, 434, 23, 43, 234, 34, 123]

  // useEffect(() => {
  //   const data = fetch("http://localhost/<uri>").then(async (res) => {
  //     const json = await res.json();
  //     return json;
  //   });
  // }, [yearVal, roadNameVal]);

  return (
    <div>
      <NavbarApp YearArray={yearArray} RoadArray={roadArray} setYear={setYear} setRoadName={setRoadName} />
      <Container>
        <Row>
          <Col>
            <Header year={year} roadName={roadname}/>
          </Col>
        </Row>
        <Row>
          <div class="App-container">
            <div class="item-1">
              <CardInformation variant="dark" CardTitle="Death" TotalNumber={TotalNumberDeath} TotalManNumber={TotalManNumberDeath} TotalWomanNumber={TotalWomanNumberDeath} />
            </div>
            <div class="item-2">
              <CardInformation variant="danger" CardTitle="Injured" TotalNumber={TotalNumberInjured} TotalManNumber={TotalManNumberInjured} TotalWomanNumber={TotalWomanNumberInjured} />
            </div>
            <div class="item-3">
              <CardWeather variant="info" CardTitle="Weather" TotalCaseNumber={TotalCaseNumber} TotalNormalNumber={TotalNormalNumber} TotalAbnormalNumber={TotalAbnormalNumber} />
            </div>
            <div class="item-4">
              <Linechart times={time} death_counts={count2} />
            </div>
            <div class="item-5">
              <Barchart locations={locations} death_counts={count1} />
            </div>
            <div class="item-6">
              <Piechart labels={labels} values={values} />
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default App;
