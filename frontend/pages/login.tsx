/* /pages/login.js */

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { NextPage } from "next";
import { useApp } from "@/context/AppContext";
import { useMutation } from "@apollo/client";
import { LoginDocument } from "@/graphql/generated";

const Login: NextPage = (props) => {
  const { isAuthenticated, afterLogin } = useApp();

  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [login, { error, loading }] = useMutation(LoginDocument, {
    variables: { input: { identifier, password } },
    onCompleted: (data) => {
      const jwt = data.login.jwt;
      const user = data.login.user;
      if (!jwt || !user) return;
      afterLogin(jwt, user);

      router.push("/");
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/"); // redirect if you're already logged in
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 5, offset: 3 }}>
          <div className="paper">
            <div className="header">
              <img
                src="https://strapi.io/assets/strapi-logo-dark.svg"
                alt="Strapi logo"
              />
            </div>
            <section className="wrapper">
              {error && (
                <div style={{ marginBottom: 10 }}>
                  <small style={{ color: "red" }}>{error.message}</small>
                </div>
              )}
              <Form>
                <fieldset disabled={loading}>
                  <FormGroup>
                    <Label>Email:</Label>
                    <Input
                      disabled={loading}
                      onChange={(e) => setIdentifier(e.target.value)}
                      value={identifier}
                      name="identifier"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label>Password:</Label>
                    <Input
                      disabled={loading}
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      type="password"
                      name="password"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <span>
                      <a href="">
                        <small>Forgot Password?</small>
                      </a>
                    </span>
                    <Button
                      style={{ float: "right", width: 120 }}
                      color="primary"
                      onClick={() => {
                        login();
                      }}
                    >
                      {loading ? "Loading... " : "Submit"}
                    </Button>
                  </FormGroup>
                </fieldset>
              </Form>
            </section>
          </div>
        </Col>
      </Row>
      <style jsx>
        {`
          .paper {
            border: 1px solid lightgray;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            border-radius: 6px;
            margin-top: 90px;
          }
          .notification {
            color: #ab003c;
          }
          .header {
            width: 100%;
            height: 120px;
            background-color: #2196f3;
            margin-bottom: 30px;
            border-radius-top: 6px;
          }
          .wrapper {
            padding: 10px 30px 20px 30px !important;
          }
          a {
            color: blue !important;
          }
          img {
            margin: 15px 30px 10px 50px;
          }
        `}
      </style>
    </Container>
  );
};

export default Login;
