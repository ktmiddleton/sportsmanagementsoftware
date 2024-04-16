import React, { useEffect } from "react";
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useUser } from "../UserContext";
import axios from "axios";
import CreateFormForm from "./forms/CreateFormForm";

const PERM_NAME = "can_update_forms";

function EditFormButton({formData}) {

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
            <div className="edit-form-button">
                <Tooltip hasArrow label='Edit Form' bg='gray.300' color='black'>
                    <IconButton
                        m="1rem"
                        aria-label="Add"
                        icon={<EditIcon />}
                        isRound={true}
                        size="lg"
                        bg="brand.brightGreen"
                        onClick={buttonClick} // Define your click event handler
                    />
                </Tooltip>
                <CreateFormForm mode="update" isOpen={isOpen} onClose={onClose} initialValues={formData} pk={formData.id} />
            </div>
        :
            <></>
    );
}

export default EditFormButton;