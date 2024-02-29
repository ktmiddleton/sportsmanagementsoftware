import React from "react";

function EventCard(props) {
    return (
        <div className="eventCard">
            <Card
                as="button" // makes it clickable
                variant="elevated"
                size={{base: "sm", sm: "md", md: "lg"}}
                width={{base: "40vw", sm: "30vw", md: "20vw"}} // It's a little messed up the 10 one doesn't activate for any size of screen
                aspectRatio="400 / 323.2"
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
                
            </Card>
        </div>
    );
}

export default EventCard;