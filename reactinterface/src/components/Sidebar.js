import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Icon, IconButton, Text, VStack, background, useDisclosure } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { TfiDashboard } from "react-icons/tfi";
import { IoFitness } from "react-icons/io5";
import { FaFootballBall } from "react-icons/fa";
import { PiBarbellFill } from "react-icons/pi";
import { FaClipboardList } from "react-icons/fa";
import { GrSchedules } from "react-icons/gr";
import { FiMenu } from 'react-icons/fi';

const MotionBox = motion(Box);

function Sidebar({isOpen, onToggle}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [innerBoxHeight, setInnerBoxHeight] = useState(process.env.REACT_APP_MAIN_PAGE_HEIGHT);

    function handleNavigate(path) {
        return () => navigate(path);
    }
    
    function whichButtonVariant(route) {
        if (location.pathname === route) {
            return "activeSidebar"
        } else {
            return "sidebar"
        }
    }

    function handleToggle () 
    {
        onToggle();
    }

    useEffect(() => {
        const updateInnerBoxHeight = () => {
            var body = document.body,
            html = document.documentElement;

            // TODO: NEED TO EXTEND SIDEBAR TO BOTTOM OF PAGE
            var height = Math.max( body.scrollHeight, body.offsetHeight, 
                                    html.clientHeight, html.scrollHeight, html.offsetHeight );
            setInnerBoxHeight(height);
        };

        window.addEventListener('resize', updateInnerBoxHeight);
        updateInnerBoxHeight();
    }, [])

    return (
        <AnimatePresence>
            <MotionBox
                width={isOpen ? "15rem" : "5rem"}
                animate={{ width: (isOpen ? "15rem" : "5rem") }}
                transition={{ duration: 0.5, type: "spring" }}
                position="sticky"
                top="0vh"
                // left="0vh"
                // mr="20px"
            >
                <Box // Sidebar background
                    as="aside"
                    w={{ base: "100%" }}
                    bg="brand.darkGrey"
                    h={process.env.REACT_APP_MAIN_PAGE_HEIGHT}//{innerBoxHeight}
                    // p="3px"
                >
                    <VStack align="flex-start" spacing="0px">
                        {/* Sidebar content here */}
                        <IconButton
                            background="none"
                            color="brand.white"
                            boxSize={"6rem"}
                            icon={<FiMenu size={"2rem"} />}
                            borderRadius="0px"
                            _hover={{
                                background: "none"
                            }}
                            // _focus={{
                            //     border: "2px solid white",
                            // }}
                            onClick={() => handleToggle()}
                        />
                        <Button
                            onClick={handleNavigate("/")}
                            variant={whichButtonVariant("/")}
                            aria-label='Open Dashboard'
                            justifyContent={"flex-start"}
                            overflow={"hidden"}
                        >
                            <Icon as={TfiDashboard} boxSize={"2rem"} color={"brand.white"} mr={"1.5rem"} ml={"0.5rem"} />
                            Dashboard
                        </Button>
                        <Button
                            onClick={handleNavigate("/classes")}
                            variant={whichButtonVariant("/classes")}
                            aria-label='Open Classes'
                            justifyContent={"flex-start"}
                            overflow={"hidden"}
                        >
                            <Icon as={IoFitness} boxSize={"2rem"} color={"brand.white"} mr={"1.5rem"} ml={"0.5rem"} />
                            Classes
                        </Button>
                        <Button
                            onClick={handleNavigate("/intramural")}
                            variant={whichButtonVariant("/intramural")}
                            aria-label='Open Intramural Sports'
                            justifyContent={"flex-start"}
                            overflow={"hidden"}
                        >
                            <Icon as={FaFootballBall} boxSize={"2rem"} color={"brand.white"} mr={"1.5rem"} ml={"0.5rem"} />
                            Intramural
                        </Button>
                        <Button
                            onClick={handleNavigate("/clubsports")}
                            variant={whichButtonVariant("/clubsports")}
                            aria-label='Open Club Sports'
                            justifyContent={"flex-start"}
                            overflow={"hidden"}
                        >
                            <Icon as={PiBarbellFill} boxSize={"2rem"} color={"brand.white"} mr={"1.5rem"} ml={"0.5rem"} />
                            Club Sports
                        </Button>
                        <Button
                            onClick={handleNavigate("/forms")}
                            variant={whichButtonVariant("/forms")}
                            aria-label='Open Forms'
                            justifyContent={"flex-start"}
                            overflow={"hidden"}
                        >
                            <Icon as={FaClipboardList} boxSize={"2rem"} color={"brand.white"} mr={"1.5rem"} ml={"0.5rem"} />
                            Forms
                        </Button>
                        {/* <Button
                            onClick={handleNavigate("/schedule")}
                            variant={whichButtonVariant("/schedule")}
                            aria-label='Open Schedule'
                            justifyContent={"flex-start"}
                            overflow={"hidden"}
                        >
                            <Icon as={GrSchedules} boxSize={"3rem"} color={"brand.white"} mr={"1.5rem"} ml={"0.5rem"} />
                            Schedule
                        </Button> */}
                        {/* Add more Links as needed */}
                    </VStack>
                </Box>
            </MotionBox>
        </AnimatePresence>
    );
}

export default Sidebar;