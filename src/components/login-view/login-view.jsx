import React from "react"
import { useState } from "react"
import { Form, Button } from "react-bootstrap"

export const LoginView = ({ onLoggedIn }) => {
    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");

    const loginSubmitHandler = (event) => {
        event.preventDefault();
        const reqBody = {
            userName: userName,
            password: password
        };

        fetch("https://jacksons-movie-api.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody)
        }).then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);

                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token)
                    onLoggedIn(data.user, data.token);
                    window.location.reload();
                } else {
                    alert("User not found");
                }

            })
            .catch((e) => {
                alert("Something went wrong");
            })
    }

    return (
        <>
            <div className="logIn">
                <Form className="m-5" onSubmit={loginSubmitHandler}>
                    <h3>Login</h3>
                    <Form.Group controlId="loginUsername">
                        <Form.Label className="text-lg mt-3">Username:</Form.Label>
                        <Form.Control className={"bg-light"}
                            type="text"
                            size="lg"
                            value={userName}
                            onChange={(e) => setuserName(e.target.value)}
                            required
                            minLength="5" />
                    </Form.Group>

                    <Form.Group controlId="loginPassword">
                        <Form.Label className="text-lg mt-3">Password:</Form.Label>
                        <Form.Control className={"bg-light"}
                            type="password"
                            size="lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="6" />
                    </Form.Group>
                    <Button className="mt-2" type="submit">Submit</Button>
                </Form>

            </div >
        </>)

}



