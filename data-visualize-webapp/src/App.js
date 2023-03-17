import logo from './logo.svg';
import './App.css';

// You can specify which plugins you need here
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

// Import from components file
import { NavbarApp } from './components/NavbarApp';
import { Header } from './components/Header';
import { CardInformation } from './components/CardInformation';
import { CardWeather } from './components/CardWeather';

function App() {
  const yearArray = ["No select", "1", "2", "3", "4"];
  const roadArray = ["No select", "1", "2", "3", "4"];

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
              {/*for plot graph 1*/}
            </div>
            <div class="item-5">
              {/* for plot graph 2 */}
            </div>
            <div class="item-6">
              {/* for plot graph 3 */}
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default App;
