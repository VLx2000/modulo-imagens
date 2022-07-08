import { useEffect, useState } from "react";
import { Nav, Navbar, Container } from 'react-bootstrap';
import './styles.css';

function NavigationBar() {

    const [style, setStyle] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 60) {
                setStyle(true);
            } else {
                setStyle(false);
            }
        });
    });

    return (
        <Navbar collapseOnSelect bg="dark" variant='dark' expand="lg" sticky="top" className={style ? 'colorChange' : ''}>
            <Container >
                <Navbar.Brand href='/' title="inicio secomp beta">
                    <h1>Processamento de imagens</h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav.Link href="#lista">
                        <p className='link'>Lista Pacientes</p>
                    </Nav.Link>
                    <Nav.Link href="#outro">
                        <p className='link'>outro</p>
                    </Nav.Link>
                    <Nav.Link href="#outro">
                        <p className='link'>outro</p>
                    </Nav.Link>
                    <Nav.Link href="#outro">
                        <p className='link'>outro</p>
                    </Nav.Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;