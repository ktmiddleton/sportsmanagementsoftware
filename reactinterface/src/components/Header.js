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
import { ReactComponent as LoyolaMDLogo } from '../assets/LoyolaMDLogo.svg';
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import {useState} from 'react';



export default function Header({}) 
{
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
                <Icon 
                as={LoyolaMDLogo} 
                boxSize={64} 
                ml={5}
                color={"brand.white"}
                />
            </div>
            <Spacer/>
            <div className="headerbuttons">
                <Icon 
                as={IoSettingsSharp} 
                boxSize={16}
                mr={5}
                color={"brand.white"}
                />
                <Icon 
                as={FaUserCircle} 
                boxSize={16}
                mr={10}
                color={"brand.white"}
                />
            </div>
        </Flex>
    </div>
    )
}