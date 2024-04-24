import React from "react";
import ListItem from "../components/ListItem";
import SportCard from "../components/SportCard";
import { useDisclosure, IconButton, Wrap, Text, Stack, Box, Flex, Grid, GridItem, HStack, VStack, Heading, Spacer, Tabs, TabList, TabPanels, TabPanel, Tab, Table, Thead, Tr, Th, Tbody, Td, ButtonGroup, Tfoot } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Calendar from 'react-calendar';
import {useState, useEffect} from 'react';
import moment from 'moment';
import Sidebar from "../components/Sidebar";
import '../css/calendar.css';
import axios from "axios";
import UserList from '../components/permissions/UserList';
import { useUser } from "../components/UserContext";
import CreateUserForm from "../components/permissions/forms/CreateUserForm";
import { AddIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import EditUserForm from "../components/permissions/forms/EditUserForm"
import DeleteUserForm from "../components/permissions/forms/DeleteUserForm"
import CreateFormButton from "../components/permissions/CreateFormButton";
import FormInfoCard from "../components/FormInfoCard";
import SearchBar from "../components/SearchBar";
import EditFormButton from "../components/permissions/EditFormButton";
import DeleteFormButton from "../components/permissions/DeleteFormButton";
import FormCRUD from "../components/FormCRUD";
import UserCRUD from "../components/UserCRUD";

const GROUP_NAME = "admin"

export default function Admin({openState, onToggle}) 
{

    const { user, loadUserData, userHasGroup, userHasPerm } = useUser();

    const { 
        isOpen: isOpenCreate, 
        onOpen: onOpenCreate, 
        onClose: onCloseCreate
    } = useDisclosure();

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        axios.get(
            `http://localhost:8000/user/allusers/?token=${localStorage.getItem("token")}`
        )
        .then((response) => {
            setUserList(response.data.data);
        })
        .catch((error) => {
            console.log("Error getting classes");
            console.log(error);
        })
      }, [user]);

    var userMap = "";

    userMap = userList.map( (item) => {
    
        var userGroups = [];
        
        for (let i =0; i < item.groups.length; i++) 
        {
            if (item.groups[i].name == "admin")
            {
                userGroups.push("admin");
            }
            if (item.groups[i].name == "instructor")
            {
                userGroups.push("instructor");
            }
            if (item.groups[i].name == "referee")
            {
                userGroups.push("referee");
            }
            if (item.groups[i].name == "captain")
            {
                userGroups.push("captain");
            }
            if (item.groups[i].name == "user") 
            {
                userGroups.push("user");
            }
        }
        
        return (
            <>
                <UserList username={item.username} email={item.email} first_name={item.first_name} last_name={item.last_name} groups={userGroups}/>
            </>)
    })

    function buttonClick() {
        if (userHasGroup(GROUP_NAME)) {
            onOpenCreate();
        }
    }

    return (
    userHasGroup(GROUP_NAME) ? 
        <div className="admin">
            <Grid
            templateAreas={`"header"
                            "main"`}
            gridTemplateRows={{base: `${process.env.REACT_APP_HEADER_HEIGHT} ${process.env.REACT_APP_MAIN_PAGE_HEIGHT}`}}
            // gridTemplateColumns={{base:'1fr 3fr 2fr'}} // 11em
            gap='0'
            color='blackAlpha.700'
            fontWeight='bold'
            overflowX="hidden"
            >
                <GridItem area={'header'}>
                    <Header buttons={true}/>
                </GridItem>
                <GridItem area={'nav'}>
                    {/* <Navbar activePage={"Classes"}/> */}
                    
                </GridItem>
                <GridItem area={'main'} height={process.env.REACT_APP_MAIN_PAGE_HEIGHT} overflowY="auto">
                    <HStack align={"baseline"} background={process.env.REACT_APP_PAGE_BACKGROUND}>
                        <Sidebar isOpen={openState} onToggle={onToggle}/>
                        <Tabs size="lg" variant="enclosed" colorScheme="green" m="1rem">
                            <TabList>
                                <Tab>
                                    Users
                                </Tab>
                                <Tab>
                                    Forms
                                </Tab>
                            </TabList>
                            
                            <TabPanels>
                                <TabPanel> {/* User Tab */}
                                    <UserCRUD/>
                                    {/* <div id="user-crud">
                                        <VStack
                                        alignItems={"stretch"}
                                        >
                                            <Heading
                                            color="brand.black"
                                            textAlign="left"
                                            m="1rem"
                                            >All Users
                                            </Heading>
                                            <IconButton
                                                m="1rem"
                                                aria-label="Add"
                                                icon={<AddIcon />}
                                                isRound={true}
                                                size="lg"
                                                bg="brand.brightGreen"
                                                onClick={() => buttonClick()} // Define your click event handler
                                            />
                                            {userMap}
                                            <CreateUserForm isOpen={isOpenCreate} onClose={onCloseCreate}/>
                                        </VStack>
                                    </div> */}
                                </TabPanel>
                                <TabPanel> {/* Form Tab */}
                                    <FormCRUD />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </HStack>
                </GridItem>
            </Grid>
        </div>
        :
        <></>
    )
}