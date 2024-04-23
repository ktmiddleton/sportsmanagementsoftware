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
    Spacer,
    Button,
    MenuItem
} from '@chakra-ui/react'
import { ReactComponent as LoyolaMDLogo } from '../assets/LoyolaMDLogo.svg';
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";
import { useUser } from "./UserContext";

const GROUP_NAME = "admin"

export default function Header(props) 
{
    const navigate = useNavigate();

    const {user, loadUserData, userHasGroup, userHasPerm } = useUser();

    function handleNavigate(path) 
    {
        return () => navigate(path);
    }

    function handleLogout() {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("username");
        navigate("/login");
    }

    return (
    <div>
        <Flex
        // pos="absolute"
        // top="0vh"
        // left="0vh"
        justify="justify"
        align="center"
        h="10vh"
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
                {props.buttons ?
                    <>
                        {userHasGroup(GROUP_NAME) ? 
                        <IconButton 
                            aria-label="Administration"
                            as={RiAdminFill}
                            boxSize={16}
                            mr={5}
                            color={"brand.white"}
                            bg={"brand.loyolaGreen"}
                            onClick={handleNavigate("/admin")}
                            _hover={{textDecor: 'none', backgroundColor:"brand.hover.loyolaGreen"}}
                        /> 
                        : 
                        <></>}
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
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label='Profile'
                                icon={<FaUserCircle size={"100%"} />}
                                boxSize={16}
                                mr={10}
                                color={"brand.white"}
                                bg={"brand.loyolaGreen"}
                                // onClick={handleNavigate("/profile")}
                                _hover={{textDecor: 'none', backgroundColor:"brand.hover.loyolaGreen"}}
                            />
                            <MenuList>
                                <MenuItem as="button" onClick={handleNavigate("/profile")}>Profile</MenuItem>
                                <MenuItem as="button" onClick={() => handleLogout("/login")}>Log out</MenuItem>
                            </MenuList>
                        </Menu>
                    </>
                :
                    <></>
                }
            </div>
        </Flex>
    </div>
    )
}