import {Badge, Flex, Avatar, Box, Text, Heading, HStack, VStack, Spacer, Button} from "@chakra-ui/react";
import React from "react";

export default function ListItem(props) {
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
                        <Heading size="md" mx="2">{props.username}</Heading>
                        <Text fontSize="sm" noOfLines={1}>{props.email}</Text>
                    </VStack>
                    <Button variant="Waitlist"> Edit </Button>
                    <Button variant="Waitlist" bg="#FF0000">Delete</Button>
                </HStack>
            </Flex>
        </div>
    );
}