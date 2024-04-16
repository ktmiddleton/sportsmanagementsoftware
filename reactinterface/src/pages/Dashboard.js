import React, { useEffect, useState } from "react";
import SportCard from "../components/SportCard";
import { Wrap, Box, Flex, Grid, GridItem, HStack, VStack, Heading, Spacer, Skeleton } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import ClassCard from "../components/ClassCard";
import FormCard from "../components/FormCard";
import { useUser } from "../components/UserContext";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import { formatDate } from '@fullcalendar/core';

function Dashboard({isOpen, onToggle, date, setDate}) {
    // Whether data is loaded for placeholders
    const [clubSportsLoaded, setClubSportsLoaded] = useState(false);
    const [intramuralTeamsLoaded, setIntramuralTeamsLoaded] = useState(false);
    const [classesLoaded, setClassesLoaded] = useState(false);
    const [formsLoaded, setFormsLoaded] = useState(false);

    // Actual Data
    const [registeredClasses, setRegisteredClasses] = useState([]);
    const [registeredTeams, setRegisteredTeams] = useState([]);
    const [registeredForms, setRegisteredForms] = useState([]);
    

    useEffect(() => {
        setRegisteredTeams([])
        axios.get( // Get Club Sports
            `http://localhost:8000/clubsports/userteams/?username=${localStorage.getItem("username")}`
        )
        .then((response) => {
            setRegisteredTeams((prevTeams) => [...prevTeams, ...response.data]);
            setClubSportsLoaded(true);
        })
        .catch((error) => {
            console.log("Error getting users Club Sports");
            console.log(error);
        });

        axios.get( // Get Intramural Sports
            `http://localhost:8000/intramurals/userteams/?username=${localStorage.getItem("username")}`
        )
        .then((response) => {
            setRegisteredTeams((prevTeams) => [...prevTeams, ...response.data]);
            setIntramuralTeamsLoaded(true);
        })
        .catch((error) => {
            console.log("Error getting users Intramural Sports");
            console.log(error);
        });

        axios.get( // Get Classes
            `http://localhost:8000/classes/userclasses/?username=${localStorage.getItem("username")}`
        )
        .then((response) => {
            setRegisteredClasses(response.data);
            setClassesLoaded(true);
        })
        .catch((error) => {
            console.log("Error getting users Classes");
            console.log(error);
        });
        axios.get( // Get Forms
            `http://localhost:8000/forms/?username=${localStorage.getItem("username")}&token=${localStorage.getItem("token")}`
        )
        .then((response) => {
            setRegisteredForms(response.data.forms);
            setFormsLoaded(true);
        })
        .catch((error) => {
            console.log("Error getting users Forms");
            console.log(error);
        });
    }, []);


    return (
        <div className="dashboard">
            <Grid
                templateAreas={`"header header header"
                                "nav main sidebar"`}
                gridTemplateRows={{base: '10vh 90vh'}}
                gridTemplateColumns={{base:'1fr 3fr 2fr'}}
                gap='0'
                color='blackAlpha.700'
                fontWeight='bold'
                overflowX="hidden"
            >
                <GridItem area={'header'}>
                    <Header buttons={true}/>
                </GridItem>

                <GridItem area={'nav'}>
                    {/* <Navbar activePage={"Dashboard"}/> */}
                    <Sidebar isOpen={isOpen} onToggle={onToggle}/>
                </GridItem>

                <GridItem area={'main'}>
                    <VStack
                        align={"baseline"}
                    >
                        <Heading
                            color="brand.black"
                            textAlign="left"
                            m="1rem"
                        >
                            Your Teams
                        </Heading>
                        <Wrap
                            m="2rem"
                            spacing="1rem"
                        >
                            {registeredTeams.map((item, index) => (
                                <SportCard key={index} image="" header={item.name} description={item.description} teamObject={item} />
                            ))}
                        </Wrap>
                        {clubSportsLoaded ?
                            <></>
                        :
                            <Box
                                className="skeleton-coffin"
                                width="90%"
                                height="100%"
                                alignSelf="center"
                            >
                                <Skeleton
                                    isLoaded={clubSportsLoaded}
                                    height="20vh"
                                    mb="1%"
                                />
                            </Box>
                        }
                        <Heading
                            color="brand.black"
                            textAlign="left"
                            m="1rem"
                        >
                            Your Classes
                        </Heading>
                        <Wrap
                            m="2rem"
                            spacing="1rem"
                        >
                            {registeredClasses.map((item, index) => (
                                <ClassCard key={index} classData={item} />
                            ))}
                        </Wrap>
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

                <GridItem area={"sidebar"}>
                    <VStack
                        align={"baseline"}
                        bg="brand.houndsGrey"
                        h="100vh"
                    >
                        <Heading
                            color="brand.brightGreen"
                            textAlign="left"
                            m="1rem"
                        >
                            Upcoming
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
                            initialEvents={registeredClasses} // alternatively, use the `events` setting to fetch from a feed
                            select={setDate}
                            />
                        </Box>
                        <Heading
                            color="brand.brightGreen"
                            textAlign="left"
                            m="1rem"
                        >
                            TODO
                        </Heading>
                        <Wrap
                        m="2rem"
                        spacing="1rem"
                        >
                            {registeredForms.map((item, index) => (
                                <FormCard key={index} formData={item}/>
                            ))}
                        </Wrap>
                    </VStack>
                </GridItem>
            </Grid>
        </div>
    );
}

export default Dashboard;