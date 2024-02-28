import React from 'react';
import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'
import { useNavigate, useLocation } from 'react-router-dom';

function Sidebar(props) {
    const navigate = useNavigate();
    const location = useLocation();

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

    return (
            <Flex
                h={props.mobile ? "100%" : "100vh"}
                w={props.mobile ? "100%" : "20vw"}
            >
                <Box // Sidebar background
                    as="aside"
                    w={{ base: "100%" }}
                    bg="brand.darkGrey"
                    // p="3px"
                >
                    <VStack align="stretch" spacing="0px">
                        {/* Sidebar content here */}
                        <Button onClick={handleNavigate("/")} variant={whichButtonVariant("/")}>Dashboard</Button>
                        <Button onClick={handleNavigate("/classes")} variant={whichButtonVariant("/classes")}>Classes</Button>
                        <Button onClick={handleNavigate("/intramural")} variant={whichButtonVariant("/intramural")}>Intramural</Button>
                        <Button onClick={handleNavigate("/clubsports")} variant={whichButtonVariant("/clubsports")}>Club Sports</Button>
                        <Button onClick={handleNavigate("/forms")} variant={whichButtonVariant("/forms")}>Forms</Button>
                        <Button onClick={handleNavigate("/schedule")} variant={whichButtonVariant("/schedule")}>Schedule</Button>
                        {/* Add more Links as needed */}
                    </VStack>
                </Box>
            </Flex>
    );
}

export default Sidebar;