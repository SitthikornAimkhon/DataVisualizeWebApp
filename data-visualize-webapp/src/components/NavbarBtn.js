import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';

export function NavbarBtn() {
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="#home">Data Visualize Web App</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<NavDropdown title="File" id="collasible-nav-dropdown">
							<NavDropdown.Item href="#action/import">Import</NavDropdown.Item>
							<NavDropdown.Item href="#action/export">Export</NavDropdown.Item>
							{/* <NavDropdown.Divider /> */}
						</NavDropdown>
					</Nav>
					{/* <Nav>
						<Nav.Link href="#deets">More deets</Nav.Link>
						<Nav.Link eventKey={2} href="#memes">Dank memes</Nav.Link>
					</Nav> */}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}