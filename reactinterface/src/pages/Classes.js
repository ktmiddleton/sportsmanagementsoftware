import React from "react";
import ListItem from "../components/ListItem";
import SportCard from "../components/SportCard";
import { Box, Flex, Grid, GridItem, HStack, VStack, Heading, Spacer } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

export default function Classes(props) 
{
    return (
    <div className="classes">
        <Grid
        templateAreas={`"header header header"
                        "nav main sidebar"
                        "nav main sidebar"`}
        gridTemplateRows={{base: '150px 1fr 150px'}}
        gridTemplateColumns={{base:'.25fr 3fr 2fr'}}
        h='100vh'
        gap='0'
        color='blackAlpha.700'
        fontWeight='bold'
        overflow="hidden"
        >
            <GridItem area={'header'}>
                <Header/>
            </GridItem>
            <GridItem area={'nav'}>
                <Navbar activePage={"Classes"}/>
            </GridItem>
            <GridItem area={'main'}>
                <VStack
                 alignItems={"stretch"}
                >
                    <Heading>Available Classes</Heading>
                    <ListItem className="Dancing!" description="come dance the night away!" action="full"/>
                    <ListItem className="Singing" description="Here, we will sing to our heart's content!" action="open"/>
                    <ListItem className="Lifting" description="Lift heavy thing, eat protein, flex muscle for lady" action="waitlist"/>
                </VStack>
            </GridItem>
            <GridItem bg="brand.houndsGrey" area={'sidebar'}>
                <Heading
                    color="brand.brightGreen"
                    textAlign="center"
                >
                    Look for a Class
                </Heading>
            </GridItem>
        </Grid>
    </div>
    )
}