import React, { useEffect } from "react";
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useUser } from "../UserContext";
import axios from "axios";
import DeleteClassForm from "./forms/DeleteClassForm";

const PERM_NAME = "can_delete_class";

function DeleteClassButton({pk}) {

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
            <div className="delete-class-button">
                <Tooltip hasArrow label='Delete Class' bg='gray.300' color='black'>
                    <IconButton
                        m="1rem"
                        aria-label="Delete"
                        icon={<DeleteIcon />}
                        isRound={true}
                        size="lg"
                        bg="brand.brightGreen"
                        onClick={buttonClick} // Define your click event handler
                    />
                </Tooltip>
                <DeleteClassForm pk={pk} isOpen={isOpen} onClose={onClose} />
            </div>
        :
            <></>
    );
}

export default DeleteClassButton;