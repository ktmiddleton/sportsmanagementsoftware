import {Badge, Flex, Avatar, Box, Text, Heading, HStack, VStack, Spacer, Button} from "@chakra-ui/react";
import React from "react";

export default function ListItem(props) {
    var element = "";
    switch (props.action) 
    {
        case "open":
            element = <Button m="2" variant="Register">Register</Button>;
            break;
        case "waitlist":
            element = <Button m="2" variant="Waitlist">Waitlist</Button>;
            break;
        case "full":
            element = <Button isDisabled="true" m="2" variant="Full">Full</Button>;
            break;
        case "registerOpen":
            element = <HStack><Button m="2" variant="Register">Competitive</Button> <Button m="2" variant="Register">Casual</Button></HStack>;
            break;
        case "registerClose":
            element = <HStack><Button isDisabled="true" m="2" variant="Full">Closed</Button> <Button isDisabled="true" m="2" variant="Full">Closed</Button></HStack>
            break;
        case "registerRequest":
            element = <HStack><Button m="2" variant="Waitlist">By Request</Button> <Button m="2" variant="Waitlist">By Request</Button></HStack>
    }
    return (
        <div className="listItem">
            <Flex
            w="3fr"
            bg="brand.houndsGrey"
            pl="4"
            ml="2"
            mr="2"
            >
                <HStack>
                    <Avatar size="lg" src="./Placeholder.png" />
                    <VStack w="100%" alignItems={"baseline"}>
                        <Heading size="md" mx="2">{props.className}</Heading>
                        <Text fontSize="sm" noOfLines={1}>{props.description}</Text>
                    </VStack>
                    <Spacer/>
                    {element}
                </HStack>
            </Flex>
        </div>
    );
}