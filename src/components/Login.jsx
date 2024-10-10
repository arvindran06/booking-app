import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export default function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleLogIn = async (e) => {
        e.preventDefault();
        setLoading(true);

        const loginData = { email, password };

        try {
            const response = await axios.post("https://8364f4f0-6dd5-484b-962b-67490c79bbbe-00-1v29y9qi6paqo.pike.replit.dev:3000/login", loginData);
            const token = response.data.token;

            if (token) {
                localStorage.setItem('token', token);
                alert("Log In is successful");
                navigate("/hotels");
            } else {
                alert("Failed to store token.");
            }
        } catch (error) {
            console.error('There was an error', error);
            alert("Log in failed");
        } finally {
            setLoading(false);
        }
    };



    const gotoSignUp = () => {
        navigate("/signup");
    };

    const backgroundStyle = {
        backgroundImage: "url('https://i.pinimg.com/originals/dc/17/fc/dc17fce46bc42a823ef700c8a736e9e8.jpg')",
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
                    <Col xs={12} md={8} lg={6} xl={4}>
                        <h1 className="text-center mb-4">Gamer Holiday</h1>
                        <h2 className="text-center mb-4">Log In</h2>

                        {/* Form for email and password login */}
                        <Form onSubmit={handleLogIn}>
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

                            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                                {loading ? 'Logging in...' : 'Log In'}
                            </Button>
                        </Form>

                        <p className="mt-4 text-center">
                            Create an account{" "}
                            <Button variant="outline-primary" className="rounded-pill ml-2" onClick={gotoSignUp}>
                                Sign Up
                            </Button>
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}