import React, { useEffect } from "react";
import { AddIcon } from '@chakra-ui/icons';
import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useUser } from "../UserContext";
import axios from "axios";
import CreateIntramuralSportTeamForm from "./forms/CreateIntramuralSportTeamForm";

const PERM_NAME = "can_create_intramural_team";

function CreateIntramuralSportTeamButton({ sportData }) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { user, loadUserData, userHasGroup, userHasPerm } = useUser();

    function buttonClick() {
        if (userHasPerm(PERM_NAME)) {
            onOpen();
        }
    }

    return (
        userHasPerm(PERM_NAME) ?
            <div className="create-intramural-sport-team-button">
                <IconButton
                    m="1rem"
                    aria-label="Add"
                    icon={<AddIcon />}
                    isRound={true}
                    size="lg"
                    bg="brand.brightGreen"
                    onClick={() => buttonClick()} // Define your click event handler
                />
                <CreateIntramuralSportTeamForm isOpen={isOpen} onClose={onClose} sportData={sportData} />
            </div>
        :
            <></>
    );
}

export default CreateIntramuralSportTeamButton;