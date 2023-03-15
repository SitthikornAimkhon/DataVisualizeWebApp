import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Nav, Navbar, Form, Row, Col, Card } from 'react-bootstrap'

export function CardInformation(props) {
    return (
                <Card style={{ width: '13.5rem' }} bg={props.variant} key={props.variant} text={props.variant === 'light' ? 'dark' : 'white'}>
                    <Card.Body>
                        <Card.Title>{props.CardTitle}</Card.Title>
                        <Card.Subtitle className="mb-2 ">Total {props.CardTitle} : {props.TotalNumber}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 ">Man number : {props.TotalManNumber}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 ">Woman number : {props.TotalWomanNumber}</Card.Subtitle>
                        {/* <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link> */}
                    </Card.Body>
                </Card>
    );
}