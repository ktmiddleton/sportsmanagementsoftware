import { Card, CardBody, CardHeader, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";

function ClubSportTeamPage({isOpen, onToggle}) {

    let { teamId } = useParams()

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

    return (
        <div className="ClubSports">
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