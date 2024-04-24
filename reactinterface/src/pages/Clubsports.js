import { HStack, Grid, GridItem, Wrap, Heading, Skeleton, VStack, Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import SportCard from "../components/SportCard";
import CreateClubSportButton from "../components/permissions/CreateClubSportButton";

function ClubSports({isOpen, onToggle}) {

    const [clubSports, setClubSports] = useState([]);
    const [clubSportsLoaded, setClubSportsLoaded] = useState(false);

    useEffect(() => {
        axios.get(
            `${process.env.REACT_APP_DJANGO_SERVER_URL}/clubsports/`
        )
        .then((response) => {
            setClubSports(response.data.ClubSportsTeams);
            setClubSportsLoaded(true);
        })
        .catch((error) => {
            console.log("Error getting Club Sports");
            console.log(error);
        })
    }, []);

    return (
        <div className="ClubSports">
            <Grid
            templateAreas={`"header"
                            "main"`}
            gridTemplateRows={{base: `${process.env.REACT_APP_HEADER_HEIGHT} ${process.env.REACT_APP_MAIN_PAGE_HEIGHT}`}}
            // gridTemplateColumns={{base:'1fr 3fr 2fr'}}
            gap='0'
            color='blackAlpha.700'
            fontWeight='bold'
            overflowX="hidden"
            >
                <GridItem area={'header'}>
                    <Header buttons={true}/>
                </GridItem>

                <GridItem area={'nav'}>
                    {/* <Sidebar isOpen={isOpen} onToggle={onToggle}/> */}
                </GridItem>

                <GridItem area={'main'} height={process.env.REACT_APP_MAIN_PAGE_HEIGHT} overflowY="auto">
                    <HStack align={'baseline'} background={process.env.REACT_APP_PAGE_BACKGROUND}>
                        <Sidebar isOpen={isOpen} onToggle={onToggle}/>
                        <VStack
                            align={"baseline"}
                            width="100%"
                        >
                            <Heading
                                color="brand.black"
                                textAlign="left"
                                m="1rem"
                            >
                                Available Club Sports
                                <CreateClubSportButton />
                            </Heading>
                            <Wrap
                                padding="2rem"
                                spacing="1rem"
                                m="2rem"
                                w="100%"
                            >
                                {clubSports.map((item, index) => (
                                    <SportCard
                                        key={index}
                                        width={"350px"}
                                        image=""
                                        header={item.name}
                                        description={item.description}
                                        teamObject={item}
                                    />
                                ))}
                            </Wrap>
                            {clubSportsLoaded ?
                                <></>
                            :
                                <Box
                                    className="skeleton-coffin"
                                    width="100%"
                                    height="100%"
                                    alignSelf="center"
                                >
                                    <Skeleton
                                        isLoaded={clubSportsLoaded}
                                        height="20vh"
                                        mb="1%"
                                    />
                                    <Skeleton
                                        isLoaded={clubSportsLoaded}
                                        height="20vh"
                                        mb="1%"
                                    />
                                </Box>
                            }
                        </VStack>
                    </HStack>
                </GridItem>

                <GridItem area={"sidebar"}>
                        
                </GridItem>
            </Grid>
        </div>
    )
}

export default ClubSports;