import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Navbar, Nav, Button } from 'react-bootstrap';
import axios from 'axios';
import BookingModal from './BookingModal';

export default function Hotels() {
    const [hotels, setHotels] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [token] = useState('');

    useEffect(() => {
        axios.get('https://cc0b79f3-e36e-4b98-9eef-4d6093818c11-00-2uzpm3ihplepv.sisko.replit.dev/hotels')
            .then(response => {
                const fetchedHotels = response.data.hotels || [];
                setHotels(fetchedHotels);
            })
            .catch(error => {
                console.error("There was an error fetching the hotel data!", error);
            });
    }, []);

    const handleShowModal = (hotel) => {
        setSelectedHotel(hotel);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedHotel(null);
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Gamer Holidays</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/hotels">Hotels</Nav.Link>
                            <Nav.Link href="/Userbookings">User Bookings</Nav.Link>
                            <Nav.Link href="/profile">Profile</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-4">
                <Row>
                    {hotels.map((hotel) => (
                        <Col xs={12} md={6} lg={4} className="mb-4" key={hotel.hotel_id}>
                            <Card className="h-100">
                                <Card.Img
                                    variant="top"
                                    src={hotel.image_url}
                                    alt={hotel.name}
                                    className="img-fluid"
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{hotel.name}</Card.Title>
                                    <Card.Text>{hotel.location}</Card.Text>
                                    <Card.Text>{hotel.description}</Card.Text>
                                    <Button
                                        variant="primary"
                                        className="mt-auto"
                                        onClick={() => handleShowModal(hotel)}
                                    >
                                        Book Now
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {selectedHotel && (
                <BookingModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    hotelId={selectedHotel.hotel_id}
                    token={token}
                    hotelName={selectedHotel.name}
                />
            )}
        </>
    );
}
