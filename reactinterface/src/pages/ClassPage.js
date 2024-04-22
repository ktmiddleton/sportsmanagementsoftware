import { HStack, Button, Card, CardBody, CardHeader, CircularProgress, CircularProgressLabel, Grid, GridItem, Heading, Stack, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import DeleteClubSportButton from "../components/permissions/DeleteClubSportButton";
import PromoteCaptainButton from "../components/permissions/PromoteCaptainButton";
import EditClassButton from "../components/permissions/EditClassButton";

function ClassPage({isOpen, onToggle}) {

    let { classId } = useParams()

    const toast = useToast()

    const [joinSubmitting, setJoinSubmitting] = useState(false);

    const [classData, setClassData] = useState({ members: [] });
    const [classLoaded, setClassLoaded] = useState(false);

    useEffect(() => {
        axios.get(
            `http://localhost:8000/classes/?classId=${classId}`
        )
        .then((response) => {
            setClassData(response.data);
            setClassLoaded(true);
            console.log(response.data)
        })
        .catch((error) => {
            console.log("Error getting class");
            console.log(error);
        })
    }, []);

    function registerClass() {
        axios.post(`http://localhost:8000/classes/userclasses/?token=${localStorage.getItem("token")}`,
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

    function leaveClass() {
        axios.delete(`http://localhost:8000/classes/userclasses/?classId=${classData.id}&token=${localStorage.getItem("token")}`)
        .then((response) => {
            window.location.reload();
            toast({
                title: 'Class Left.',
                description: "You've successfully Left class " + classData.name + ".",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        })
        .catch((error) => {
            toast({
                title: 'Failed to Leave Class.',
                description: "You've encountered an error leaving Class " + classData.name + ".",
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

    return (
        <div className="ClassPage">
            <Grid
            templateAreas={`"header header"
                            "main sidebar"`}
            gridTemplateRows={{base: '10vh 90vh'}}
            gridTemplateColumns={{base:'2fr 2fr'}}
            gap='0'
            color='blackAlpha.700'
            fontWeight='bold'
            overflowX="hidden"
            >
                <GridItem area={'header'}>
                    <Header buttons={true}/>
                </GridItem>

                <GridItem area={'nav'}>
                    {/* <Sidebar isOpen={isOpen} onToggle={onToggle}/> */}
                </GridItem>

                <GridItem area={'main'}>
                    <HStack align={'baseline'}>
                        <Sidebar isOpen={isOpen} onToggle={onToggle}/>
                        <Heading
                            color="brand.brightGreen"
                            textAlign="left"
                            m="1rem"
                        >
                            {classData.name}
                            {/* TODO: Small issue where button appears then disappears quickly */}
                            {classData.members.some((member) => member.username === localStorage.getItem("username")) ?
                            // TODO: Need to add leave class button
                                <Button
                                    m="1rem"
                                    aria-label="Leave Class"
                                    leftIcon={<MinusIcon />}
                                    isRound={true}
                                    size="lg"
                                    variant="submit"
                                    loadingText='Leaving...'
                                    isLoading={joinSubmitting}
                                    onClick={() => leaveClass()}
                                >
                                    Leave Class
                                </Button>
                            :
                                <Button
                                    m="1rem"
                                    aria-label="Join Class"
                                    leftIcon={<AddIcon />}
                                    isRound={true}
                                    size="lg"
                                    variant="submit"
                                    loadingText='Joining...'
                                    isLoading={joinSubmitting}
                                    onClick={() => registerClass()}
                                >
                                    Register for Class
                                </Button>
                            }
                            <EditClassButton classData={classData} />
                        </Heading>
                        <Grid
                            templateRows={{base: '1fr 1fr'}}
                            templateColumns={{base: '1fr 1fr'}}
                            gap="1rem"
                            // p="1rem"
                        >
                            <GridItem
                                rowSpan={2}
                                colSpan={1}
                            >
                                <Card>
                                    <CardHeader>
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Heading>Registered</Heading>
                                            <CircularProgress value={(classData.registered_participants/classData.capacity)*100} color='green.400'>
                                                <CircularProgressLabel>{classData.registered_participants}/{classData.capacity}</CircularProgressLabel>
                                            </CircularProgress>
                                        </Stack>
                                    </CardHeader>
                                    <CardBody
                                        maxHeight="85vh"
                                        overflowY="auto"
                                    >
                                        {classData.members.map((item, index) => {
                                            return (<Text key={index}>{item.username}</Text>)
                                        })}
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem
                                rowSpan={1}
                                colSpan={1}
                            >
                                <Card>
                                    <CardHeader>
                                        <Heading>Description</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Text>
                                            {classData.description}
                                        </Text>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem
                                rowSpan={1}
                                colSpan={1}
                            >

                            </GridItem>
                        </Grid>
                    </HStack>
                </GridItem>

                <GridItem area={"sidebar"}>
                    <Grid
                        bg="brand.hover.houndsGrey"
                        h="100vh"
                        w="100%"
                    >
                        <Heading
                            color="brand.brightGreen"
                            textAlign="left"
                            m="1rem"
                        >
                            Matches
                        </Heading>
                        <Heading
                            color="brand.brightGreen"
                            textAlign="left"
                            m="1rem"
                        >
                            TODO
                        </Heading>
                    </Grid>
                </GridItem>
            </Grid>
        </div>
    )
}

export default ClassPage;