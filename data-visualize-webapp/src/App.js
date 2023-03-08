import logo from './logo.svg';
import './App.css';

// You can specify which plugins you need here
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

// Import from components file
import { NavbarBtn } from './components/NavbarBtn';

function App() {
  return (
    <div>
      <NavbarBtn />
      <Container>
        <Row>
          <Col>
            <h1>1</h1>
          </Col>
          <Col>
            <h1>2</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
