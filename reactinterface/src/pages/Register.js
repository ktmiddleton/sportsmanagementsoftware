import { Button, Card, CardBody, CardFooter, FormControl, FormErrorMessage, FormLabel, Grid, GridItem, Heading, IconButton, Input, InputGroup, InputRightElement, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import Header from "../components/Header";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

    const [showPassword, setShowPassword] = useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);
    
    const navigate = useNavigate();

    // function handleNavigate(path) 
    // {
    //     return () => navigate(path);
    // }

    const submitForm = (formValues) => {
        let data = {email: formValues.email, username: formValues.username, password: formValues.password, first_name: formValues.firstName, last_name: formValues.lastName};
        axios.post(
            `${process.env.REACT_APP_DJANGO_SERVER_URL}/user/register/`,
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
                            console.log(values);
                            submitForm(values);
                            setTimeout(() => {
                            actions.setSubmitting(false)
                            }, 1000);
                        }}
                    >
                        {(formikProps) => {
                            function validateEmail(value) {
                                let error
                                if (!value) {
                                  error = 'Email is required 😱'
                                }
                                return error
                            }
                        
                            function validateUsername(value) {
                                let error
                                if (!value) {
                                  error = 'Username is required 😱'
                                }
                                return error
                            }

                            function validateFirstName(value) {
                                let error
                                if (!value) {
                                  error = 'First Name is required 😱'
                                }
                                return error
                            }

                            function validateLastName(value) {
                                let error
                                if (!value) {
                                  error = 'Last Name is required 😱'
                                }
                                return error
                            }
                        
                            function validatePassword(value) {
                                let error
                                if (!value) {
                                    error = 'Password is required 😱'
                                }
                                else if (value.length < 8) {
                                    error = 'Password must be 8 or more characters 😱'
                                }
                                return error
                            }

                            function validateConfirmPassword(value) {
                                let error
                                if (!value) {
                                    error = 'Confirm Password is required 😱'
                                } else if (value != formikProps.values.password) {
                                    error = 'Password and Confirm Password fields must match'
                                }
                                return error
                            }

                            return (
                            <Form>
                                <Card
                                    width={"60vh"}
                                    spacing="10rem"
                                    p="3rem"
                                >
                                    <CardBody>
                                        <Heading size="lg">Create an Account</Heading>
                                            <VStack
                                                spacing="2rem"
                                                width="100%"
                                            >

                                                <Field name='email' validate={validateEmail}>
                                                    {({ field, form }) => (
                                                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                                                        <FormLabel fontSize="1.5rem">Email</FormLabel>
                                                        <InputGroup>
                                                            <Input {...field} placeholder='Email' />
                                                        </InputGroup>
                                                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                                    </FormControl>
                                                    )}
                                                </Field>

                                                <Field name='username' validate={validateUsername}>
                                                    {({ field, form }) => (
                                                    <FormControl isInvalid={form.errors.username && form.touched.username}>
                                                        <FormLabel fontSize="1.5rem">Username</FormLabel>
                                                        <InputGroup>
                                                            <Input {...field} placeholder='Username' />
                                                        </InputGroup>
                                                        <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                                                    </FormControl>
                                                    )}
                                                </Field>

                                                <Stack direction="row">
                                                    <Field name='firstName' validate={validateFirstName}>
                                                        {({ field, form }) => (
                                                        <FormControl isInvalid={form.errors.firstName && form.touched.firstName}>
                                                            <FormLabel fontSize="1.5rem">First Name</FormLabel>
                                                            <InputGroup>
                                                                <Input {...field} placeholder='First Name' />
                                                            </InputGroup>
                                                            <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                                                        </FormControl>
                                                        )}
                                                    </Field>
                                                    <Field name='lastName' validate={validateLastName}>
                                                        {({ field, form }) => (
                                                        <FormControl isInvalid={form.errors.lastName && form.touched.lastName}>
                                                            <FormLabel fontSize="1.5rem">Last Name</FormLabel>
                                                            <InputGroup>
                                                                <Input {...field} placeholder='Last Name' />
                                                            </InputGroup>
                                                            <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                                                        </FormControl>
                                                        )}
                                                    </Field>
                                                </Stack>

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

                                                <Field name='confirmPassword' validate={validateConfirmPassword}>
                                                    {({ field, form }) => (
                                                    <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
                                                        <FormLabel fontSize="1.5rem">Confirm Password</FormLabel>
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
                                                        <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
                                                    </FormControl>
                                                    )}
                                                </Field>

                                            </VStack>
                                    </CardBody>
                                    <CardFooter as={VStack}>
                                        <Button
                                            colorScheme="green"
                                            w="full"
                                            isLoading={formikProps.isSubmitting}
                                            type="submit"
                                        >
                                            Register
                                        </Button>
                                        <Text>
                                            Already have an account? <a href="/login" style={{ color: 'blue' }}>Login</a>
                                        </Text>
                                    </CardFooter>
                                </Card>
                            </Form>
                            )
                        }}
                    </Formik>
                </GridItem>
            </Grid>
        </div>
    )

}

export default Register;