import { Wrap, VStack, HStack, Button, Card, CardBody, CardHeader, Grid, GridItem, Heading, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

function IntramuralSportTeamPage({isOpen, onToggle}) {

    let { teamId } = useParams()

    const toast = useToast()

    const [joinSubmitting, setJoinSubmitting] = useState(false);

    const [teamData, setTeamData] = useState({ members: [] });

    const capitalizeFirstLetter = (string) => {
        if (!string) return string;
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    useEffect(() => {
        console.log("plonk")
        axios.get(
            `http://localhost:8000/intramurals/teams/?teamId=${teamId}`
        )
        .then((response) => {
            setTeamData(response.data);
            console.log(response.data)
        })
        .catch((error) => {
            console.log("Error getting Intramural Sport team");
            console.log(error);
        })
    }, []);

    function joinTeam() {
        axios.post(`http://localhost:8000/intramurals/userteams/`,
            {
                token: localStorage.getItem("token"),
                teamId: teamData.id
            }
        )
        .then((response) => {
            window.location.reload();
            toast({
                title: 'Team Joined.',
                description: "You've successfully joined Intramural " + teamData.name + ".",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        })
        .catch((error) => {
            toast({
                title: 'Failed to Join Team.',
                description: "You've encountered an error joining Intramural " + teamData.name + ".",
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
        axios.delete(`http://localhost:8000/intramurals/userteams/?teamId=${teamData.id}&token=${localStorage.getItem("token")}`)
        .then((response) => {
            window.location.reload();
            toast({
                title: 'Team Left.',
                description: "You've successfully left club " + teamData.name + ".",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        })
        .catch((error) => {
            toast({
                title: 'Failed to Leave Team.',
                description: "You've encountered an error leaving club " + teamData.name + ".",
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
        <div className="IntramuralSportTeamPage">
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
                        <VStack>
                            <Heading
                                color="brand.brightGreen"
                                textAlign="left"
                                m="1rem"
                            >
                                {/* TODO: May want to not do this capitlize thing and just return a capitalized version from the backend */}
                                {capitalizeFirstLetter(teamData.sport_type) + " " + teamData.name}
                                {teamData.members.some((member) => member.username === localStorage.getItem("username")) ?
                                // TODO: Need to add leave class button
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
                                }
                            </Heading>
                            <Wrap>
                                    <Card>
                                        <CardHeader>
                                            <Heading>Roster</Heading>
                                        </CardHeader>
                                        <CardBody
                                            maxHeight="85vh"
                                            overflowY="auto"
                                        >
                                            {teamData.members.map((item, index) => {
                                                return (<Text key={index}>{item.username}</Text>)
                                            })}
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <Heading>Description</Heading>
                                        </CardHeader>
                                        <CardBody>
                                            <Text>
                                                {teamData.description}
                                            </Text>
                                        </CardBody>
                                    </Card>
                            </Wrap>
                        </VStack>
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

export default IntramuralSportTeamPage;