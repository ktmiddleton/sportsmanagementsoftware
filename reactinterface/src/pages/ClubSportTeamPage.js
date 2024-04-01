import { Button, Card, CardBody, CardHeader, Grid, GridItem, Heading, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import DeleteClubSportButton from "../components/permissions/DeleteClubSportButton";
import PromoteCaptainButton from "../components/permissions/PromoteCaptainButton";

function ClubSportTeamPage({isOpen, onToggle}) {

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
            `http://localhost:8000/clubsports/?teamId=${teamId}`
        )
        .then((response) => {
            setTeamData(response.data);
            console.log(response.data)
        })
        .catch((error) => {
            console.log("Error getting Club Sport team");
            console.log(error);
        })
    }, []);

    function joinTeam() {
        axios.post(`http://localhost:8000/clubsports/userteams/`,
            {
                token: localStorage.getItem("token"),
                teamId: teamData.id
            }
        )
        .then((response) => {
            window.location.reload();
            toast({
                title: 'Team Joined.',
                description: "You've successfully joined Club " + teamData.name + ".",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        })
        .catch((error) => {
            toast({
                title: 'Failed to Join Team.',
                description: "You've encountered an error joining Club " + teamData.name + ".",
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
        <div className="ClubSportTeamPage">
            <Grid
            templateAreas={`"header header header"
                            "nav main sidebar"`}
            gridTemplateRows={{base: '10vh 90vh'}}
            gridTemplateColumns={{base:'1fr 3fr 2fr'}}
            gap='0'
            color='blackAlpha.700'
            fontWeight='bold'
            overflowX="hidden"
            >
                <GridItem area={'header'}>
                    <Header buttons={true}/>
                </GridItem>

                <GridItem area={'nav'}>
                    <Sidebar isOpen={isOpen} onToggle={onToggle}/>
                </GridItem>

                <GridItem area={'main'}>
                    <Heading
                        color="brand.brightGreen"
                        textAlign="left"
                        m="1rem"
                    >
                        {/* TODO: May want to not do this capitlize thing and just return a capitalized version from the backend */}
                        {capitalizeFirstLetter(teamData.sport_type) + " " + teamData.name}
                        {/* TODO: Small issue where button appears then disappears quickly */}
                        {teamData.members.some((member) => member.username === localStorage.getItem("username")) ?
                            <></>
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
                        <PromoteCaptainButton teamData={teamData} />
                        <DeleteClubSportButton teamData={teamData} />
                    </Heading>
                    <Grid
                        templateRows={{base: '1fr 1fr'}}
                        templateColumns={{base: '1fr 1fr'}}
                        gap="1rem"
                        p="1rem"
                    >
                        <GridItem
                            rowSpan={2}
                            colSpan={1}
                        >
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
                                        {teamData.description}
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

export default ClubSportTeamPage;