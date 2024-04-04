import {useDisclosure, Badge, Flex, Avatar, Box, Text, Heading, HStack, VStack, Spacer, Button} from "@chakra-ui/react";
import React from "react";
import { useUser } from "../UserContext";
import EditUserForm from "./forms/EditUserForm";
import DeleteUserForm from "./forms/DeleteUserForm";
import ChangeUserClassForm from "./forms/ChangeUserClassForm";


const PERM_NAME1 = "can_update_users";
const PERM_NAME2 = "can_delete_users";

export default function UserList({username, email, first_name, last_name, status}) {

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

    const {
        isOpen: isOpenChangeUserClass,
        onOpen: onOpenChangeUserClass,
        onClose: onCloseChangeUserClass
    } = useDisclosure();

    const { user, loadUserData, userHasGroup, userHasPerm } = useUser();

    return (
        <div className="listItem">
            <Flex
            w="3fr"
            bg="brand.houndsGrey"
            pl="4"
            mx="2"
            >
                <HStack>
                    <Avatar size="lg" src="./Placeholder.png" />
                    <VStack w="100%" alignItems={"baseline"}>
                        <Heading size="md" mx="2">{username}</Heading>
                        <Text fontSize="sm" noOfLines={1}>{status}</Text>
                    </VStack>
                    <Button 
                    variant="Waitlist"
                    mx={5}
                    onClick={() => {
                        if (userHasPerm(PERM_NAME1)) 
                        {
                        onOpenEdit();
                        }
                    }}
                    > Edit 
                    </Button>
                    <Button 
                    variant="Waitlist" bg="#FF0000"
                    mx={5}
                    onClick={() => {
                        if (userHasPerm(PERM_NAME2)) 
                        {
                        onOpenDelete();
                        }
                    }}
                    > Delete
                    </Button>
                    <Button 
                    variant="Waitlist" bg="brand.loyolaGreen"
                    mx={5}
                    onClick={() => {
                        if (userHasPerm(PERM_NAME2)) 
                        {
                        onOpenChangeUserClass();
                        }
                    }}
                    > Change User Class
                    </Button>
                </HStack>
            </Flex>
            <EditUserForm username={username} email={email} first_name={first_name} last_name={last_name} isOpen={isOpenEdit} onClose={onCloseEdit}/>
            <DeleteUserForm username={username} isOpen={isOpenDelete} onClose={onCloseDelete}/>
            <ChangeUserClassForm username={username} isOpen={isOpenChangeUserClass} onClose={onCloseChangeUserClass}/>
        </div>
    );
}