import React, { useEffect } from "react";
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useUser } from "../UserContext";
import axios from "axios";
import DeleteFormForm from "./forms/DeleteFormForm";

const PERM_NAME = "can_delete_forms";

function DeleteFormButton({pk}) {

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
            <div className="delete-form-button">
                <Tooltip hasArrow label='Delete Form' bg='gray.300' color='black'>
                    <IconButton
                        m="1rem"
                        aria-label="Delete"
                        icon={<DeleteIcon />}
                        isRound={true}
                        size="lg"
                        bg="brand.red"
                        onClick={buttonClick} // Define your click event handler
                    />
                </Tooltip>
                <DeleteFormForm pk={pk} isOpen={isOpen} onClose={onClose} />
            </div>
        :
            <></>
    );
}

export default DeleteFormButton;