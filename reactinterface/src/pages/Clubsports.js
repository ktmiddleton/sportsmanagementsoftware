import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function ClubSports({isOpen, onToggle}) {
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
                    
                </GridItem>

                <GridItem area={"sidebar"}>
                        
                </GridItem>
            </Grid>
        </div>
    )
}

export default ClubSports;