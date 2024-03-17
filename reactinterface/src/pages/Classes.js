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
                        "nav main sidebar"`}
        gridTemplateRows={{base: '150px 100vh'}}
        gridTemplateColumns={{base:'{{sm: "100px", md: "200px", lg: "250px"}} 3fr 2fr'}}
        gap='0'
        color='blackAlpha.700'
        fontWeight='bold'
        >
            <GridItem area={'header'}>
                <Header/>
            </GridItem>
            <GridItem area={'nav'}>
                <Navbar activePage={"Classes"}/>
            </GridItem>
            <GridItem area={'main'}>
                <VStack
                 w="70vw"
                 alignItems={"stretch"}
                >
                    <Heading
                    textAlign={"left"}
                    >Available Classes</Heading>
                    <ListItem className="Dancing!" description="come dance the night away!" action="full"/>
                    <ListItem className="Singing" description="Here, we will sing to our heart's content!" action="open"/>
                    <ListItem className="Lifting" description="Lift heavy thing, eat protein, flex muscle for lady" action="waitlist"/>
                </VStack>
            </GridItem>
            <GridItem area={'sidebar'}>
                <Grid
                bg="brand.hover.houndsGrey"
                h="100vh"
                w="25vw"
                >
                    <Heading
                        color="brand.brightGreen"
                        textAlign="left"
                        m="1rem"
                    >
                        Look for a Class
                    </Heading>
                </Grid>
            </GridItem>
        </Grid>
    </div>
    )
}