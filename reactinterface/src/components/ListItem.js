import {Badge, Flex, Avatar, Box, Text, Heading, HStack, VStack, Spacer, Button} from "@chakra-ui/react";
import React from "react";

export default function ListItem(props) {
    var classState = "";
    switch (props.action) 
    {
        case "open":
            classState = "Register"
            break;
        case "waitlist":
            classState = "Waitlist"
            break;
        case "full":
            classState = "Full"
    }
    return (
        <div className="listItem">
            <Flex
            w="3fr"
            bg="brand.houndsGrey"
            pl="4"
            ml="2"
            mr="2"
            align="center"
            justify="justify"
            >
                    <Avatar size="lg" src="./Placeholder.png" />
                    <VStack alignItems={"flex-start"}>
                        <Heading size="md" pl="2">{props.className}</Heading>
                        <Text fontSize="sm" pl="2">{props.description}</Text>
                    </VStack>
                    <Spacer/>
                    <Button isDisabled={props.action == "full" || props.action == null ? true : false} mr="2" variant={classState}>
                        {classState}
                    </Button>
            </Flex>
        </div>
    );
}