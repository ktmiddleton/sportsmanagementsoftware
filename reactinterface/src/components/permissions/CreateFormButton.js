import React, { useEffect } from "react";
import { AddIcon } from '@chakra-ui/icons';
import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useUser } from "../UserContext";
import axios from "axios";
import CreateFormForm from "./forms/CreateFormForm";

const PERM_NAME = "can_create_forms";

function CreateFormButton() {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { user, loadUserData, userHasGroup, userHasPerm } = useUser();

    function buttonClick() {
        if (userHasPerm(PERM_NAME)) {
            onOpen();
        }
    }

    return (
        userHasPerm(PERM_NAME) ?
            <div className="create-form-button">
                <Tooltip hasArrow label='Create Form' bg='gray.300' color='black'>
                    <IconButton
                        m="1rem"
                        aria-label="Add"
                        icon={<AddIcon />}
                        isRound={true}
                        size="lg"
                        bg="brand.brightGreen"
                        onClick={() => buttonClick()} // Define your click event handler
                    />
                </Tooltip>
                <CreateFormForm mode="create" isOpen={isOpen} onClose={onClose} />
            </div>
        :
            <></>
    );
}

export default CreateFormButton;