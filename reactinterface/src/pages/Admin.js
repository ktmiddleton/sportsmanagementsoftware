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
import UserList from '../components/permissions/UserList';


export default function Admin({isOpen, onToggle}) 
{

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        axios.get(
            `http://localhost:8000/user/allusers/?token=${localStorage.getItem("token")}`
        )
        .then((response) => {
            setUserList(response.data.userList);
        })
        .catch((error) => {
            console.log("Error getting classes");
            console.log(error);
        })
      }, []);

    var userMap = "";

    userMap = userList.map( (item) => 
        <UserList username={item.username} email={item.email}/>
    )

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
                    >Intramural Teams
                    </Heading>
                    {userMap}
                </VStack>
            </GridItem>
        </Grid>
    </div>
    )
}