import { Box, Spacer, Tabs, VStack, TabList, Tab, TabPanels, TabPanel, Table, Thead, Tr, Th, Tbody, Td, HStack, Button, Card, CardBody, CardHeader, CircularProgress, CircularProgressLabel, Grid, GridItem, Heading, Stack, Text, useToast, Spinner, Skeleton, ButtonGroup } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import EditClassButton from "../components/permissions/EditClassButton";
import DeleteClassButton from "../components/permissions/DeleteClassButton";
import DeleteClubSportButton from "../components/permissions/DeleteClubSportButton";
import PromoteCaptainButton from "../components/permissions/PromoteCaptainButton";
import EditClubSportButton from "../components/permissions/EditClubSportButton";
import DeleteIntramuralSportTeamButton from "../components/permissions/DeleteIntramuralSportTeamButton";
import EditIntramuralSportTeamButton from "../components/permissions/EditIntramuralSportTeamButton";
import {CalendarIcon, TimeIcon} from "@chakra-ui/icons";


export default function TeamClassContainer({mode, Id}) 
{
    // Default state vars used by all teams
    // let { Id } = useParams()

    const toast = useToast()

    const [joinSubmitting, setJoinSubmitting] = useState(false);

    const [data, setData] = useState();

    const [dataLoaded, setDataLoaded] = useState(false);

    var getRegistrationButton;

    const capitalizeFirstLetter = (string) => {
        if (!string) return string;
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // One use effect, will call differently depending on mode
    useEffect(() => {
        if (mode == "classes") 
        {
            axios.get(
                `${process.env.REACT_APP_DJANGO_SERVER_URL}/classes/?classId=${Id}`
            )
            .then((response) => {
                setData(response.data);
                setDataLoaded(true);
            })
            .catch((error) => {
                console.log("Error getting class");
                console.log(error);
            })
        }
        else if (mode == "intramurals") 
        {
            axios.get(
                `${process.env.REACT_APP_DJANGO_SERVER_URL}/intramurals/teams/?teamId=${Id}`
            )
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log("Error getting Intramural Sport team");
                console.log(error);
            })
        }
        else if (mode == "clubsports") 
        {
            axios.get(
                `${process.env.REACT_APP_DJANGO_SERVER_URL}/clubsports/?teamId=${Id}`
            )
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log("Error getting Club Sport team");
                console.log(error);
            })
        }
    }, []);

    // Functions for each type of team: classes, intramural, club sports
    if (mode == "classes") 
    {
        getRegistrationButton = function() {
            if (!data) {
                return <></>;
            }
            // Check if user in members
            if (data.members.some((member) => member.username === localStorage.getItem("username"))) {
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
            } else if (data.waitlist_members.some((member) => member.username === localStorage.getItem("username"))) {
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
            } else if (data.registered_participants < data.capacity) {
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
            } else if (data.waitlist_size < data.waitlist_capacity) {
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

        function registerClass() {
            axios.post(`${process.env.REACT_APP_DJANGO_SERVER_URL}/classes/userclasses/?token=${localStorage.getItem("token")}`,
                {
                    classId: data.id
                }
            )
            .then((response) => {
                window.location.reload();
                toast({
                    title: 'Class Joined.',
                    description: "You've successfully joined class " + data.name + ".",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            })
            .catch((error) => {
                toast({
                    title: 'Failed to Join Class.',
                    description: "You've encountered an error joining Class " + data.name + ".",
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
            axios.delete(`${process.env.REACT_APP_DJANGO_SERVER_URL}/classes/userclasses/?classId=${data.id}&token=${localStorage.getItem("token")}`)
            .then((response) => {
                window.location.reload();
                toast({
                    title: 'Class Left.',
                    description: "You've successfully Left class " + data.name + ".",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            })
            .catch((error) => {
                toast({
                    title: 'Failed to Leave Class.',
                    description: "You've encountered an error leaving Class " + data.name + ".",
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
    }
    else if (mode == "intramurals") 
    {
        getRegistrationButton = function() 
        {
            return (data.members.some((member) => member.username === localStorage.getItem("username")) ?
            <Button
                m="1rem"
                aria-label="Leave Team"
                leftIcon={<MinusIcon />}
                isRound={true}
                size="lg"
                variant="submit"
                loadingText='Leaving...'
                isLoading={joinSubmitting}
                onClick={() => leaveTeam()}
            >
                Leave Team
            </Button>
        :
            <Button
                m="1rem"
                aria-label="Join Team"
                leftIcon={<AddIcon />}
                isRound={true}
                size="lg"
                variant="submit"
                loadingText='Joining...'
                isLoading={joinSubmitting}
                onClick={() => joinTeam()}
            >
                Join Team
            </Button>
        )
        }
        function joinTeam() {
            axios.post(`${process.env.REACT_APP_DJANGO_SERVER_URL}/intramurals/userteams/`,
                {
                    token: localStorage.getItem("token"),
                    teamId: data.id
                }
            )
            .then((response) => {
                window.location.reload();
                toast({
                    title: 'Team Joined.',
                    description: "You've successfully joined Intramural " + data.name + ".",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            })
            .catch((error) => {
                toast({
                    title: 'Failed to Join Team.',
                    description: "You've encountered an error joining Intramural " + data.name + ".",
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
    
        function leaveTeam() {
            axios.delete(`${process.env.REACT_APP_DJANGO_SERVER_URL}/intramurals/userteams/?teamId=${data.id}&token=${localStorage.getItem("token")}`)
            .then((response) => {
                window.location.reload();
                toast({
                    title: 'Team Left.',
                    description: "You've successfully left club " + data.name + ".",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            })
            .catch((error) => {
                toast({
                    title: 'Failed to Leave Team.',
                    description: "You've encountered an error leaving club " + data.name + ".",
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
    }
    else if (mode == "clubsports") 
    {
        getRegistrationButton = function() 
        {
            return (data.members.some((member) => member.username === localStorage.getItem("username")) ?
                <Button
                    m="1rem"
                    aria-label="Leave Team"
                    leftIcon={<MinusIcon />}
                    isRound={true}
                    size="lg"
                    variant="submit"
                    loadingText='Leaving...'
                    isLoading={joinSubmitting}
                    onClick={() => leaveTeam()}
                >
                    Leave Team
                </Button>
            :
                <Button
                    m="1rem"
                    aria-label="Join Team"
                    leftIcon={<AddIcon />}
                    isRound={true}
                    size="lg"
                    variant="submit"
                    loadingText='Joining...'
                    isLoading={joinSubmitting}
                    onClick={() => joinTeam()}
                >
                    Join Team
                </Button>
            )
        }

        function joinTeam() {
            axios.post(`${process.env.REACT_APP_DJANGO_SERVER_URL}/clubsports/userteams/`,
                {
                    token: localStorage.getItem("token"),
                    teamId: data.id
                }
            )
            .then((response) => {
                window.location.reload();
                toast({
                    title: 'Team Joined.',
                    description: "You've successfully joined Club " + data.name + ".",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            })
            .catch((error) => {
                toast({
                    title: 'Failed to Join Team.',
                    description: "You've encountered an error joining Club " + data.name + ".",
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
    
        function leaveTeam() {
            axios.delete(`${process.env.REACT_APP_DJANGO_SERVER_URL}/clubsports/userteams/?teamId=${data.id}&token=${localStorage.getItem("token")}`)
            .then((response) => {
                window.location.reload();
                toast({
                    title: 'Team Left.',
                    description: "You've successfully left club " + data.name + ".",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            })
            .catch((error) => {
                toast({
                    title: 'Failed to Leave Team.',
                    description: "You've encountered an error leaving club " + data.name + ".",
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
    }

    return (
        <Tabs size="lg" variant="enclosed" colorScheme="green" m="1rem">
            <TabList>
                <Tab background="brand.white">
                    Info
                </Tab>
                <Tab background="brand.white">
                    Participants
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel> {/* Info Tab */}
                {data ?
                    <>
                        {/* TODO: Small issue where button appears then disappears quickly */}
                        <VStack
                        align={"baseline"}
                        >
                            <Heading
                            mr={"12"}
                            color="brand.black"
                            >
                                {capitalizeFirstLetter(data.name)}
                            </Heading>
                            <HStack>
                                {mode == "classes" ?
                                    <Box>
                                        <HStack>
                                            <CircularProgress
                                            mx={"4"}
                                            value={(data.registered_participants/data.capacity)*100} color='green.400'>
                                                <CircularProgressLabel>{data.registered_participants}/{data.capacity}</CircularProgressLabel>
                                            </CircularProgress>
                                            <VStack
                                            mx={"4"}
                                            >
                                                <CalendarIcon
                                                color="brand.black"
                                                />
                                                <Text
                                                color="brand.black"
                                                mx={"4"}
                                                >
                                                    {new Date(data.class_time).toLocaleDateString('default')} 
                                                </Text>
                                            </VStack>
                                            <VStack
                                            mx={"4"}
                                            >
                                                <TimeIcon
                                                color="brand.black"
                                                />
                                                <Text
                                                color="brand.black"
                                                mx={"4"}
                                                >
                                                    {new Date(data.class_time).toLocaleTimeString('default')}
                                                </Text>
                                            </VStack>
                                        </HStack>
                                    </Box>
                                    : 
                                    <></>
                                }
                                <Spacer/>
                                {getRegistrationButton()}
                                {mode == "classes" ? 
                                <ButtonGroup>
                                    <EditClassButton classData={data}/>
                                    <DeleteClassButton pk={data.id} />
                                </ButtonGroup> 
                                : mode == "intramurals" ? 
                                <ButtonGroup>
                                    <EditIntramuralSportTeamButton teamData={data} />
                                    <DeleteIntramuralSportTeamButton teamData={data} />
                                </ButtonGroup> 
                                : 
                                <ButtonGroup>
                                    <PromoteCaptainButton teamData={data} />
                                    <DeleteClubSportButton teamData={data} />
                                    <EditClubSportButton teamData={data}/>
                                </ButtonGroup>
                            }
                                
                            </HStack>
                            <Text
                            textAlign={"left"}
                            >
                                {capitalizeFirstLetter(data.description)}
                            </Text>
                        </VStack>
                    </>
                :
                    <Spinner />
                }
                </TabPanel>
                <TabPanel> {/* Participants Tab */}
                    <Table size="lg">
                        <Thead>
                            <Tr>
                                <Th>First Name</Th>
                                <Th>Last Name</Th>
                                <Th>Username</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data?.members.map( (item) => {
                                return (
                                    <Tr>
                                        {console.log(item)}
                                        <Td>{item.first_name}</Td>
                                        <Td>{item.last_name}</Td>
                                        <Td>{item.username}</Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
                </TabPanel>
            </TabPanels>
        </Tabs>
        // <Grid
        //     templateRows={{base: '1fr 1fr'}}
        //     templateColumns={{base: '1fr 1fr 1fr'}}
        //     gap="1rem"
        //     // p="1rem"
        // >
        //     <GridItem
        //         rowSpan={1}
        //         colSpan={1}
        //     >
        //         <Heading
        //             color="brand.brightGreen"
        //             textAlign="left"
        //             m="1rem"
        //         >
        //             {data ?
        //                 <>
        //                     {/* TODO: Small issue where button appears then disappears quickly */}
        //                     {data.name}
        //                     {getRegistrationButton()}
        //                     <EditClassButton classData={data} />
        //                     <DeleteClassButton pk={data.id} />
        //                 </>
        //             :
        //                 <Spinner />
        //             }
        //         </Heading>
        //     </GridItem>
        //     <GridItem
        //         rowSpan={1}
        //         colSpan={1}
        //     >
        //         {data ?
        //             <>
        //                 <Card>
        //                     <CardHeader>
        //                         <Stack
        //                             direction="row"
        //                             alignItems="center"
        //                             justifyContent="center"
        //                         >
        //                             <Heading>Registered</Heading>
        //                             <CircularProgress value={(data.registered_participants/data.capacity)*100} color='green.400'>
        //                                 <CircularProgressLabel>{data.registered_participants}/{data.capacity}</CircularProgressLabel>
        //                             </CircularProgress>
        //                         </Stack>
        //                     </CardHeader>
        //                     <CardBody
        //                         maxHeight="85vh"
        //                         overflowY="auto"
        //                     >
        //                         {data.members.map((item, index) => {
        //                             return (<Text key={index}>{item.username}</Text>)
        //                         })}
        //                     </CardBody>
        //                 </Card>
        //                 <Card>
        //                     <Stack
        //                         direction="row"
        //                         alignItems="center"
        //                         justifyContent="center"
        //                     >
        //                         <Heading>Waitlist</Heading>
        //                         <CircularProgress value={(data.waitlist_size/data.waitlist_capacity)*100} color='yellow.300'>
        //                             <CircularProgressLabel>{data.waitlist_size}/{data.waitlist_capacity}</CircularProgressLabel>
        //                         </CircularProgress>
        //                     </Stack>
        //                 </Card>
        //             </>
        //         :
                    
        //             <Skeleton
        //                 isLoaded={data}
        //                 width="20vw"
        //                 height="20vh"
        //             />
        //         }
        //     </GridItem>
        //     <GridItem
        //         rowSpan={1}
        //         colSpan={1}
        //     >
        //         {data ?
        //             <Card>
        //                 <CardHeader>
        //                     <Heading>Description</Heading>
        //                 </CardHeader>
        //                 <CardBody>
        //                     <Text>
        //                         {data.description}
        //                     </Text>
        //                 </CardBody>
        //             </Card>
        //         :
        //             <Skeleton
        //                 isLoaded={data}
        //                 width="20vw"
        //                 height="20vh"
        //             />
        //         }
        //     </GridItem>
        //     <GridItem
        //         rowSpan={1}
        //         colSpan={1}
        //     >
        //         <Skeleton
        //             isLoaded={data}
        //             width="20vw"
        //             height="20vh"
        //         />
        //     </GridItem>
        //     <GridItem
        //         rowSpan={1}
        //         colSpan={1}
        //     >
        //         <Skeleton
        //             isLoaded={data}
        //             width="20vw"
        //             height="20vh"
        //         />
        //     </GridItem>
        //     <GridItem
        //         rowSpan={1}
        //         colSpan={1}
        //     >
        //         <Skeleton
        //             isLoaded={data}
        //             width="20vw"
        //             height="20vh"
        //         />
        //     </GridItem>
        // </Grid>
    );
}