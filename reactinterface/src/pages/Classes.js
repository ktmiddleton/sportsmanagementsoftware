import React from "react";
import ListItem from "../components/ListItem";
import SportCard from "../components/SportCard";
import { Wrap, Text, Stack, Box, Flex, Grid, GridItem, HStack, VStack, Heading, Spacer } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Calendar from 'react-calendar';
import {useState, useEffect} from 'react';
import moment from 'moment';
import Sidebar from "../components/Sidebar";
import '../css/calendar.css';
import axios from "axios";
import CreateClassButton from "../components/permissions/CreateClassButton";


export default function Classes({isOpen, onToggle}) 
{


    // Saved as a date object, for calendar
    const [dateState, setDateState] = useState(new Date())
    const changeDate = (e) => 
    {
      setDateState(e) 
    }

    const [classes, setClasses] = useState([]);


    useEffect(() => {
        axios.get(
            `http://localhost:8000/classes/`
        )
        .then((response) => {
            console.log(response.data)
            setClasses(response.data.Classes);
        })
        .catch((error) => {
            console.log("Error getting classes");
            console.log(error);
        })
      }, []);

    var classesMap = "";

    classesMap = classes.map( (item) => { 
    if (new Date(item.class_time).getDate() == dateState.getDate()) // TODO: Want to turn this into a reuseable event button component.
        return <ListItem className={item.name} description={item.description} action={item.registered_participants <= item.capacity ? "open" : "full"}/> 
    return <></>
    }
    )

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
                <Sidebar isOpen={isOpen} onToggle={onToggle}/>
            </GridItem>
            <GridItem area={'main'}>
                <VStack
                 alignItems={"stretch"}
                >
                    <Heading
                    color="brand.black"
                    textAlign="left"
                    m="1rem"
                    >
                        Available Classes
                        <CreateClassButton />
                    </Heading>
                    {classesMap}
                </VStack>
            </GridItem>
            <GridItem area={'sidebar'}>
                <Stack
                bg="brand.hover.houndsGrey"
                h="100vh"
                w="100%"
                align={"center"}
                >
                    <Heading
                        color="brand.brightGreen"
                        textAlign="left"
                        m="1rem"
                    >
                        Look for a Class
                    </Heading>
                    <Calendar className="calendar-large" value={dateState} onChange={changeDate}/>
                </Stack>
            </GridItem>
        </Grid>
    </div>
    )
}