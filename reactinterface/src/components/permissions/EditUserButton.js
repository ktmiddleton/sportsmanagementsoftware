import React, { useEffect } from "react";
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useUser } from "../UserContext";
import axios from "axios";
import EditUserForm from "./forms/EditUserForm";

const PERM_NAME = "can_update_users";

function EditUserButton({username, email, first_name, last_name}) {

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
            <div className="edit-user-button">
                <Tooltip hasArrow label='Edit User Information' bg='gray.300' color='black'>
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
                <EditUserForm isOpen={isOpen} onClose={onClose} username={username} email={email} first_name={first_name} last_name={last_name}S/>
            </div>
        :
            <></>
    );
}

export default EditUserButton;