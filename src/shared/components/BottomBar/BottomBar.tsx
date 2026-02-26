import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/images/ssulogo.jpg';

const BottomBar = () => {
  return (
    <Navbar
      bg="secondary"
      variant="dark"
      fixed="bottom"
      className="py-1 bottom-bar-hide-mobile"
    >
      <Container
        fluid
        className="d-flex justify-content-between align-items-center px-3"
      >
        <Navbar.Brand href="/" className="d-flex align-items-center m-0">
          <img
            src={logo}
            alt="로고 이미지"
            style={{ width: '90px' }}
            className="img-fluid me-2"
          />
          <span className="small">SSURENT</span>
        </Navbar.Brand>

        <div className="text-white small">Crom.standard2005@gmail.com</div>
        <div className="text-white small">개발 : CROM</div>
      </Container>
    </Navbar>
  );
};

export default BottomBar;
