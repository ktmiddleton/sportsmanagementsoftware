import React from "react";
import ListItem from "../components/ListItem";
import SportCard from "../components/SportCard";
import { Wrap, Text, Stack, Box, Flex, Grid, GridItem, HStack, VStack, Heading, Spacer } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Calendar from 'react-calendar';
import {useState} from 'react';
import moment from 'moment';
import Sidebar from "../components/Sidebar";
import '../css/calendar.css';
import axios from "axios";


export default function Intramurals({isOpen, onToggle}) 
{

    // const [classes, setClasses] = useState([]);

    // axios.get(
    //     `http://localhost:8000/classes/`
    // )
    // .then((response) => {
    //     setClasses(response.data.Classes);
    // })
    // .catch((error) => {
    //     console.log("Error getting classes");
    //     console.log(error);
    // })

    // var classesMap = "";

    // classesMap = classes.map( (item) => 
    //     <ListItem className={item.name} description={item.description} action="full" capacity={item.capacity} registeredParticipants={item.registeredParticipants}/>
    // )

    return (
    <div className="intramurals">
        <Grid
        templateAreas={`"header header header"
                        "nav main main"`}
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
                    textAlign={"left"}
                    >Available Classes
                    </Heading>
                    <ListItem action="registerRequest"/>
                    {/* {classesMap} */}
                </VStack>
            </GridItem>
        </Grid>
    </div>
    )
}