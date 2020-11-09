import {Navbar,Nav,NavDropdown} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';



export default function NavBar()
{


    return(



<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home">Goal Tracker</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#features">Dashboard</Nav.Link>
      <Nav.Link href="#pricing">Account</Nav.Link>
     
     
    </Nav>
  </Navbar.Collapse>
</Navbar>


    )
}