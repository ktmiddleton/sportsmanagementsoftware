import { Card, CardBody, CardFooter, CardHeader, Heading, Image, Text, background } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function SportCard({image, header, description, teamObject}) {

    const navigate = useNavigate();

    const handleClick = () => { // TODO: Needs to actually handle navigating to a page
        console.log("Clicked Sports Card");
        if (teamObject.sport_type == "club") {
            navigate(`/clubsportteam/${teamObject.id}`);
        } else if (teamObject.sport_type == "intramural") {
            navigate(`/intramuralsportteam/${teamObject.id}`);
        }
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
                    src={image ? image : "./Placeholder.png"}
                    height="50%"
                    width="100%"
                    objectFit="cover"
                />
                <CardBody>
                    <Heading fontSize={{base: "small", sm: "small", lg: "large"}} textAlign="start">
                        {header}
                    </Heading>
                    <Text fontSize={{base: "small", sm: "small", lg: "large"}} textAlign="start">
                        {description}
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