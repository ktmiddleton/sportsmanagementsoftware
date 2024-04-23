import { IconButton, useDisclosure, Spacer, Button, ButtonGroup, Tooltip, Card, CardBody, CardHeader, Grid, GridItem, Heading, Text, useToast, HStack, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useParams } from "react-router-dom";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import EditUserForm from "../components/permissions/forms/EditUserForm";
import DeleteUserForm from "../components/permissions/forms/DeleteUserForm";
import { useUser } from "../components/UserContext";

function Profile({isOpen, onToggle}) {

    const { user, loadUserData, userHasGroup, userHasPerm } = useUser();
    const [ userData, setUserData] = useState([]);

    const { 
        isOpen: isOpenEdit, 
        onOpen: onOpenEdit, 
        onClose: onCloseEdit
    } = useDisclosure();

    const { 
        isOpen: isOpenDelete, 
        onOpen: onOpenDelete, 
        onClose: onCloseDelete
    } = useDisclosure();

    useEffect(() => {
        axios.get(
            `http://localhost:8000/user/getuser/?token=${localStorage.getItem("token")}`
        )
        .then((response) => {
            setUserData(response.data);
        })
        .catch((error) => {
            console.log("Error getting Club Sport team");
            console.log(error);
        })
    }, [user]);

    return (
        <div className="ClubSportTeamPage">
            <Grid
            templateAreas={`"header"
                            "main"`}
            gridTemplateRows={{base: '10vh 90vh'}}
            // gridTemplateColumns={{base:'1fr 5fr'}}
            gap='0'
            color='blackAlpha.700'
            fontWeight='bold'
            overflowX="hidden"
            >
                <GridItem area={'header'}>
                    <Header buttons={true}/>
                </GridItem>

                <GridItem area={'nav'}>
                    {/* <Sidebar isOpen={isOpen} onToggle={onToggle}/> */}
                </GridItem>

                <GridItem area={'main'}>
                    <HStack align={'baseline'}>
                        <Sidebar isOpen={isOpen} onToggle={onToggle}/>
                        {/* <VStack> */}
                        <VStack>
                            <HStack>
                                <Heading
                                p={"4"}
                                >Your Profile</Heading>
                                <Tooltip hasArrow label='Edit Account Details' bg='gray.300' color='black'>
                                    <IconButton
                                        m="1rem"
                                        aria-label="Edit"
                                        icon={<EditIcon />}
                                        isRound={true}
                                        size="lg"
                                        bg="brand.brightGreen"
                                        onClick={onOpenEdit} // Define your click event handler
                                    />
                                </Tooltip>
                                <Tooltip hasArrow label='Delete Account' bg='gray.300' color='black'>
                                    <IconButton
                                        m="1rem"
                                        aria-label="Add"
                                        icon={<DeleteIcon />}
                                        isRound={true}
                                        size="lg"
                                        bg="brand.red"
                                        onClick={onOpenDelete} // Define your click event handler
                                    />
                                </Tooltip>
                            </HStack>
                            <HStack>
                                <VStack
                                alignItems={"baseline"}
                                >
                                    <Heading
                                    textAlign={"left"}
                                    p={"4"}
                                    >
                                        First Name
                                    </Heading>
                                        <Text
                                        fontSize={"20"}
                                        p={"4"}
                                        >
                                            {userData.first_name}
                                        </Text>
                                    <Heading
                                    textAlign={"left"}
                                    p={"4"}
                                    >
                                        Last Name
                                    </Heading>
                                        <Text
                                        fontSize={"20"}
                                        p={"4"}
                                        >
                                            {userData.last_name}
                                        </Text>
                                    <Heading
                                    textAlign={"left"}
                                    p={"4"}
                                    >
                                        Email
                                    </Heading>
                                        <Text
                                        fontSize={"20"}
                                        p={"4"}
                                        >
                                            {userData.email}
                                        </Text>
                                    <Heading
                                    textAlign={"left"}
                                    p={"4"}
                                    >
                                        Username
                                    </Heading>
                                        <Text
                                        fontSize={"20"}
                                        p={"4"}
                                        >
                                            {userData.username}
                                        </Text>
                                </VStack>
                                <Spacer/>
                            </HStack>
                        </VStack>
                        {/* </VStack> */}
                    </HStack>
                </GridItem>
            </Grid>
            <EditUserForm username={userData.username} email={userData.email} first_name={userData.first_name} last_name={userData.last_name} isOpen={isOpenEdit} onClose={onCloseEdit}/>
            <DeleteUserForm username={userData.username} isOpen={isOpenDelete} onClose={onCloseDelete}/>
        </div>
    )
}

export default Profile;