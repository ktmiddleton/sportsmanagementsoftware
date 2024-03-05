import React from 'react';
// import { Box, Button, Flex, Spacer, Text, VStack } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'
import { useNavigate, useLocation } from 'react-router-dom';
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

export default function Sidebar() {
    const [navSize, changeNavSize] = useState("large")
    return (
        <Flex
            pos="sticky"
            left="5"
            h="95vh"
            bg="brand.darkGrey"
            marginTop="1rem"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    background="none"
                    color="brand.white"
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
                <NavItem navSize={navSize} icon={TfiDashboard} title="Dashboard" description="This is the description for the dashboard." active />
                <NavItem navSize={navSize} icon={IoFitness} title="Classes" />
                <NavItem navSize={navSize} icon={FaFootballBall} title="Intramural" />
                <NavItem navSize={navSize} icon={PiBarbellFill} title="Club Sports" />
                <NavItem navSize={navSize} icon={FaClipboardList} title="Forms" />
                <NavItem navSize={navSize} icon={GrSchedules} title="Schedule" />
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
            </Flex>
        </Flex>
    )
}