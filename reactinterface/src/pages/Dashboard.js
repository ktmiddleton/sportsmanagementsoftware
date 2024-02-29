import React from "react";
import SportCard from "../SportCard";
import { Box, Flex, Grid, GridItem, Heading, Spacer } from "@chakra-ui/react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

function Dashboard(props) {
    return (
        <div className="dashboard">
            <Navbar />
            <Flex
                direction="row"
            >
                <div className='Sidebar hide-for-small-only'>
                    <Sidebar />
                </div> {/* Put all of page below */}
                <Grid
                    templateColumns={{base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)"}}
                >
                    <div className="cardGrid">
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
                    <div className="importantBar">
                        <Grid
                            bg="brand.hover.houndsGrey"
                            minHeight="100vh"
                            m="1rem"
                        >
                            <Heading
                                color="brand.brightGreen"
                                textAlign="left"
                                m="1rem"
                            >
                                Upcoming
                            </Heading>
                            <Heading
                                color="brand.brightGreen"
                                textAlign="left"
                                m="1rem"
                            >
                                TODO
                            </Heading>
                        </Grid>
                    </div>
                </Grid>
            </Flex>
        </div>
    );
}

export default Dashboard;