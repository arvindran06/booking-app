import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        const userData = {
            email: email,
            password: password,
            phone_number: phoneNumber,
        };

        try {
            const response = await axios.post("https://8364f4f0-6dd5-484b-962b-67490c79bbbe-00-1v29y9qi6paqo.pike.replit.dev:3000/signup", userData);
            console.log('Response:', response.data);
            alert("Sign up is successful");
            navigate("/");
        } catch (error) {
            console.error('There was an error!', error);
            alert("Sign up failed");
        } finally {
            setLoading(false);
        }
    };

    const gotoLogin = () => {
        navigate("/");
    }

    const backgroundStyle = {
        backgroundImage: 'url("https://i.pinimg.com/originals/dc/17/fc/dc17fce46bc42a823ef700c8a736e9e8.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
    };

    return (
        <div style={backgroundStyle}>
            <Container fluid className="d-flex justify-content-center align-items-center vh-100">
                <Row className="justify-content-center w-100">
                    <Col xs={12} md={6} lg={4}>
                        <h1 className="text-center mb-4">Gamer Holiday</h1>
                        <h1 className="text-center mb-4"> Book your Trip now ! </h1>
                        <h2 className="text-center mb-4">Sign Up</h2>
                        <Form onSubmit={handleSignUp}>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Control
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="Enter email"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Control
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="Password"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPhoneNumber">
                                <Form.Control
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    type="tel"
                                    placeholder="Enter valid phone number"
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                                {loading ? 'Signing Up...' : 'Sign Up'}
                            </Button>
                        </Form>

                        <p className="mt-4 text-center">
                            Already have an account? {""}
                            <Button variant="outline-primary" className="rounded-pill ml-2" onClick={gotoLogin}>
                                Log in
                            </Button>
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}