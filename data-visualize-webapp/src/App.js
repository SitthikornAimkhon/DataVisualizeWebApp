import logo from './logo.svg';
import './App.css';

// You can specify which plugins you need here
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

// Import from components file
import { NavbarApp } from './components/NavbarApp';
import { Header } from './components/Header';
import { CardInformation } from './components/CardInformation';
import { CardWeather } from './components/CardWeather';
import { Barchart,Linechart,Piechart } from './components/plot';

function App() {
  const yearArray = ["No select", "1", "2", "3", "4"];
  const roadArray = ["No select", "1", "2", "3", "4"];
// for pie chart
  const labels = ['Death','Injured']
  const values= [50,12]
// for bar chart
  const locations = ['KMUTNB','ศรีรัช','วงศ์สว่าง']
  const count1= [50,12,11]
// for line chart
  const time = ['10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00']
  const count2 = [324,3443,434,23,43,234,34,123]

  return (
    <div>
      <NavbarApp YearArray={yearArray} RoadArray={roadArray}/>
      <Container>
        <Row>
          <Col>
            <Header year="2558" roadName="ศรีรัช" />
          </Col>
        </Row>
        <Row>
          <div class="App-container">
            <div class="item-1">
              <CardInformation variant="dark" CardTitle="Death" TotalNumber="21" TotalManNumber="13" TotalWomanNumber="12" />
            </div>
            <div class="item-2">
              <CardInformation variant="danger" CardTitle="Injured" TotalNumber="21" TotalManNumber="13" TotalWomanNumber="12" />
            </div>
            <div class="item-3">
              <CardWeather variant="info" CardTitle="Weather" TotalCaseNumber="10" TotalNormalNumber="5" TotalAbnormalNumber="5" />
            </div>
            <div class="item-4">
              <Linechart times={time} death_counts={count2}/>
            </div>
            <div class="item-5">
              <Barchart locations={locations} death_counts={count1}/>
            </div>
            <div class="item-6">
              <Piechart labels={labels} values={values}/>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default App;
