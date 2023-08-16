import React from "react"
import { useState } from "react"
import { Form, Button } from "react-bootstrap"

export const SignInView = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birth, SetDateOfBirth] = useState("");


    registerSubmitHandler = (event) => {
        event.preventDefault();

        const reqBody = {
            userName: userName,
            password: password,
            email: email,
            birth: birth
        }

        fetch("https://jacksons-movie-api.herokuapp.com/register", {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.status == 200) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Unable to register. Please check your credentials.");
            }
        }).catch(e => {
            console.log("error: ", e)
        });
    };


    return (
        <>
            <div className="signIn">
                <Form className="p-5" onSubmit={registerSubmitHandler}>
                    <h3>Sign In</h3>
                    <Form.Group controlId="signupUsername">
                        <Form.Label className="text-lg mt-3">
                            Username: </Form.Label>
                        <Form.Control className={"bg-light"}
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                            minLength="5"
                            size="lg"
                        />

                    </Form.Group>
                    <Form.Group controlId="signupPassword">
                        <Form.Label className="text-lg mt-3">Password:</Form.Label>
                        <Form.Control className={"bg-light"}
                            type="password"
                            size="lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="6"
                        />

                    </Form.Group>
                    <Form.Group controlId="signupEmail">
                        <Form.Label className="text-lg mt-3">Email:</Form.Label>
                        <Form.Control className={"bg-light"}
                            type="email"
                            size="lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="birth">
                        <Form.Label className="text-lg mt-3"> DateOfBirth:</Form.Label>
                        <Form.Control className={"bg-light"}
                            type="date"
                            size="lg"
                            value={birth}
                            onChange={(e) => SetDateOfBirth(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button className="mt-2" type="submit">Submit</Button>
                </Form >
            </div >
        </>
    )

}