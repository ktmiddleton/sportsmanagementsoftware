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
import FormCard from "../components/FormCard";
import CreateIntramuralSportButton from "../components/permissions/CreateIntramuralSportButton";
import CreateFormButton from "../components/permissions/CreateFormButton";
import { useUser } from "../components/UserContext";
import FormInfoCard from "../components/FormInfoCard";

const VIEW_FORM_INFO_TEMPLATE_PERM = "can_read_forms";

export default function Forms({isOpen, onToggle}) 
{

    const [forms, setForms] = useState([]);

    const [formInfo, setFormInfo] = useState([]);
    const [formsLoaded, setFormsLoaded] = useState(false);

    const { user, loadUserData, userHasGroup, userHasPerm } = useUser();

    useEffect(() => {
        axios.get(
            `http://localhost:8000/forms/?token=${localStorage.getItem("token")}&username=${localStorage.getItem("username")}`
        )
        .then((response) => {
            console.log(response.data);
            setForms(response.data.forms);
            setFormsLoaded(true);
        })
        .catch((error) => {
            console.log("Error getting user forms");
            console.log(error);
        })
        console.log(user)
        if (userHasPerm("can_create_forms")) {
            axios.get(
                `http://localhost:8000/forms/?token=${localStorage.getItem("token")}&info=1`
            )
            .then((response) => {
                console.log(response.data);
                setFormInfo(response.data.forms);
            })
            .catch((error) => {
                console.log("Error getting info forms");
                console.log(error);
            })
        }
    }, [user]);

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
                            My Forms
                            <CreateFormButton />
                        </Heading>
                        {forms.map( (item) => {
                            return <FormCard formData={item} />
                        })}
                        {formsLoaded ?
                            <></>
                        :
                            <Box
                                className="skeleton-coffin"
                                width="100%"
                                height="100%"
                                alignSelf="center"
                            >
                                <Skeleton
                                    isLoaded={formsLoaded}
                                    height="10vh"
                                    mb="1%"
                                />
                                <Skeleton // Extra Skeleton looks nice
                                    isLoaded={formsLoaded}
                                    height="10vh"
                                    mb="1%"
                                />
                                <Skeleton // Extra Skeleton looks nice
                                    isLoaded={formsLoaded}
                                    height="10vh"
                                    mb="1%"
                                />
                                <Skeleton // Extra Skeleton looks nice
                                    isLoaded={formsLoaded}
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