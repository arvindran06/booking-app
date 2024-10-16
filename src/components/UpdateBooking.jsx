import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";

export default function UpdateBookingModal({ show, handleClose, booking, updateBooking }) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('No authentication token found. Please log in.');
            return;
        }

        try {
            const response = await axios.put(
                `https://cc0b79f3-e36e-4b98-9eef-4d6093818c11-00-2uzpm3ihplepv.sisko.replit.dev/bookings/${booking.booking_id}`,
                {
                    hotel_id: booking.hotel_id,
                    start_date: startDate,
                    end_date: endDate,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            updateBooking(response.data.booking);
            handleClose();
            alert('Booking updated successfully.');
        } catch (error) {
            console.error('There was an error updating the booking!', error);
            alert('Failed to update booking.');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Booking</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formStartDate">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formEndDate">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}