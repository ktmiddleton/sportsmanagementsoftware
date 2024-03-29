import { Card, CardBody, CardFooter, CardHeader, Heading, Image, Text, background } from "@chakra-ui/react";
import axios from "axios";
import React from "react";

function SportCard(props) {

    const handleClick = () => { // TODO: Needs to actually handle navigating to a page
        console.log("Clicked Sports Card");
        axios.get(
            `http://localhost:8000/clubsports/userteams/?username=${localStorage.getItem("username")}`,
            {username: "joj"}
        )
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log("Error getting club sports");
            console.log(error);
        })
    }

    return (
        <div className="sportCard">
            <Card
                as="button" // makes it clickable
                variant="elevated"
                size={{base: "sm", sm: "md", md: "lg"}}
                width="18vw"//{{base: "40vw", sm: "30vw", lg: "20vw"}} // It's a little messed up the 10 one doesn't activate for any size of screen
                aspectRatio="400 / 323.2"
                onClick={handleClick} // TODO: finish this onclick function
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
                    height="50%"
                    width="100%"
                    objectFit="cover"
                />
                <CardBody>
                    <Heading fontSize={{base: "small", sm: "small", lg: "large"}} textAlign="start">
                        {props.header}
                    </Heading>
                    <Text fontSize={{base: "small", sm: "small", lg: "large"}} textAlign="start">
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