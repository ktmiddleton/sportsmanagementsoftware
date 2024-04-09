import React, { useEffect, useState } from "react";
import SportCard from "../components/SportCard";
import { Wrap, Box, Flex, Grid, GridItem, HStack, VStack, Heading, Spacer } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import ClassCard from "../components/ClassCard";

function Dashboard({isOpen, onToggle}) {

    const [registeredTeams, setRegisteredTeams] = useState([]);

    const [registeredClasses, setRegisteredClasses] = useState([]);

    useEffect(() => {
        setRegisteredTeams([])
        axios.get( // Get Club Sports
            `http://localhost:8000/clubsports/userteams/?username=${localStorage.getItem("username")}`
        )
        .then((response) => {
            setRegisteredTeams((prevTeams) => [...prevTeams, ...response.data]);
        })
        .catch((error) => {
            console.log("Error getting users Club Sports");
            console.log(error);
        });

        axios.get( // Get Intramural Sports
            `http://localhost:8000/intramurals/userteams/?username=${localStorage.getItem("username")}`
        )
        .then((response) => {
            setRegisteredTeams((prevTeams) => [...prevTeams, ...response.data]);
        })
        .catch((error) => {
            console.log("Error getting users Intramural Sports");
            console.log(error);
        });

        axios.get( // Get Intramural Sports
            `http://localhost:8000/classes/userclasses/?username=${localStorage.getItem("username")}`
        )
        .then((response) => {
            setRegisteredClasses(response.data);
        })
        .catch((error) => {
            console.log("Error getting users Classes");
            console.log(error);
        });
    }, []);

    return (
        <div className="dashboard">
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
                    {/* <Navbar activePage={"Dashboard"}/> */}
                    <Sidebar isOpen={isOpen} onToggle={onToggle}/>
                </GridItem>

                <GridItem area={'main'}>
                    <VStack
                    align={"baseline"}
                    >
                        <Heading
                            color="brand.black"
                            textAlign="left"
                            m="1rem"
                        >
                            Your Registrations
                        </Heading>
                        <Wrap
                            m="2rem"
                            spacing="1rem"
                        >
                            {registeredTeams.map((item, index) => (
                                <SportCard key={index} image="" header={item.name} description={item.description} teamObject={item} />
                            ))}
                        </Wrap>

                        <Heading
                            color="brand.black"
                            textAlign="left"
                            m="1rem"
                        >
                            Your Classes
                        </Heading>
                        <Wrap
                            m="2rem"
                            spacing="1rem"
                        >
                            {registeredClasses.map((item, index) => (
                                <ClassCard key={index} classData={item} />
                            ))}
                        </Wrap>
                    </VStack>
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
                                Upcoming
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
    );
}

export default Dashboard;