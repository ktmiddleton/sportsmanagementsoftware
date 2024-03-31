import React from "react";
import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton, useDisclosure } from "@chakra-ui/react";
import { useUser } from "../UserContext";
import DeleteClubSportForm from "./forms/DeleteClubSportForm";

const PERM_NAME = "can_delete_club_team";

function DeleteClubSportButton({ teamId }) {

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
                <IconButton
                    m="1rem"
                    aria-label="Add"
                    icon={<DeleteIcon />}
                    isRound={true}
                    size="lg"
                    bg="brand.brightGreen"
                    onClick={() => buttonClick()} // Define your click event handler
                />
                <DeleteClubSportForm teamId={teamId} isOpen={isOpen} onClose={onClose} />
            </div>
        :
            <></>
    );
}

export default DeleteClubSportButton;