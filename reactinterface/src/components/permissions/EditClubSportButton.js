import React, { useEffect } from "react";
import { EditIcon } from '@chakra-ui/icons';
import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useUser } from "../UserContext";
import axios from "axios";
import CreateClubSportForm from "./forms/CreateClubSportForm";

const PERM_NAME = "can_update_club_team";

function EditClubSportButton({teamData}) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    console.log(teamData)
    const { user, loadUserData, userHasGroup, userHasPerm } = useUser();

    function buttonClick() {
        if (userHasPerm(PERM_NAME)) {
            onOpen();
        }
    }

    return (
        userHasPerm(PERM_NAME) ?
            <div className="edit-club-sport-button">
                <Tooltip hasArrow label='Edit Club Sport Team' bg='gray.300' color='black'>
                    <IconButton
                        m="1rem"
                        aria-label="Edit"
                        icon={<EditIcon />}
                        isRound={true}
                        size="lg"
                        bg="brand.brightGreen"
                        onClick={() => buttonClick()} // Define your click event handler
                    />
                </Tooltip>
                <CreateClubSportForm isOpen={isOpen} onClose={onClose} initialValues={teamData} mode="update" pk={teamData.id} />
            </div>
        :
            <></>
    );
}

export default EditClubSportButton;