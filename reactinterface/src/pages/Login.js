import { Button, Card, CardBody, CardFooter, FormControl, FormLabel, Grid, GridItem, Heading, IconButton, Input, InputGroup, InputRightElement, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import Header from "../components/Header";

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);

    return (
        <div className="login">
            <Grid
                templateAreas={`"header header"
                                "main main"`}
                gridTemplateRows={{base: '10vh 90vh'}}
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
                    <Card
                        boxSize={"60vh"}
                        spacing="10rem"
                        p="3rem"
                    >
                        <CardBody>
                            <Heading size="lg">Login</Heading>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} />
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
                            </FormControl>
                        </CardBody>
                        <CardFooter as={VStack}>
                            <Button colorScheme="blue" w="full">
                                Sign In
                            </Button>
                            <Text>
                                Don't have an account? <a href="#" style={{ color: 'blue' }}>Sign up</a>
                            </Text>
                        </CardFooter>
                    </Card>
                </GridItem>
            </Grid>
        </div>
    )
}

export default Login;