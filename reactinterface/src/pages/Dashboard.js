import React from "react";
import SportCard from "../components/SportCard";
import { Wrap, Box, Flex, Grid, GridItem, HStack, VStack, Heading, Spacer } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Dashboard(props) {
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
            >
                <GridItem area={'header'}>
                    <Header/>
                </GridItem>

                <GridItem area={'nav'}>
                    {/* <Navbar activePage={"Dashboard"}/> */}
                    <Sidebar />
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
                            <SportCard image="" header="Basketball" description="Club Basketball team" />
                            <SportCard image="" header="Baseball" description="Club Baseball team" />
                            <SportCard image="" header="Esports" description="Club Esports team" />
                            <SportCard image="" header="Rugby" description="Club Rugby team" />
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