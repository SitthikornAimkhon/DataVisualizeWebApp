import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Nav, Navbar, Form, Row, Col } from 'react-bootstrap'


export function Header(props) {
    return (
        <Col>
            <h3>ข้อมูลปี {props.year} ทางพิเศษ {props.roadName}</h3>
        </Col>
    );
}