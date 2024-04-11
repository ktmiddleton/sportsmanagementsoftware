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
import FormCard from "../components/FormCard";
import CreateIntramuralSportButton from "../components/permissions/CreateIntramuralSportButton";


export default function Forms({isOpen, onToggle}) 
{

    const [forms, setForms] = useState([]);

    useEffect(() => {
        axios.get(
            `http://localhost:8000/forms/?token=${localStorage.getItem("token")}&username=${localStorage.getItem("username")}`
        )
        .then((response) => {
            console.log(response.data);
            setForms(response.data.forms);
        })
        .catch((error) => {
            console.log("Error getting user forms");
            console.log(error);
        })
      }, []);

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
                    color="brand.black"
                    textAlign="left"
                    m="1rem"
                    >
                        My Forms
                        {/* <CreateIntramuralSportButton /> */}
                    </Heading>
                    {forms.map( (item) => {
                        // return <ListItem className={item.name} description={item.description} action={new Date(item.registration_deadline) > new Date() ? "registerOpen" : "registerClose"}/>
                        return <FormCard formData={item} />
                    })}
                </VStack>
            </GridItem>
        </Grid>
    </div>
    )
}