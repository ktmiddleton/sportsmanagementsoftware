import React from 'react'
import { useNavigate } from 'react-router-dom';

import {
    Flex,
    Text,
    IconButton,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList,
    HStack,
    Spacer
} from '@chakra-ui/react'
import { ReactComponent as LoyolaMDLogo } from '../assets/LoyolaMDLogo.svg';
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";



export default function Header({}) 
{
    const navigate = useNavigate();

    function handleNavigate(path) 
    {
        return () => navigate(path);
    }

    return (
    <div>
        <Flex
        pos="sticky"
        justify="justify"
        align="center"
        h={{base: "120px"}}
        w="100vw"
        bg="brand.loyolaGreen"
        >
            <div className="headerlogo">
                <IconButton 
                aria-label='Home'
                as={LoyolaMDLogo} 
                boxSize={64} 
                ml={5}
                color={"brand.white"}
                bg={"transparent"}
                _hover={{textDecor: 'none', backgroundColor:"transparent"}}
                onClick={handleNavigate("/")}
                />
            </div>
            <Spacer/>
            <div className="headerbuttons">
                <IconButton
                aria-label='Settings'
                as={IoSettingsSharp} 
                boxSize={16}
                mr={5}
                color={"brand.white"}
                bg={"brand.loyolaGreen"}
                onClick={handleNavigate("/settings")}
                _hover={{textDecor: 'none', backgroundColor:"brand.hover.loyolaGreen"}}
                />
                <IconButton 
                aria-label='Profile'
                as={FaUserCircle} 
                boxSize={16}
                mr={10}
                color={"brand.white"}
                bg={"brand.loyolaGreen"}
                onClick={handleNavigate("/profile")}
                _hover={{textDecor: 'none', backgroundColor:"brand.hover.loyolaGreen"}}
                />
            </div>
        </Flex>
    </div>
    )
}