import React, { useEffect } from "react";
import { AddIcon } from '@chakra-ui/icons';
import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useUser } from "../UserContext";
import axios from "axios";
import CreateClubSportForm from "./forms/CreateClubSportForm";

const PERM_NAME = "can_create_club_team";

function CreateClubSportButton() {

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
            <div className="create-club-sport-button">
                <Tooltip hasArrow label='Create Club Sport Team' bg='gray.300' color='black'>
                    <IconButton
                        m="1rem"
                        aria-label="Add"
                        icon={<AddIcon />}
                        isRound={true}
                        size="lg"
                        bg="brand.brightGreen"
                        onClick={buttonClick} // Define your click event handler
                    />
                </Tooltip>
                <CreateClubSportForm isOpen={isOpen} onClose={onClose} mode="create" />
            </div>
        :
            <></>
    );
}

export default CreateClubSportButton;