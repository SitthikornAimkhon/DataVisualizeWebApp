import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap'

export function CardInformation(props) {
    return (
                <Card 
                    style={{ width: '13.5rem' }} 
                    bg={props.variant} 
                    key={props.variant} 
                    text={props.variant === 'light' ? 'dark' : 'white'}>
                    <Card.Body>
                        <Card.Title>{props.CardTitle}</Card.Title>
                        <Card.Subtitle className="mb-2 ">Total {props.CardTitle} : {props.TotalNumber}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 ">Man number : {props.TotalManNumber}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 ">Woman number : {props.TotalWomanNumber}</Card.Subtitle>
                    </Card.Body>
                </Card>
    );
}