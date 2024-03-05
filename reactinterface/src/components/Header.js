import React from 'react'
import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList,
    HStack,
    Spacer
} from '@chakra-ui/react'
import logo from '../assets/LoyolaMDLogo.svg';
import svg from '../assets/LoyolaMDLogo.svg';
import Svg from '../assets/LoyolaMDLogo.svg?url';
import { ReactComponent as LoyolaMDLogo } from '../assets/LoyolaMDLogo.svg';
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import {useState} from 'react';



export default function Header({}) 
{
    const [navSize, changeNavSize] = useState("large")
    return (
    <div>
        <Flex
        pos="sticky"
        top="5"
        h={navSize == "small" ? "75px" : "200px"}
        w="100%"
        bg="brand.loyolaGreen"
        >
            <HStack>
                <Icon as={LoyolaMDLogo} boxSize={64}/>
                <Spacer/>
                <Icon as={IoSettingsSharp} boxSize={16}/>
                <Icon as={FaUserCircle} boxSize={16}/>
            </HStack>
        </Flex>
    </div>
    )
}