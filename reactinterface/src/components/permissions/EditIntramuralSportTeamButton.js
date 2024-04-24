import React, { useEffect } from "react";
import { EditIcon } from '@chakra-ui/icons';
import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useUser } from "../UserContext";
import axios from "axios";
import CreateIntramuralSportTeamForm from "./forms/CreateIntramuralSportTeamForm";

const PERM_NAME = "can_update_intramural_team";

function EditIntramuralSportTeamButton({teamData}) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    console.log(teamData)
    const { user, loadUserData, userHasGroup, userHasPerm } = useUser();

    function buttonClick(event) {
        if (userHasPerm(PERM_NAME)) {
            event.stopPropagation();
            onOpen();
        }
    }

    return (
        userHasPerm(PERM_NAME) ?
            <div className="edit-club-sport-button">
                <Tooltip hasArrow label='Edit Intramural Sport Team' bg='gray.300' color='black'>
                    <IconButton
                        m="1rem"
                        aria-label="Edit"
                        icon={<EditIcon />}
                        isRound={true}
                        size="lg"
                        bg="brand.brightGreen"
                        onClick={buttonClick} // Define your click event handler
                    />
                </Tooltip>
                <CreateIntramuralSportTeamForm isOpen={isOpen} onClose={onClose} initialValues={teamData} mode="update" pk={teamData.id} />
            </div>
        :
            <></>
    );
}

export default EditIntramuralSportTeamButton;