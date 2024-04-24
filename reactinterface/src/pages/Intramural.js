import React from "react";
import ListItem from "../components/ListItem";
import SportCard from "../components/SportCard";
import { Wrap, Text, Stack, Box, Flex, Grid, GridItem, HStack, VStack, Heading, Spacer, Skeleton } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Calendar from 'react-calendar';
import {useState, useEffect} from 'react';
import moment from 'moment';
import Sidebar from "../components/Sidebar";
import '../css/calendar.css';
import axios from "axios";
import IntramuralCard from "../components/IntramuralCard";
import CreateIntramuralSportButton from "../components/permissions/CreateIntramuralSportButton";


export default function Intramurals({isOpen, onToggle}) 
{

    const [intramurals, setIntramurals] = useState([]);
    const [intramuralsLoaded, setIntramuralsLoaded] = useState(false);

    useEffect(() => {
        axios.get(
            `${process.env.REACT_APP_DJANGO_SERVER_URL}/intramurals/`
        )
        .then((response) => {
            console.log(response.data);
            setIntramurals(response.data.IntramuralSports);
            setIntramuralsLoaded(true);
        })
        .catch((error) => {
            console.log("Error getting intramural sports");
            console.log(error);
        })
      }, []);

    return (
    <div className="intramurals">
        <Grid
        templateAreas={`"header"
                        "main"`}
        gridTemplateRows={{base: `${process.env.REACT_APP_HEADER_HEIGHT} ${process.env.REACT_APP_MAIN_PAGE_HEIGHT}`}}
        // gridTemplateColumns={{base:'1fr 3fr 2fr'}} // 11em
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
                {/* <Sidebar isOpen={isOpen} onToggle={onToggle}/> */}
            </GridItem>
            <GridItem area={'main'} height={process.env.REACT_APP_MAIN_PAGE_HEIGHT} overflowY="auto">
                <HStack align={'baseline'} background={process.env.REACT_APP_PAGE_BACKGROUND}>
                    <Sidebar isOpen={isOpen} onToggle={onToggle}/>
                    <VStack
                        alignItems={"stretch"}
                        width="100%"
                    >
                        <Heading
                        color="brand.black"
                        textAlign="left"
                        m="1rem"
                        >
                            Intramural Sports
                            <CreateIntramuralSportButton />
                        </Heading>
                        {intramurals.map( (item) => {
                            // return <ListItem className={item.name} description={item.description} action={new Date(item.registration_deadline) > new Date() ? "registerOpen" : "registerClose"}/>
                            return <IntramuralCard sportData={item} />
                        })}
                        {intramuralsLoaded ?
                            <></>
                        :
                            <Box
                                className="skeleton-coffin"
                                width="100%"
                                height="100%"
                                alignSelf="center"
                            >
                                <Skeleton
                                    isLoaded={intramuralsLoaded}
                                    height="10vh"
                                    mb="1%"
                                />
                                <Skeleton // Extra Skeleton looks nice
                                    isLoaded={intramuralsLoaded}
                                    height="10vh"
                                    mb="1%"
                                />
                                <Skeleton // Extra Skeleton looks nice
                                    isLoaded={intramuralsLoaded}
                                    height="10vh"
                                    mb="1%"
                                />
                                <Skeleton // Extra Skeleton looks nice
                                    isLoaded={intramuralsLoaded}
                                    height="10vh"
                                    mb="1%"
                                />
                            </Box>
                        }
                    </VStack>
                </HStack>
            </GridItem>
        </Grid>
    </div>
    )
}