import {Badge, Flex, Avatar, Box, Text, Heading, HStack, VStack, Spacer, Button} from "@chakra-ui/react";
import React from "react";
import { useUser } from "../UserContext";


const PERM_NAME1 = "can_update_users";
const PERM_NAME2 = "can_delete_users";

export default function ListItem({username, status, editOpen, deleteOpen}) {

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
                    onClick={() => {
                        if (userHasPerm(PERM_NAME1)) 
                        {
                        editOpen();
                        }
                    }}
                    > Edit 
                    </Button>
                    <Button 
                    variant="Waitlist" bg="#FF0000"
                    onClick={() => {
                        if (userHasPerm(PERM_NAME2)) 
                        {
                        deleteOpen();
                        }
                    }}
                    > Delete
                    </Button>
                </HStack>
            </Flex>
        </div>
    );
}