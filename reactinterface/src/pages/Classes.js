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
import CreateClassButton from "../components/permissions/CreateClassButton";
import ClassCard from "../components/ClassCard";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';


export default function Classes({isOpen, onToggle, date, setDate}) 
{

    // Saved as a date object, for calendar
    // const [date, setDate] = useState(new Date())
    // const changeDate = (e) => 
    // {
    //   setDate(e) 
    // }

    const [classes, setClasses] = useState([]);
    const [classesLoaded, setClassesLoaded] = useState(false);


    useEffect(() => {
        axios.get(
            `http://localhost:8000/classes/`
        )
        .then((response) => {
            console.log(response.data)
            setClasses(response.data.Classes);
            setClassesLoaded(true);
        })
        .catch((error) => {
            console.log("Error getting classes");
            console.log(error);
        })
      }, []);

    var classesMap = "";

    classesMap = classes.map( (item) => { 
    if (new Date(item.class_time).getDate() == date.getDate()) // TODO: Want to turn this into a reuseable event button component.
        // return <ListItem className={item.name} description={item.description} action={item.registered_participants <= item.capacity ? "open" : "full"}/>
         return <ClassCard classData={item} /> 
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
                    {classesLoaded ?
                            <></>
                        :
                            <Box
                                className="skeleton-coffin"
                                width="90%"
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
                    <Box
                        h="auto"
                        w="100%"
                        >
                            {console.log(date)}
                            <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            headerToolbar={{
                                left: 'prev,next',
                                right: 'title',
                            }}
                            initialView='timeGridWeek'
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            initialEvents={classesMap} // alternatively, use the `events` setting to fetch from a feed
                            select={setDate}
                            />
                        </Box>
                    {/* <Calendar className="calendar-large" value={date} onChange={setDate}/> */}
                </Stack>
            </GridItem>
        </Grid>
    </div>
    )
}