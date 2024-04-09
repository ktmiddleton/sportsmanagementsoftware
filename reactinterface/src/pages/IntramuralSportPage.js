import { Grid, GridItem, Wrap, Heading, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import SportCard from "../components/SportCard";
import { useParams } from "react-router-dom";
import CreateClubSportButton from "../components/permissions/CreateClubSportButton";
import CreateIntramuralSportTeamButton from "../components/permissions/CreateIntramuralSportTeamButton";

function IntramuralSportPage({isOpen, onToggle}) {

    let { sportId } = useParams();

    const [casualTeamData, setCasualTeamData] = useState([]);
    const [competitiveTeamData, setCompetitiveTeamData] = useState([]);

    const [sportData, setSportData] = useState(undefined);

    useEffect(() => {
        axios.get(
            `http://localhost:8000/intramurals/teams/?sport=${sportId}`
        )
        .then((response) => {
            console.log(response.data)
            setCasualTeamData(response.data.IntramuralSportsTeams.casual_teams);
            setCompetitiveTeamData(response.data.IntramuralSportsTeams.competitive_teams);
        })
        .catch((error) => {
            console.log("Error getting intramural teams");
            console.log(error);
        })
        axios.get(
            `http://localhost:8000/intramurals/?sportId=${sportId}`
        )
        .then((response) => {
            console.log(response.data);
            setSportData(response.data.IntramuralSports);
        })
        .catch((error) => {
            console.log("Error getting intramural teams");
            console.log(error);
        })
    }, []);

    return (
        <div className="IntramuralSports">
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
                        Available {sportData ? sportData.name : <Spinner />} Teams
                        <CreateIntramuralSportTeamButton sportData={sportData}/>
                    </Heading>
                    <Wrap
                        spacing="1rem"
                        m="2rem"
                        w={"100%"}
                    >
                        {casualTeamData.map((item, index) => (
                            <SportCard key={index} image="" header={item.name} description={item.description} teamObject={item} />
                        ))}
                        {competitiveTeamData.map((item, index) => (
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