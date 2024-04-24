import {Badge, Flex, Avatar, Box, Text, Heading, HStack, VStack, Spacer, Button, Card, Image, CardBody, CardFooter, Stack, useToast, CircularProgress, CircularProgressLabel, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Progress, useDisclosure} from "@chakra-ui/react";
import GroupIcon from '@mui/icons-material/Group';
import React, { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormDisplay from "./FormDisplay";
import CreateFormForm from "./permissions/forms/CreateFormForm";
import EditFormButton from "./permissions/EditFormButton";
import DeleteFormButton from "./permissions/DeleteFormButton";

const REGISTRATION_DEADLINE_PASSED_TEXT = "Deadline Passed";

export default function FormInfoCard({formData, image}) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const toast = useToast()

    // useEffect(() => {
    //     console.log(formData)
    // }, [])

    function handleClick(event) {
        console.log(event)
        onOpen();
    }
    
    return (
        
        <div className="formInfoCard">
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
                        alignItems="start"
                        justifyContent="flex-start"
                        spacing="10%"
                    >
                        <VStack
                            alignItems="flex-start"
                            spacing="2px"
                            maxWidth="20%"
                        >
                            <Heading textAlign="left" size="md">{formData.name}</Heading>
                            {/* <Text textAlign="left" fontSize="sm" noOfLines={1}>{formData.body}</Text> */}
                        </VStack>
                        <VStack
                            alignItems="flex-start"
                            spacing="2px"
                        >
                            <Heading textAlign="left" size="md">Assign on</Heading>
                            <Text textAlign="left" fontSize="sm" noOfLines={1}>
                                {formData.clubsport_join ? "Joining Club Sport" : ""}
                            </Text>
                            <Text textAlign="left" fontSize="sm" noOfLines={1}>
                                {formData.class_join ? "Joining Class" : ""}
                            </Text>
                            <Text textAlign="left" fontSize="sm" noOfLines={1}>
                                {formData.intramural_team_join ? "Joining Intramural Team" : ""}
                            </Text>
                        </VStack>
                    </Stack>
                </CardBody>

                <CardFooter>
                    <EditFormButton formData={formData} />
                    <DeleteFormButton pk={formData.id} />
                    <CreateFormForm initialValues={formData} mode="update" pk={formData.id} isOpen={isOpen} onClose={onClose} />
                </CardFooter>
            </Card>
        </div>
    );
}