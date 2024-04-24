import { HStack, Button, Card, CardBody, CardHeader, CircularProgress, CircularProgressLabel, Grid, GridItem, Heading, Stack, Text, useToast, Spinner, Skeleton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import DeleteClubSportButton from "../components/permissions/DeleteClubSportButton";
import PromoteCaptainButton from "../components/permissions/PromoteCaptainButton";
import EditClassButton from "../components/permissions/EditClassButton";
import DeleteClassButton from "../components/permissions/DeleteClassButton";

function ClassPage({isOpen, onToggle}) {

    let { classId } = useParams()

    const toast = useToast()

    const [joinSubmitting, setJoinSubmitting] = useState(false);

    const [classData, setClassData] = useState();
    const [classLoaded, setClassLoaded] = useState(false);

    useEffect(() => {
        axios.get(
            `${process.env.REACT_APP_DJANGO_SERVER_URL}/classes/?classId=${classId}`
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

    function leaveClass() {
        axios.delete(`${process.env.REACT_APP_DJANGO_SERVER_URL}/classes/userclasses/?classId=${classData.id}&token=${localStorage.getItem("token")}`)
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

    function getRegistrationButton() {
        console.log(classData)
        if (!classData) {
            return <></>;
        }
        // Check if user in members
        if (classData.members.some((member) => member.username === localStorage.getItem("username"))) {
            return (
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
            );
        // Check if user in waitlist
        } else if (classData.waitlist_members.some((member) => member.username === localStorage.getItem("username"))) {
            return (
                <Button
                    m="1rem"
                    aria-label="Leave Waitlist"
                    leftIcon={<MinusIcon />}
                    isRound={true}
                    size="lg"
                    variant="submit"
                    loadingText='Leaving...'
                    isLoading={joinSubmitting}
                    onClick={() => leaveClass()}
                >
                    Leave Waitlist
                </Button>
            )
        // Check if class is full
        } else if (classData.registered_participants < classData.capacity) {
            return (
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
            );
        // Check if waitlist is not full
        } else if (classData.waitlist_size < classData.waitlist_capacity) {
            return (
                <Button
                    m="1rem"
                    aria-label="Join Waitlist"
                    leftIcon={<AddIcon />}
                    isRound={true}
                    size="lg"
                    variant="submit"
                    loadingText='Joining...'
                    isLoading={joinSubmitting}
                    onClick={() => registerClass()}
                >
                    Join Waitlist
                </Button>
            );
        // Everything is filled :(
        } else {
            return (
                <Button
                    m="1rem"
                    aria-label="Join Waitlist"
                    isRound={true}
                    size="lg"
                    variant="full"
                    isLoading={joinSubmitting}
                    disabled={true}
                >
                    Join Waitlist
                </Button>
            );
        }
    }

    return (
        <div className="ClassPage">
            <Grid
            templateAreas={`"header"
                            "main"`}
            gridTemplateRows={{base: `${process.env.REACT_APP_HEADER_HEIGHT} ${process.env.REACT_APP_MAIN_PAGE_HEIGHT}`}}
            // gridTemplateColumns={{base:'2fr 1fr'}}
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

                <GridItem area={'main'} height={process.env.REACT_APP_MAIN_PAGE_HEIGHT} overflowY="auto">
                    <HStack align={'baseline'} background={process.env.REACT_APP_PAGE_BACKGROUND}>
                        <Sidebar isOpen={isOpen} onToggle={onToggle}/>
                        <Grid
                            templateRows={{base: '1fr 1fr'}}
                            templateColumns={{base: '1fr 1fr 1fr'}}
                            gap="1rem"
                            // p="1rem"
                        >
                            <GridItem
                                rowSpan={1}
                                colSpan={1}
                            >
                                <Heading
                                    color="brand.brightGreen"
                                    textAlign="left"
                                    m="1rem"
                                >
                                    {classData ?
                                        <>
                                            {/* TODO: Small issue where button appears then disappears quickly */}
                                            {classData.name}
                                            {getRegistrationButton()}
                                            <EditClassButton classData={classData} />
                                            <DeleteClassButton pk={classData.id} />
                                        </>
                                    :
                                        <Spinner />
                                    }
                                </Heading>
                            </GridItem>
                            <GridItem
                                rowSpan={1}
                                colSpan={1}
                            >
                                {classData ?
                                    <>
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
                                        <Card>
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Heading>Waitlist</Heading>
                                                <CircularProgress value={(classData.waitlist_size/classData.waitlist_capacity)*100} color='yellow.300'>
                                                    <CircularProgressLabel>{classData.waitlist_size}/{classData.waitlist_capacity}</CircularProgressLabel>
                                                </CircularProgress>
                                            </Stack>
                                        </Card>
                                    </>
                                :
                                    
                                    <Skeleton
                                        isLoaded={classData}
                                        width="20vw"
                                        height="20vh"
                                    />
                                }
                            </GridItem>
                            <GridItem
                                rowSpan={1}
                                colSpan={1}
                            >
                                {classData ?
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
                                :
                                    <Skeleton
                                        isLoaded={classData}
                                        width="20vw"
                                        height="20vh"
                                    />
                                }
                            </GridItem>
                            <GridItem
                                rowSpan={1}
                                colSpan={1}
                            >
                                <Skeleton
                                    isLoaded={classData}
                                    width="20vw"
                                    height="20vh"
                                />
                            </GridItem>
                            <GridItem
                                rowSpan={1}
                                colSpan={1}
                            >
                                <Skeleton
                                    isLoaded={classData}
                                    width="20vw"
                                    height="20vh"
                                />
                            </GridItem>
                            <GridItem
                                rowSpan={1}
                                colSpan={1}
                            >
                                <Skeleton
                                    isLoaded={classData}
                                    width="20vw"
                                    height="20vh"
                                />
                            </GridItem>
                        </Grid>
                    </HStack>
                </GridItem>

                {/* <GridItem area={"sidebar"}>
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
                </GridItem> */}
            </Grid>
        </div>
    )
}

export default ClassPage;