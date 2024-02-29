import { Card, CardBody, CardFooter, CardHeader, Heading, Image, Text, background } from "@chakra-ui/react";
import React from "react";

function SportCard(props) {
    return (
        <div className="sportCard">
            <Card
                as="button" // makes it clickable
                variant="elevated"
                size="lg"
                width="400px"
                onClick={() => {console.log("Clicked Sports Card")}} // TODO: finish this onclick function
                overflow="hidden" // Ensures stuff extending outside is hidden
                transition="0.1s"
                _hover={{
                    boxShadow: "4px 4px 5px #cccccc",
                    transition: "all 0.1s ease-in-out",
                }}
                _active={{
                    boxShadow: "1px 1px 5px #cccccc",
                    transition: "0.1s"
                }}
            >
                <Image
                    src={props.image ? props.image : "./Placeholder.png"}
                    height="200px"
                    width="100%"
                    objectFit="cover"
                />
                <CardBody>
                    <Heading textAlign="start">
                        {props.header}
                    </Heading>
                    <Text textAlign="start">
                        {props.description}
                    </Text>
                </CardBody>
                {/* <CardFooter> */}
                    {/* Buttons and Stuff */}
                {/* </CardFooter> */}
            </Card>
        </div>
    );
}

export default SportCard;