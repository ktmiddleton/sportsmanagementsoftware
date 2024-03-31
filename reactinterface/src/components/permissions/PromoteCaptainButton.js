import React from "react";
import { DeleteIcon } from '@chakra-ui/icons';
import { Button, IconButton, useDisclosure } from "@chakra-ui/react";
import { useUser } from "../UserContext";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteClubSportForm from "./forms/DeleteClubSportForm";
import PromoteCaptainForm from "./forms/PromoteCaptainForm";

const PERM_NAME = "can_promote_captain";

function PromoteCaptainButton({ teamData }) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { user, loadUserData, userHasGroup, userHasPerm } = useUser();

    function buttonClick() {
        if (userHasPerm(PERM_NAME)) {
            onOpen();
        }
    }

    return (
        userHasPerm(PERM_NAME) ?
            <div className="delete-club-sport-button">
                <Button
                    m="1rem"
                    aria-label="Add"
                    leftIcon={<PersonAddIcon />}
                    isRound={true}
                    size="lg"
                    bg="brand.brightGreen"
                    onClick={() => buttonClick()} // Define your click event handler
                >
                    Add Captain
                </Button>
                <PromoteCaptainForm teamData={teamData} isOpen={isOpen} onClose={onClose} />
            </div>
        :
            <></>
    );
}

export default PromoteCaptainButton;