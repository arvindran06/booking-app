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
            const response = await axios.post("https://5748d460-5c1b-4e64-a69a-706f71c0a120-00-1u2yyyknxowwd.sisko.replit.dev/signup", userData);
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
                        <h1 className="text-center mb-4" style={{ color: "whitesmoke" }}>Gamer Holiday</h1>
                        <h1 className="text-center mb-4" style={{ color: "whitesmoke" }}> Book your Trip now ! </h1>
                        <h2 className="text-center mb-4" style={{ color: "whitesmoke" }}>Sign Up</h2>
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

                        <p className="mt-4 text-center" style={{ color: "whitesmoke" }}>
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