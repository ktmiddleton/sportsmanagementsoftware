import React from "react";
import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useUser } from "../UserContext";
import DeleteIntramuralSportTeamForm from "./forms/DeleteIntramuralSportTeamForm";

const PERM_NAME = "can_delete_intramural_team";

function DeleteIntramuralSportTeamButton({ teamData }) {

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
            <div className="delete-intramural-sport-button">
                <Tooltip hasArrow label='Delete Intramural Sport Team' bg='gray.300' color='black'>
                    <IconButton
                        m="1rem"
                        aria-label="Add"
                        icon={<DeleteIcon />}
                        isRound={true}
                        size="lg"
                        bg="brand.brightGreen"
                        onClick={buttonClick} // Define your click event handler
                    />
                </Tooltip>
                <DeleteIntramuralSportTeamForm teamData={teamData} isOpen={isOpen} onClose={onClose} />
            </div>
        :
            <></>
    );
}

export default DeleteIntramuralSportTeamButton;