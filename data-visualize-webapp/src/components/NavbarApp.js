import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Nav, Navbar, Form } from 'react-bootstrap'
import { useState } from 'react';

export function NavbarApp(props) {
	const YearsList = props.YearArray.map((Year, index) =>
		<option key={Year.toString()} value={Year.toString()}>
			{Year}
		</option>
	);
	const RoadsList = props.RoadArray.map((Road, index) =>
		<option key={Road.toString()} value={Road.toString()}>
			{Road}
		</option>
	);

	const handleChangeYear = event => {
		props.setYear(event.target.value);
	};

	const handleChangeRoadName = event => {
		props.setRoadName(event.target.value);
	};

	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="#home">Accident On Expressway Visualize</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Form.Label style={{ color: "white", marginRight: "1rem", fontSize: "1.25rem" }}>Year:</Form.Label>
						<Form.Select onChange={handleChangeYear} size='sm' aria-label="Default select example" id='selectYear' style={{ marginRight: "10px" }}>
							{YearsList}
						</Form.Select>
						<Form.Label style={{ color: "white", marginRight: "1rem", fontSize: "1.25rem" }}>Location:</Form.Label>
						<Form.Select onChange={handleChangeRoadName} size='sm' aria-label="Default select example" id='selectPosition'>
							{RoadsList}
						</Form.Select>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}