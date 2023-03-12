import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Nav, Navbar, Form } from 'react-bootstrap'



export function NavbarApp() {
	const arry = ["No select", "1", "2", "3", "4"];
	const listItems = arry.map((arry,index) =>
		<option key={arry.toString()} value={index}>
			{arry}
		</option>
	);
	
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="#home">Data Visualize Web App</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Form.Label style={{ color: "white", marginRight: "1rem", fontSize: "1.25rem" }}>Year:</Form.Label>
						<Form.Select size='sm' aria-label="Default select example" id='selectYear' style={{ marginRight: "10px" }}>
							{listItems}
							{/* <option>No select</option>
							<option value="1">หนึ่ง</option>
							<option value="2">Two</option>
							<option value="3">Three</option> */}
						</Form.Select>
						<Form.Label style={{ color: "white", marginRight: "1rem", fontSize: "1.25rem" }}>Location:</Form.Label>
						<Form.Select size='sm' aria-label="Default select example" id='selectPosition'>
							{listItems}
							{/* <option>No select</option>
							<option value="1">One</option>
							<option value="2">Two</option>
							<option value="3">Three</option> */}
						</Form.Select>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}