import React from "react";
import SportCard from "../SportCard";
import { Grid, GridItem } from "@chakra-ui/react";

function Dashboard(props) {
    return (
        <div className="dashboard">
            <Grid
                m="1rem"
                gap="2rem"
                templateColumns='repeat(2, 1fr)'
            >
                <GridItem>
                    <SportCard image="" header="Basketball" description="Club Basketball team" />
                </GridItem>
                <GridItem>
                    <SportCard image="" header="Baseball" description="Club Baseball team" />
                </GridItem>
                <GridItem>
                    <SportCard image="" header="Esports" description="Club Esports team" />
                </GridItem>
                <GridItem>
                    <SportCard image="" header="Rugby" description="Club Rugby team" />
                </GridItem>
            </Grid>
        </div>
    );
}

export default Dashboard;