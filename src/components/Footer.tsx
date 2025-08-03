import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import type { FooterData } from "../data/footer";

interface FooterProps {
  data: FooterData;
}

export const Footer = ({ data }: FooterProps) => {
  return (
    <Container>
    <footer className="bg-light py-4 mt-5 border-top">
        <Row>
          <Col md={6}>
            <h5>{data.companyName}</h5>
            <p className="text-muted">
              {data.companyDescription}
            </p>
          </Col>
          {data.sections.map((section) => (
            <Col key={section.id} md={3}>
              <h6>{section.title}</h6>
              {section.links && (
                <ul className="list-unstyled">
                  {section.links.map((link) => (
                    <li key={link.id}>
                      <Link to={link.url} className="text-decoration-none text-muted">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Col>
          ))}
          <Col md={3}>
            <h6>İletişim</h6>
            <p className="mb-1">{data.contactInfo.email}</p>
            <p className="mb-0">{data.contactInfo.phone}</p>
          </Col>
        </Row>
        <hr />
        <div className="text-center text-muted">
          © {new Date().getFullYear()} {data.companyName}. Tüm hakları saklıdır.
        </div>
    </footer>
    </Container>
  );
};