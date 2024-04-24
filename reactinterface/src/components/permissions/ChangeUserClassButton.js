import React, { useEffect } from "react";
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useUser } from "../UserContext";
import axios from "axios";
import ChangeUserClassForm from "./forms/ChangeUserClassForm";

const PERM_NAME = "can_update_users";

function ChangeUserClassButton({username, groups}) {

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
                <Tooltip hasArrow label='Edit User Class' bg='gray.300' color='black'>
                    <IconButton
                        m="1rem"
                        aria-label="Edit"
                        icon={<EditIcon />}
                        isRound={true}
                        size="lg"
                        bg="brand.yellow"
                        onClick={buttonClick} // Define your click event handler
                    />
                </Tooltip>
                <ChangeUserClassForm isOpen={isOpen} onClose={onClose} username={username} groups={groups}/>
            </div>
        :
            <></>
    );
}

export default ChangeUserClassButton;