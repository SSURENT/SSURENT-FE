import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/images/ssulogo.jpg';

const BottomBar =() =>{
    return(
        <Navbar bg = "secondary" variant="dark" className="py-3 bottom-bar-hide-mobile">
            <Container fluid className="d-flex justify-content-between align-items-center"
                       style={{ padding: '0 1rem', maxWidth: '100%', boxSizing: 'border-box' }}>
                <Navbar.Brand href="/" className="d-flex align-item-center">
                    <img src={logo} height="30" alt = "SSUlogo" className="me-2 me-md-3" />
                    <span>SSURENT</span>
                </Navbar.Brand>
                <div className="text-white">
                    Crom.standard2005@gmail.com
                </div>
                <div className="text-white">
                    개발 : CROM
                </div>
            </Container>
        </Navbar>
    );
};

export default BottomBar;