import { Button, Card, CardBody, CardFooter, FormControl, FormErrorMessage, FormLabel, Grid, GridItem, Heading, IconButton, Input, InputGroup, InputRightElement, Text, VStack } from "@chakra-ui/react";
import { Field, Form, Formik } from 'formik';
import React from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    function validateEmail(value) {
        let error
        if (!value) {
          error = 'Email is required 😱'
        }
        return error
    }

    function validatePassword(value) {
        let error
        if (!value) {
            error = 'Password is required 😱'
        }
        return error
    }

    const submitForm = (formValues) => {
        let data = {email: formValues.email, password: formValues.password};
        console.log(formValues)
        axios.post(
            `${process.env.REACT_APP_DJANGO_SERVER_URL}/user/login/`,
            data
        ).then((response) => {
            console.log(response.data);
            window.localStorage.setItem("token", response.data.token);
            window.localStorage.setItem("username", response.data.username);
            window.localStorage.setItem("email", response.data.email);
            navigate("/");
        }).catch((response) => {
            console.error(response);
        });
    }

    const [showPassword, setShowPassword] = useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);

    const navigate = useNavigate();

    // function handleNavigate(path) 
    // {
    //     return () => navigate(path);
    // }

    return (
        <div className="login">
            <Grid
                templateAreas={`"header header"
                                "main main"`}
                gridTemplateRows={{base: `${process.env.REACT_APP_HEADER_HEIGHT} ${process.env.REACT_APP_MAIN_PAGE_HEIGHT}`}}
                gridTemplateColumns={{base:'1fr'}}
                gap='0'
                color='blackAlpha.700'
                background="linear-gradient(135deg, rgba(210,210,210,1) 0%, rgba(255,255,255,1) 50%, rgba(210,210,210,1) 100%);" // Nice gradient I made on cssgradient.io
                fontWeight='bold'
            >
                <GridItem area={"header"}>
                    <Header/>
                </GridItem>

                <GridItem area={"main"}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Formik
                        initialValues={{}} // ABSOLUTELY NECESSARY DO NOT REMOVE
                        onSubmit={(values, actions) => {
                            submitForm(values)
                            setTimeout(() => {
                            actions.setSubmitting(false)
                            }, 1000)
                        }}
                    >
                        {(props) => (
                            <Form>
                                <Card
                                    width={"60vh"}
                                    spacing="10rem"
                                    p="3rem"
                                >
                                    <CardBody>
                                        <Heading size="lg">Login</Heading>
                                            <VStack
                                                spacing="2rem"
                                                width="100%"
                                            >

                                                <Field name='email' validate={validateEmail}>
                                                    {({ field, form }) => (
                                                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                                                        <FormLabel fontSize="1.5rem">Email or Username</FormLabel>
                                                        <InputGroup>
                                                            <Input {...field} placeholder='Email or Username' />
                                                        </InputGroup>
                                                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                                    </FormControl>
                                                    )}
                                                </Field>

                                                <Field name='password' validate={validatePassword}>
                                                    {({ field, form }) => (
                                                    <FormControl isInvalid={form.errors.password && form.touched.password}>
                                                        <FormLabel fontSize="1.5rem">Password</FormLabel>
                                                        <InputGroup>
                                                            <Input {...field} type={showPassword ? 'text' : 'password'} placeholder='Password' />
                                                            <InputRightElement>
                                                                <IconButton
                                                                    bg="transparent"
                                                                    variant="ghost"
                                                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                                    icon={showPassword ? <FaEye /> : <FaEyeSlash />}
                                                                    onClick={handleShowClick}
                                                                />
                                                            </InputRightElement>
                                                        </InputGroup>
                                                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                                    </FormControl>
                                                    )}
                                                </Field>

                                            </VStack>
                                    </CardBody>
                                    <CardFooter as={VStack}>
                                        <Button
                                            colorScheme="green"
                                            w="full"
                                            isLoading={props.isSubmitting}
                                            type='submit'
                                        >
                                            Sign In
                                        </Button>
                                        <Text>
                                            Don't have an account? <a href="/register" style={{ color: 'blue' }}>Sign up</a>
                                        </Text>
                                    </CardFooter>
                                </Card>
                            </Form>
                        )}
                    </Formik>
                </GridItem>
            </Grid>
        </div>
    )
}

export default Login;