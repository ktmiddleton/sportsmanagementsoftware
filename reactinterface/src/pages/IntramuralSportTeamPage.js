import { Wrap, VStack, HStack, Button, Card, CardBody, CardHeader, Grid, GridItem, Heading, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import DeleteIntramuralSportTeamButton from "../components/permissions/DeleteIntramuralSportTeamButton";
import EditIntramuralSportTeamButton from "../components/permissions/EditIntramuralSportTeamButton";
import TeamClassContainer from "../components/TeamClassContainer";

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
            `${process.env.REACT_APP_DJANGO_SERVER_URL}/intramurals/teams/?teamId=${teamId}`
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
        axios.post(`${process.env.REACT_APP_DJANGO_SERVER_URL}/intramurals/userteams/`,
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
        axios.delete(`${process.env.REACT_APP_DJANGO_SERVER_URL}/intramurals/userteams/?teamId=${teamData.id}&token=${localStorage.getItem("token")}`)
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

    function getRegistrationButton() {
        return (teamData.members.some((member) => member.username === localStorage.getItem("username")) ?
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

    return (
        <div className="IntramuralSportTeamPage">
            <Grid
            templateAreas={`"header header"
                            "main sidebar"`}
            gridTemplateRows={{base: `${process.env.REACT_APP_HEADER_HEIGHT} ${process.env.REACT_APP_MAIN_PAGE_HEIGHT}`}}
            gridTemplateColumns={{base:'2fr 1fr'}}
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
                        <TeamClassContainer Id={teamId} mode={"intramurals"}/>
                        {/* <VStack>
                            {teamData ? 
                                <Heading
                                    color="brand.brightGreen"
                                    textAlign="left"
                                    // m="1rem"
                                >
                                    TODO: May want to not do this capitlize thing and just return a capitalized version from the backend
                                    {capitalizeFirstLetter(teamData.sport_type) + " " + teamData.name}
                                    {getRegistrationButton()}
                                    <DeleteIntramuralSportTeamButton teamData={teamData} />
                                    <EditIntramuralSportTeamButton teamData={teamData} />
                                </Heading>
                            :
                                <></>
                            }
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
                        </VStack> */}
                    </HStack>
                </GridItem>

                <GridItem area={"sidebar"}>
                    <Grid
                        bg="brand.hover.houndsGrey"
                        h={process.env.REACT_APP_MAIN_PAGE_HEIGHT}
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