import React, { useEffect } from "react";
import { AddIcon } from '@chakra-ui/icons';
import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useUser } from "../UserContext";
import axios from "axios";
import CreateClassForm from "./forms/CreateClassForm";

const PERM_NAME = "can_create_class";

function CreateClassButton() {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { user, loadUserData, userHasGroup, userHasPerm } = useUser();

    function buttonClick() {
        if (userHasPerm(PERM_NAME)) {
            onOpen();
        }
    }

    return (
        userHasPerm(PERM_NAME) ?
            <div className="create-class-button">
                <IconButton
                    m="1rem"
                    aria-label="Add"
                    icon={<AddIcon />}
                    isRound={true}
                    size="lg"
                    bg="brand.brightGreen"
                    onClick={() => buttonClick()} // Define your click event handler
                />
                <CreateClassForm isOpen={isOpen} onClose={onClose} />
            </div>
        :
            <></>
    );
}

export default CreateClassButton;