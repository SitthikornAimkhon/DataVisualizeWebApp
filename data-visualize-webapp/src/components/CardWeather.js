import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap'

export function CardWeather(props) {
    return (
        <Card
            style={{ width: '13.5rem' }}
            bg={props.variant}
            key={props.variant}
            text={props.variant === 'light' ? 'dark' : 'white'}>
            <Card.Body>
                <Card.Title>{props.CardTitle}</Card.Title>
                <Card.Subtitle className="mb-2 ">Total Case : {props.TotalCaseNumber}</Card.Subtitle>
                <Card.Subtitle className="mb-2 ">Norman : {props.TotalNormalNumber}</Card.Subtitle>
                <Card.Subtitle className="mb-2 ">Abnormal : {props.TotalAbnormalNumber}</Card.Subtitle>
            </Card.Body>
        </Card>
    );
}