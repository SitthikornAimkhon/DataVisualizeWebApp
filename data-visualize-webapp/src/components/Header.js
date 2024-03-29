import 'bootstrap/dist/css/bootstrap.min.css'
import { Col } from 'react-bootstrap'

export function Header(props) {
    function SetHeader() {
        if (props.year !== "No select" && props.roadName !== "No select") {
            return (<h3>ข้อมูลปี {props.year} และ ทางพิเศษ {props.roadName}</h3>);
        }
        else if (props.year !== "No select" && props.roadName === "No select") {
            return (<h3>ข้อมูลปี {props.year}</h3>);
        }
        else if (props.year === "No select" && props.roadName !== "No select") {
            return (<h3>ข้อมูลทางพิเศษ {props.roadName}</h3>);
        }
        else {
            return (<h3>ข้อมูล</h3>)
        }
    }

    return (
        <Col className={props.className?  props.className : ''}>
            <SetHeader />
        </Col>
    );
}