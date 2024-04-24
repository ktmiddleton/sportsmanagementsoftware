import React from "react";
import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useUser } from "../UserContext";
import DeleteClubSportForm from "./forms/DeleteClubSportForm";

const PERM_NAME = "can_delete_club_team";

function DeleteClubSportButton({ teamData }) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { user, loadUserData, userHasGroup, userHasPerm } = useUser();

    function buttonClick(event) {
        if (userHasPerm(PERM_NAME)) {
            event.stopPropagation();
            onOpen();
        }
    }

    return (
        userHasPerm(PERM_NAME) ?
            <div className="delete-club-sport-button">
                <Tooltip hasArrow label='Delete Club Sport' bg='gray.300' color='black'>
                    <IconButton
                        m="1rem"
                        aria-label="Add"
                        icon={<DeleteIcon />}
                        isRound={true}
                        size="lg"
                        bg="brand.red"
                        onClick={buttonClick} // Define your click event handler
                    />
                </Tooltip>
                <DeleteClubSportForm teamData={teamData} isOpen={isOpen} onClose={onClose} />
            </div>
        :
            <></>
    );
}

export default DeleteClubSportButton;