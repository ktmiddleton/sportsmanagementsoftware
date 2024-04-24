import {Stat, StatLabel, StatNumber, Badge, Flex, Avatar, Box, Text, Heading, HStack, VStack, Spacer, Button, Card, Image, CardBody, CardFooter, Stack, useToast, CircularProgress, CircularProgressLabel} from "@chakra-ui/react";
import {CalendarIcon, TimeIcon} from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ClassCard({classData, image}) {

    const [joinSubmitting, setJoinSubmitting] = useState(false);

    const toast = useToast()

    const navigate = useNavigate();

    function register(event) {
        event.stopPropagation(); // Prevent the outter button from being clicked that navigates to other page
        axios.post(`${process.env.REACT_APP_DJANGO_SERVER_URL}/classes/userclasses/?token=${localStorage.getItem("token")}`,
            {
                classId: classData.id
            }
        )
        .then((response) => {
            window.location.reload();
            toast({
                title: 'Class Joined.',
                description: "You've successfully joined class " + classData.name + ".",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        })
        .catch((error) => {
            toast({
                title: 'Failed to Join Class.',
                description: "You've encountered an error joining Class " + classData.name + ".",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        })
        setJoinSubmitting(true);
        setTimeout(() => {
            setJoinSubmitting(false);
        }, 1000);
    }

    function getButtons() {
        var element = "";
        let action = "" // TODO: Need to also check if user has permissions to register
        if (classData.registered_participants < classData.capacity) {
            action = "open"
        } else {
            action = "full"
        }

        if (classData.members.some((member) => member.username === localStorage.getItem("username"))) {
            action = "registered";
        }

        switch (action) 
        {
            case "open":
                element = <Button isLoading={joinSubmitting} onClick={(event) => register(event)} m="2" variant="Register">Register</Button>;
                break;
            case "waitlist":
                element = <Button m="2" variant="Waitlist">Waitlist</Button>;
                break;
            case "full":
                element = <Button isDisabled="true" m="2" variant="Full">Full</Button>;
                break;
            case "registered":
                element = <Button isDisabled="true" m="2" variant="Full">Registered</Button>;
                break;
            case "registerOpen":
                element = <Flex><Button m="2" variant="Register">Competitive</Button> <Button m="2" variant="Register">Casual</Button></Flex>;
                break;
            case "registerClose":
                element = <Flex><Button isDisabled="true" m="2" variant="Full">Closed</Button> <Button isDisabled="true" m="2" variant="Full">Closed</Button></Flex>
                break;
            case "registerRequest":
                element = <Flex><Button m="2" variant="Waitlist">By Request</Button> <Button m="2" variant="Waitlist">By Request</Button></Flex>
        }
        return element;
    }

    function handleClick() {
        navigate(`/class/${classData.id}`);
    }
    
    return (
        <div className="classCard">
            <Card
                as="button"
                size="sm"
                direction="row"
                w="3fr"
                mx="2"
                maxH="130"
                overflow="hidden"
                alignItems="center"
                onClick={handleClick}
                _hover={{
                    boxShadow: "4px 4px 5px #cccccc",
                    transition: "all 0.1s ease-in-out",
                }}
                _active={{
                    boxShadow: "1px 1px 5px #cccccc",
                    transition: "0.1s"
                }}
            >
                <Image
                    src={image ? image : "./Placeholder.png"}
                    height="100%"
                    width="20%"
                    objectFit="fill"
                />
                
                    <CardBody>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                        >
                            <VStack
                                alignItems="flex-start"
                                spacing="2px"
                                width="70%"
                            >
                                <Heading textAlign="left" size="md">{classData.name}</Heading>

                                <Text textAlign="left" fontSize="sm" noOfLines={1}>{classData.description}</Text>

                                <Heading textAlign="left" size="md">Instructor</Heading>

                                <Text textAlign="left" fontSize="sm" noOfLines={1}>
                                    {classData.instructors.map((item, index) => {
                                        return (<Text key={index}>{item.username}</Text>)
                                    })}
                                </Text>
                            </VStack>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <VStack>
                                    <Stat>
                                        <StatLabel>
                                            Class Day
                                        </StatLabel>
                                        <StatNumber fontSize="1rem">
                                            {new Date(classData.class_time).toLocaleDateString('default')} <CalendarIcon/>
                                        </StatNumber>
                                    </Stat>
                                </VStack>
                                <VStack>
                                    <Stat>
                                        <StatLabel>
                                            Class Time
                                        </StatLabel>
                                        <StatNumber fontSize="1rem">
                                            {new Date(classData.class_time).toLocaleTimeString('default')} <TimeIcon/>
                                        </StatNumber>
                                    </Stat>
                                </VStack>
                            </Stack>
                        </Stack>
                    </CardBody>

                    <CardFooter>
                        <CircularProgress value={(classData.registered_participants/classData.capacity)*100} color='green.400'>
                            <CircularProgressLabel>{classData.registered_participants}/{classData.capacity}</CircularProgressLabel>
                        </CircularProgress>
                        {getButtons()}
                    </CardFooter>
            </Card>
            {/* <Flex
            w="3fr"
            bg="brand.houndsGrey"
            pl="4"
            mx="2"
            >
                <HStack>
                    <Avatar size="lg" src="./Placeholder.png" />
                    <VStack w="100%" alignItems={"baseline"}>
                        <Heading size="md" mx="2">{className}</Heading>
                        <Text fontSize="sm" noOfLines={1}>{description}</Text>
                    </VStack>
                    <Spacer/>
                    {element}
                </HStack>
            </Flex> */}
        </div>
    );
}