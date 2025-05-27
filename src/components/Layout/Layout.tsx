import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookReader, faShoppingCart, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      q: { value: string };
    };
    const query = target.q.value;
    navigate(`/search?q=${query}`);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <FontAwesomeIcon icon={faBookReader} /> Manga Store
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Trang chủ</Nav.Link>
              <Nav.Link as={Link} to="/categories">Thể loại</Nav.Link>
              <Nav.Link as={Link} to="/new-releases">Mới nhất</Nav.Link>
              <Nav.Link as={Link} to="/top-rated">Đánh giá cao</Nav.Link>
            </Nav>
            <Form className="d-flex me-3" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Tìm truyện..."
                name="q"
                className="me-2"
              />
              <Button variant="outline-light" type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Form>
            <Nav>
              <Nav.Link as={Link} to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} /> Giỏ hàng
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                <FontAwesomeIcon icon={faUser} /> Đăng nhập
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <main className="flex-grow-1 py-4">
        <Container>
          {children}
        </Container>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-light py-4 mt-auto">
        <Container>
          <div className="row">
            <div className="col-md-4">
              <h5>Về chúng tôi</h5>
              <p>Manga Store - Nơi cung cấp truyện tranh chất lượng với giá cả hợp lý.</p>
            </div>
            <div className="col-md-4">
              <h5>Liên kết nhanh</h5>
              <ul className="list-unstyled">
                <li><Link to="/terms" className="text-light">Điều khoản sử dụng</Link></li>
                <li><Link to="/privacy" className="text-light">Chính sách bảo mật</Link></li>
                <li><Link to="/return-policy" className="text-light">Chính sách đổi trả</Link></li>
                <li><Link to="/faq" className="text-light">FAQ</Link></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Liên hệ</h5>
              <ul className="list-unstyled">
                <li><i className="fas fa-phone"></i> Hotline: 1900-xxxx</li>
                <li><i className="fas fa-envelope"></i> Email: contact@mangastore.com</li>
                <li><i className="fas fa-map-marker-alt"></i> Địa chỉ: 123 Đường ABC, Quận XYZ</li>
              </ul>
            </div>
          </div>
          <hr className="mt-4" />
          <div className="text-center">
            <p>&copy; 2024 Manga Store. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Layout; 