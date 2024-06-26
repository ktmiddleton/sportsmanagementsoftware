import React from "react";
import ListItem from "../components/ListItem";
import SportCard from "../components/SportCard";
import { IconButton, Button, Wrap, Text, Stack, Box, Flex, Grid, GridItem, HStack, VStack, Heading, Spacer, Skeleton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Calendar from 'react-calendar';
import {useState, useEffect} from 'react';
import moment from 'moment';
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import '../css/calendar.css';
import axios from "axios";
import CreateClassButton from "../components/permissions/CreateClassButton";
import ClassCard from "../components/ClassCard";
import '../css/calendar.css'
import { useUser } from "../components/UserContext";


export default function Classes({isOpen, onToggle})
{
    const { user, loadUserData, userHasGroup, userHasPerm } = useUser();
    
    const [classesLoaded, setClassesLoaded] = useState(false);

    const [pageNumber, setPageNumber] = useState(1);
    const [pageData, setPageData] = useState();
    const [classes, setClasses] = useState([]);

    function incrementPage() {
        if (!(pageData.end_index >= pageData.count)) {
            setPageNumber(pageNumber + 1);
        }
    }

    function decrementPage() {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    }

    useEffect(() => {
        axios.get(
            `${process.env.REACT_APP_DJANGO_SERVER_URL}/classes/`
        )
        .then((response) => {
            console.log(response.data)
            setClasses(response.data.classes);
            setPageData(response.data.pages);
            setClassesLoaded(true);
        })
        .catch((error) => {
            console.log("Error getting classes");
            console.log(error);
        })
      }, [user]);

      console.log("Here's the classes:" + classes);

    return (
    <div className="classes">
        <Grid
        templateAreas={`"header"
                        "main"`}
        gridTemplateRows={{base: `${process.env.REACT_APP_HEADER_HEIGHT} ${process.env.REACT_APP_MAIN_PAGE_HEIGHT}`}}
        // gridTemplateColumns={{base:'1fr 5fr'}} // 11em
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
                            Available Classes
                            <CreateClassButton />
                            <SearchBar mode="server" endpoint={`classes/?`} setFilteredData={setClasses} setPageData={setPageData} page={pageNumber} modelType="classes"/>
                        </Heading>
                        {classes?.map( (item) => { 
                        return <ClassCard classData={item} /> 
                        })}
                        {classesLoaded ?
                                <></>
                            :
                                <Box
                                    className="skeleton-coffin"
                                    width="100%"
                                    height="100%"
                                    alignSelf="center"
                                >
                                    <Skeleton
                                        isLoaded={classesLoaded}
                                        height="10vh"
                                        mb="1%"
                                    />
                                    <Skeleton // Extra Skeleton looks nice
                                        isLoaded={classesLoaded}
                                        height="10vh"
                                        mb="1%"
                                    />
                                    <Skeleton // Extra Skeleton looks nice
                                        isLoaded={classesLoaded}
                                        height="10vh"
                                        mb="1%"
                                    />
                                    <Skeleton // Extra Skeleton looks nice
                                        isLoaded={classesLoaded}
                                        height="10vh"
                                        mb="1%"
                                    />
                                </Box>
                            }
                        <Spacer/>
                        <HStack>
                            <IconButton
                                m="1rem"
                                aria-label="Previous Page"
                                icon={<ChevronLeftIcon />}
                                isRound={true}
                                size="lg"
                                bg="gray.300"
                                onClick={() => decrementPage()} // Define your click event handler
                            />
                            {pageData ? <Text>Showing {pageData.start_index}-{pageData.end_index} of {pageData.count}</Text> : <></>}
                            <IconButton
                                m="1rem"
                                aria-label="Next Page"
                                icon={<ChevronRightIcon />}
                                isRound={true}
                                size="lg"
                                bg="gray.300"
                                onClick={() => incrementPage()} // Define your click event handler
                            />
                        </HStack>
                    </VStack>
                </HStack>
            </GridItem>
            {/* <GridItem area={'sidebar'}>
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
                    <Box
                    h="auto"
                    w="100%"
                    >
                        <Calendar className="calendar-large" value={date} onChange={setDate}/>
                    </Box>
                </Stack>
            </GridItem> */}
        </Grid>
    </div>
    )
}