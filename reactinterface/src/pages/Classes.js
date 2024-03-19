import React from "react";
import ListItem from "../components/ListItem";
import SportCard from "../components/SportCard";
import { Text, Stack, Box, Flex, Grid, GridItem, HStack, VStack, Heading, Spacer } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Calendar from 'react-calendar';
import {useState} from 'react';
import moment from 'moment';
import Sidebar from "../components/Sidebar";

export default function Classes(props) 
{

    const [dateState, setDateState] = useState(new Date())
    const changeDate = (e) => 
    {
      setDateState(e) 
    }

    return (
    <div className="classes">
        <Grid
        templateAreas={`"header header header"
                        "nav main sidebar"`}
        gridTemplateRows={{base: '10vh 90vh'}}
        gridTemplateColumns={{base:'1fr 3fr 2fr'}} // 11em
        gap='0'
        color='blackAlpha.700'
        fontWeight='bold'
        overflowX="hidden"
        >
            <GridItem area={'header'}>
                <Header buttons={true}/>
            </GridItem>
            <GridItem area={'nav'}>
                {/* <Navbar activePage={"Classes"}/> */}
                <Sidebar />
            </GridItem>
            <GridItem area={'main'}>
                <VStack
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
                <Stack
                bg="brand.hover.houndsGrey"
                h="100vh"
                w="100%"
                >
                    <Heading
                        color="brand.brightGreen"
                        textAlign="left"
                        m="1rem"
                    >
                        Look for a Class
                    </Heading>
                    <Calendar value={dateState} onChange={changeDate}/>
                    <Text>{moment(dateState).format('MMMM Do YYYY')}</Text>
                </Stack>
            </GridItem>
        </Grid>
    </div>
    )
}