import React from "react";
import SportCard from "../components/SportCard";
import { Box, Flex, Grid, GridItem, HStack, VStack, Heading, Spacer } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Classes(props) 
{
    return (
    <div className="classes">
        <div className="header">
            <Header/>
        </div>
        <Flex
            direction="row"
        >
            <div className="navigation">
                    <Sidebar activePage={'Classes'}/>
            </div>
            <Grid
                templateColumns={{base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)"}}
            >
                <div className="cardGrid">
                    <Grid
                        m="1rem"
                        gap="2rem"
                        templateColumns='repeat(2, 1fr)'
                    >
                        <GridItem>
                            <SportCard image="" header="Zumba" description="Join to get lit!" />
                        </GridItem>
                        <GridItem>
                            <SportCard image="" header="Cycling" description="Learn how to cycle!" />
                        </GridItem>
                        <GridItem>
                            <SportCard image="" header="Dance" description="Basics of dance are taught" />
                        </GridItem>
                        <GridItem>
                            <SportCard image="" header="Singing" description="Work on your voice!" />
                        </GridItem>
                    </Grid>
                </div>
                <div className="searchZone">
                    <Grid
                        bg="brand.hover.houndsGrey"
                        minHeight="100vh"
                        m="1rem"
                    >
                        <Heading
                            color="brand.brightGreen"
                            textAlign="left"
                            m="1rem"
                        >
                            Look for a Class
                        </Heading>
                    </Grid>
                </div>
            </Grid>
        </Flex>
    </div>
    )
}