import React from 'react';
import { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
    Button,
    Spacer,
    
} from '@chakra-ui/react'

import NavItem from './NavItem';

// Icon Imports (in order): Dashboard, Fitness Classes, Intramural Sports, Club Sports, Forms, Schedule
import { FiMenu } from 'react-icons/fi';
import { TfiDashboard } from "react-icons/tfi";
import { IoFitness } from "react-icons/io5";
import { FaFootballBall } from "react-icons/fa";
import { PiBarbellFill } from "react-icons/pi";
import { FaClipboardList } from "react-icons/fa";
import { GrSchedules } from "react-icons/gr";

export default function Navbar({activePage}) {
    const [navSize, changeNavSize] = useState("large")

    function checkWhichActive() 
    {
        var activeDisplay = ['False', 'False', 'False', 'False', 'False', 'False'];
        switch (activePage) 
        {
            case 'Dashboard':
                activeDisplay[0] = 'True';
                break;
            case 'Classes':
                activeDisplay[1] = 'True';
                break;
            case 'Intramural':
                activeDisplay[2] = 'True';
                break;
            case 'Clubsports':
                activeDisplay[3] = 'True';
                break;
            case 'Forms':
                activeDisplay[4] = 'True';
                break;
            case 'Schedule':
                activeDisplay[5] = 'True';
        }
        return activeDisplay;
    }
    
    return (
        <Flex
            pos="sticky"
            left="5"
            h="100vh"
            bg="brand.darkGrey"
            // marginTop="1rem"
            // boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            // borderRadius={navSize == "small" ? "15px" : "30px"}
            // w={navSize == "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                // p="5%"
                flexDir="column"
                // w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    background="none"
                    color="brand.white"
                    boxSize={9}
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                />
                <NavItem navSize={navSize} icon={TfiDashboard} title="Dashboard" active={checkWhichActive()[0]} navigationSuffix="/"/>
                <NavItem navSize={navSize} icon={IoFitness} title="Classes" active={checkWhichActive()[1]} navigationSuffix="/classes"/>
                <NavItem navSize={navSize} icon={FaFootballBall} title="Intramural" active={checkWhichActive()[2]} navigationSuffix="/intramural"/>
                <NavItem navSize={navSize} icon={PiBarbellFill} title="Club Sports" active={checkWhichActive()[3]} navigationSuffix="/clubsports"/>
                <NavItem navSize={navSize} icon={FaClipboardList} title="Forms" active={checkWhichActive()[4]} navigationSuffix="/forms"/>
                <NavItem navSize={navSize} icon={GrSchedules} title="Schedule" active={checkWhichActive()[5]} navigationSuffix="/schedule"/>
            </Flex>

            <Flex
                // p="5%"
                flexDir="column"
                // w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                // mb={4}
            >
            </Flex>
        </Flex>
    )
}