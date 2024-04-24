import React, { useEffect } from "react";
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useUser } from "../UserContext";
import axios from "axios";
import CreateClassForm from "./forms/CreateClassForm";

const PERM_NAME = "can_update_class";

function EditClassButton({classData}) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { user, loadUserData, userHasGroup, userHasPerm } = useUser();

    function buttonClick() {
        if (userHasPerm(PERM_NAME)) {
            onOpen();
        }
    }

    return (
        userHasPerm(PERM_NAME) ?
            <div className="edit-class-button">
                <Tooltip hasArrow label='Edit Class' bg='gray.300' color='black'>
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
                <CreateClassForm isOpen={isOpen} onClose={onClose} mode="update" initialValues={classData} pk={classData.id} />
            </div>
        :
            <></>
    );
}

export default EditClassButton;