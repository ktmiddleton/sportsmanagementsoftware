import { Grid, GridItem, Wrap, Heading, Skeleton, VStack } from "@chakra-ui/react";
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
            `http://localhost:8000/clubsports/`
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
            templateAreas={`"header header header"
                            "nav main main"`}
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
                            Available Club Sports
                            <CreateClubSportButton />
                        </Heading>
                        <Skeleton
                            isLoaded={clubSportsLoaded}
                            width="90%"
                            height="20vh"
                            alignSelf="center"
                        >
                            <Wrap
                                spacing="1rem"
                                m="2rem"
                                w={"100%"}
                            >
                                {clubSports.map((item, index) => (
                                    <SportCard key={index} image="" header={item.name} description={item.description} teamObject={item} />
                                ))}
                            </Wrap>
                        </Skeleton>
                        <Skeleton // Extra Skeleton looks nice
                            isLoaded={clubSportsLoaded}
                            width="90%"
                            height="20vh"
                            alignSelf="center"
                        />
                        <Skeleton // Extra Skeleton looks nice
                            isLoaded={clubSportsLoaded}
                            width="90%"
                            height="20vh"
                            alignSelf="center"
                        />
                    </VStack>
                </GridItem>

                <GridItem area={"sidebar"}>
                        
                </GridItem>
            </Grid>
        </div>
    )
}

export default ClubSports;