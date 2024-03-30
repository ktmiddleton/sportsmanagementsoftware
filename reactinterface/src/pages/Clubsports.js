import { Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import SportCard from "../components/SportCard";

function ClubSports({isOpen, onToggle}) {

    const [clubSports, setClubSports] = useState([]);

    useEffect(() => {
        axios.get(
            `http://localhost:8000/clubsports/`
        )
        .then((response) => {
            setClubSports(response.data.ClubSportsTeams);
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
                        {clubSports.map((item, index) => (
                            <SportCard key={index} image="" header={item.name} description={item.description} teamObject={item} />
                        ))}
                    </Grid>
                </GridItem>

                <GridItem area={"sidebar"}>
                        
                </GridItem>
            </Grid>
        </div>
    )
}

export default ClubSports;