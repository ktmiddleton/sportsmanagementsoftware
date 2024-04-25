import {Badge, Flex, Avatar, Box, Text, Heading, HStack, VStack, Spacer, Button, Card, Image, CardBody, CardFooter, Stack, useToast, CircularProgress, CircularProgressLabel, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Progress, useDisclosure} from "@chakra-ui/react";
import GroupIcon from '@mui/icons-material/Group';
import React, { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormDisplay from "./FormDisplay";

const REGISTRATION_DEADLINE_PASSED_TEXT = "Deadline Passed";

export default function FormCard({formData, image}) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [joinSubmitting, setJoinSubmitting] = useState(false);

    const toast = useToast()

    // useEffect(() => {
    //     console.log(formData)
    // }, [])

    /* Method from https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript */
    function calculateTimeRemaining(registration_deadline) {
        const nowDate = new Date();
        // console.log("Now: " + nowDate)
        const deadlineDate = new Date(registration_deadline);
        // console.log("Ends: " + deadlineDate)
        const diffMilli = (deadlineDate - nowDate);
        const daysRemaining = Math.floor(diffMilli / (1000 * 60 * 60 * 24)); 
        const hoursRemaining = Math.floor((diffMilli / (1000 * 60 * 60)) % 24) // Mod 24 to find hours remaining not considering days
        const minsRemaining = Math.floor((diffMilli / (1000 * 60)) % 60) // Mod 60 to find minutes remaining not considering hours
        const secondsRemaining = Math.floor((diffMilli / (1000)) % 60) // Mod 60 to find seconds remining not considering minutes
        // console.log(daysRemaining + " days");
        // console.log(hoursRemaining + " hours");
        // console.log(minsRemaining + " minutes");
        // console.log(secondsRemaining + " seconds");

        let timeString = "";

        if (diffMilli < 0) {
            timeString = REGISTRATION_DEADLINE_PASSED_TEXT;
        } else if (daysRemaining >= 1) {
            timeString = daysRemaining + " days, " + hoursRemaining + " hours"
        } else if (hoursRemaining >= 1) {
            timeString = hoursRemaining + " hours, " + minsRemaining + " minutes"
        } else {// < 1 hour
            timeString = minsRemaining + " minutes, " + secondsRemaining + " seconds"
        }

        return timeString.trim();
        // return daysRemaining + ":" + hoursRemaining + ":" + minsRemaining + ":" + secondsRemaining
    }

    function calculateProgressPercentage(registration_opens, registration_deadline) {
        const startDate = new Date(registration_opens);
        const endDate = new Date(registration_deadline);
        const nowDate = new Date();
    
        // Ensure dates are in correct order and within range
        if (startDate >= endDate || nowDate < startDate) {
            return 0; // Not started or invalid range
        }
        if (nowDate > endDate) {
            return 100; // Completed
        }
    
        // Calculate total duration and elapsed duration in milliseconds
        const totalDuration = endDate - startDate;
        const elapsedDuration = nowDate - startDate;
    
        // Calculate percentage
        const percentage = (elapsedDuration / totalDuration) * 100;
    
        return percentage.toFixed(2); // Returns a string formatted to two decimal places
    }

    function complete(event) {
        // event.stopPropagation(); // Prevent the outter button from being clicked that navigates to other page
        // axios.post(`${process.env.REACT_APP_DJANGO_SERVER_URL}/classes/userclasses/`,
        //     {
        //         token: localStorage.getItem("token"),
        //         classId: formData.id
        //     }
        // )
        // .then((response) => {
        //     window.location.reload();
        //     toast({
        //         title: 'Class Joined.',
        //         description: "You've successfully joined class " + formData.name + ".",
        //         status: 'success',
        //         duration: 9000,
        //         isClosable: true,
        //     })
        // })
        // .catch((error) => {
        //     toast({
        //         title: 'Failed to Join Class.',
        //         description: "You've encountered an error joining Class " + formData.name + ".",
        //         status: 'error',
        //         duration: 9000,
        //         isClosable: true,
        //     })
        // })
        setJoinSubmitting(true);
        setTimeout(() => {
            setJoinSubmitting(false);
        }, 1000);
    }

    function getButtons() {
        var element = "";
        let action = "" // TODO: Need to also check if user has permissions to register
        if (formData.completed) {
            action="completed"
        } else if (calculateTimeRemaining(formData.deadline) !== REGISTRATION_DEADLINE_PASSED_TEXT ) {
            action = "complete";
        } else {
            action = "deadlinePassed";
        }

        switch (action) 
        {
            case "complete":
                element = <Button isLoading={joinSubmitting} onClick={(event) => complete(event)} m="2" variant="Register">Complete</Button>;
                break;
            case "completed":
                element = <Button m="2" isDisabled="true" variant="Full">Completed</Button>;
                break;
            case "deadlinePassed":
                element = <Button isLoading={joinSubmitting} onClick={(event) => complete(event)} m="2" variant="Register">Complete</Button>;
                break;
        }
        return element;
    }

    function handleClick() {
        onOpen();
    }
    
    return (
        <div className="formCard">
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
                    >
                        <VStack
                            alignItems="flex-start"
                            spacing="2px"
                        >
                            <Heading textAlign="left" size="md" noOfLines={3}>{formData.form_info.name}</Heading>

                            <Text textAlign="left" fontSize="sm" noOfLines={1}>
                                {formData.clubsport ? "Club Team: " + formData.clubsport.name : null}
                            </Text>
                            <Text textAlign="left" fontSize="sm" noOfLines={1}>
                                {formData.class_obj ? "Class: " + formData.class_obj.name : null}
                            </Text>
                            <Text textAlign="left" fontSize="sm" noOfLines={1}>
                                {formData.intramural_team ? "Intramural Team: " + formData.intramural_team.name : null}
                            </Text>
                            

                        </VStack>
                    </Stack>
                </CardBody>

                <CardFooter>
                    <Stat
                        w="10%"
                    >
                        <StatLabel>Registration Time Remaining</StatLabel>
                        <StatNumber>
                            {calculateTimeRemaining(formData.deadline)}
                        </StatNumber>
                    </Stat>
                    {getButtons()}
                </CardFooter>
            </Card>
            <FormDisplay formData={formData} isOpen={isOpen} onClose={onClose} />
        </div>
    );
}