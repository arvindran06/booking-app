import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

export default function BookNowModal({ show, handleClose, hotelId, hotelName }) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleConfirmBooking = async () => {
        if (!startDate || !endDate) {
            alert('Please select both start and end dates.');
            return;
        }

        const token = localStorage.getItem('token');
        console.log('Token retrieved:', token);

        if (!token) {
            alert('No authentication token found. Please log in.');
            return;
        }

        try {
            const response = await axios.post(
                'https://8364f4f0-6dd5-484b-962b-67490c79bbbe-00-1v29y9qi6paqo.pike.replit.dev:3000/bookings',
                {
                    hotel_id: hotelId,
                    start_date: startDate,
                    end_date: endDate,
                },
                {
                    headers: {
                        'Authorization': token
                    }
                }
            );
            console.log('Booking Response:', response.data);
            alert(`Booking confirmed for ${hotelName} from ${startDate} to ${endDate}`);
            handleClose();
        } catch (error) {
            console.error('There was an error making the booking!', error.response ? error.response.data : error.message);
            alert('Booking failed. Please try again.');
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Book Now - {hotelName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="startDate">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="endDate" className="mt-3">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleConfirmBooking}>
                    Confirm Booking
                </Button>
            </Modal.Footer>
        </Modal>
    );
}