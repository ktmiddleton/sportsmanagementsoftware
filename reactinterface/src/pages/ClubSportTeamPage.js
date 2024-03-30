import { Grid, GridItem, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";

function ClubSportTeamPage({isOpen, onToggle}) {

    let { teamId } = useParams()

    const [teamData, setTeamData] = useState(undefined);

    useEffect(() => {
        console.log("plonk")
        axios.get(
            `http://localhost:8000/clubsports/?teamId=${teamId}`
        )
        .then((response) => {
            setTeamData(response.data);
            console.log(response.data)
        })
        .catch((error) => {
            console.log("Error getting Club Sport team");
            console.log(error);
        })
    }, []);

    return (
        <div className="ClubSports">
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
                    <Sidebar isOpen={isOpen} onToggle={onToggle}/>
                </GridItem>

                <GridItem area={'main'}>
                    <Grid
                        templateColumns={{base: '1fr 1fr 1fr 1fr'}}
                        gap="1rem"
                        p="1rem"
                    >
                        
                    </Grid>
                </GridItem>

                <GridItem area={"sidebar"}>
                    <Grid
                        bg="brand.hover.houndsGrey"
                        h="100vh"
                        w="100%"
                    >
                        <Heading
                            color="brand.brightGreen"
                            textAlign="left"
                            m="1rem"
                        >
                            Matches
                        </Heading>
                        <Heading
                            color="brand.brightGreen"
                            textAlign="left"
                            m="1rem"
                        >
                            TODO
                        </Heading>
                    </Grid>
                </GridItem>
            </Grid>
        </div>
    )
}

export default ClubSportTeamPage;