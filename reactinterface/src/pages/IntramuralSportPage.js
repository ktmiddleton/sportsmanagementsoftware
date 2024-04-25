import { Wrap, Box, Spacer, Tabs, VStack, TabList, Tab, TabPanels, TabPanel, Table, Thead, Tr, Th, Tbody, Td, HStack, Button, Card, CardBody, CardHeader, CircularProgress, CircularProgressLabel, Grid, GridItem, Heading, Stack, Text, useToast, Spinner, Skeleton, ButtonGroup } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import SportCard from "../components/SportCard";
import { useParams } from "react-router-dom";
import CreateClubSportButton from "../components/permissions/CreateClubSportButton";
import CreateIntramuralSportTeamButton from "../components/permissions/CreateIntramuralSportTeamButton";

function IntramuralSportPage({isOpen, onToggle}) {

    let { sportId } = useParams();

    const [casualTeamData, setCasualTeamData] = useState([]);
    const [competitiveTeamData, setCompetitiveTeamData] = useState([]);

    const [sportData, setSportData] = useState(undefined);

    useEffect(() => {
        axios.get(
            `${process.env.REACT_APP_DJANGO_SERVER_URL}/intramurals/teams/?sport=${sportId}`
        )
        .then((response) => {
            console.log(response.data)
            setCasualTeamData(response.data.IntramuralSportsTeams.casual_teams);
            setCompetitiveTeamData(response.data.IntramuralSportsTeams.competitive_teams);
        })
        .catch((error) => {
            console.log("Error getting intramural teams");
            console.log(error);
        })
        axios.get(
            `${process.env.REACT_APP_DJANGO_SERVER_URL}/intramurals/?sportId=${sportId}`
        )
        .then((response) => {
            console.log(response.data);
            setSportData(response.data.IntramuralSports);
        })
        .catch((error) => {
            console.log("Error getting intramural teams");
            console.log(error);
        })
    }, []);

    return (
        <div className="IntramuralSports">
            <Grid
                templateAreas={`"header"
                                "main"`}
                gridTemplateRows={{base: `${process.env.REACT_APP_HEADER_HEIGHT} ${process.env.REACT_APP_MAIN_PAGE_HEIGHT}`}}
                // gridTemplateColumns={{base:'1fr 3fr 2fr'}}
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

                <GridItem area={'main'} height={process.env.REACT_APP_MAIN_PAGE_HEIGHT} overflowY="hidden">
                    <HStack align={'baseline'} background={process.env.REACT_APP_PAGE_BACKGROUND} height="100%">
                        <Sidebar isOpen={isOpen} onToggle={onToggle}/>
                        <Tabs size="lg" variant="enclosed" colorScheme="green" m="1rem">
                            <TabList>
                                <Tab background="brand.white">
                                    Casual
                                </Tab>
                                <Tab background="brand.white">
                                    Competitive
                                </Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <VStack align={"baseline"}>
                                        <HStack>
                                            <Heading
                                            color={"brand.black"}
                                            >
                                                Available Casual {sportData ? sportData.name : <Spinner />} Teams
                                            </Heading>
                                            <CreateIntramuralSportTeamButton sportData={sportData}/>
                                        </HStack>
                                        <Wrap
                                        padding="2rem"
                                        spacing="1rem"
                                        // m="2rem"
                                        w="100%"
                                        >
                                        {casualTeamData.map((item, index) => (
                                            <SportCard
                                                key={index}
                                                width={"350px"}
                                                image=""
                                                header={item.name}
                                                description={item.description}
                                                teamObject={item}
                                            />
                                        ))}
                                        </Wrap>
                                    </VStack>
                                </TabPanel>
                                <TabPanel>
                                    <VStack align={"baseline"}>
                                        <HStack>
                                            <Heading
                                            color={"brand.black"}
                                            >
                                                Available Competitive {sportData ? sportData.name : <Spinner />} Teams
                                            </Heading>
                                            <CreateIntramuralSportTeamButton sportData={sportData}/>
                                        </HStack>
                                        <Wrap
                                        padding="2rem"
                                        spacing="1rem"
                                        // m="2rem"
                                        w="100%"
                                        // height="auto"
                                        >
                                            {competitiveTeamData.map((item, index) => (
                                                <SportCard
                                                key={index}
                                                width={"350px"}
                                                image=""
                                                header={item.name}
                                                description={item.description}
                                                teamObject={item}
                                            />
                                            ))}
                                        </Wrap>
                                    </VStack>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                        {/* <Grid
                            width="100%"
                            height="100%"
                            templateAreas={`
                                "content-header content-header content-header"
                                "content-main-left divider content-main-right"
                            `}
                            templateRows={{base: "20% 80%"}}
                            templateColumns={{base: "45% 10% 45%"}}
                            overflowX="hidden"
                            overflowY="auto"
                        >
                            <GridItem area="content-header">
                                <Heading
                                    color="brand.black"
                                    textAlign="left"
                                >
                                    Available {sportData ? sportData.name : <Spinner />} Teams
                                    <CreateIntramuralSportTeamButton sportData={sportData}/>
                                </Heading>
                            </GridItem>
                            <GridItem area="content-main-left" height="100%">
                                <Heading color="brand.darkGrey" textAlign="left"> Casual </Heading>
                                <Wrap
                                    padding="2rem"
                                    spacing="1rem"
                                    // m="2rem"
                                    w="100%"
                                >
                                    {casualTeamData.map((item, index) => (
                                        <SportCard
                                            key={index}
                                            width={"350px"}
                                            image=""
                                            header={item.name}
                                            description={item.description}
                                            teamObject={item}
                                        />
                                    ))}
                                </Wrap>
                            </GridItem>
                            <GridItem area="divider">
                                <Center height='100%'>
                                    <Divider borderColor="black" orientation='vertical' />
                                </Center>
                            </GridItem>
                            <GridItem area="content-main-right" height="100%">
                                <Heading color="brand.darkGrey" textAlign="left"> Competitive </Heading>
                                <Wrap
                                    padding="2rem"
                                    spacing="1rem"
                                    // m="2rem"
                                    w="100%"
                                    // height="auto"
                                >
                                    {competitiveTeamData.map((item, index) => (
                                        <SportCard
                                        key={index}
                                        width={"350px"}
                                        image=""
                                        header={item.name}
                                        description={item.description}
                                        teamObject={item}
                                    />
                                    ))}
                                </Wrap>
                            </GridItem>
                        </Grid> */}
                    </HStack>
                </GridItem>

                <GridItem area={"sidebar"}>
                        
                </GridItem>
            </Grid>
        </div>
    )
}

export default IntramuralSportPage;