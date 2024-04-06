import { Grid, GridItem, Wrap, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import SportCard from "../components/SportCard";
import CreateClubSportButton from "../components/permissions/CreateClubSportButton";

function IntramuralSportPage({isOpen, onToggle}) {

    const [sportData, setSportData] = useState([]);

    useEffect(() => {
        axios.get(
            `http://localhost:8000/intramurals/teams/?sport=${sportData.id}`
        )
        .then((response) => {
            console.log(response.data)
            setSportData(response.data.ClubSportsTeams);
        })
        .catch((error) => {
            console.log("Error getting intramural teams");
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
                    <Heading
                        color="brand.black"
                        textAlign="left"
                        m="1rem"
                    >
                        Available Club Sports
                        <CreateClubSportButton />
                    </Heading>
                    <Wrap
                        spacing="1rem"
                        m="2rem"
                        w={"100%"}
                    >
                        {clubSports.map((item, index) => (
                            <SportCard key={index} image="" header={item.name} description={item.description} teamObject={item} />
                        ))}
                    </Wrap>
                </GridItem>

                <GridItem area={"sidebar"}>
                        
                </GridItem>
            </Grid>
        </div>
    )
}

export default IntramuralSportPage;