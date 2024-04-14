import React from "react";
import TextQuestion from "../questions/TextQuestion";
import { Form, Formik } from "formik";
import { Text, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";

import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup } from "@chakra-ui/react";
import { Field } from "formik";
import DropdownQuestion from "../questions/DropdownQuestion";

export default function DeleteUserForm({ isOpen, onClose, username}) {

    const toast = useToast()

    const submitForm = (formValues) => {
        axios.delete(
            `http://localhost:8000/user/getuser/?token=${localStorage.getItem("token")}&username=${username}`
        ).then((response) => {
            isOpen = !isOpen;
            window.location.reload();
            toast({
                title: 'User successfully deleted.',
                description: "You've successfully deleted the user: " + username + ".",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }).catch((error) => {
            toast({
                title: 'Failed to delete the user.',
                description: "You've encountered an error deleting the user " + error.response.data.error,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            console.error(error);
        });
    }

    return (
        <Formik
            initialValues={{}} // ABSOLUTELY NECESSARY DO NOT REMOVE
            onSubmit={(values, actions) => {
                submitForm(values);
                setTimeout(() => {
                actions.setSubmitting(false)
                }, 1000);
            }}
            enableReinitialize
        >
            {(formikProps) => {

                return (
                <Form>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Create New User</ModalHeader>
                            
                            <ModalCloseButton />

                            <ModalBody> {/* Put questions in here */}
                                <VStack
                                    spacing="2rem"
                                    width="100%"
                                >
                                    <Text>
                                        THIS IS AN IRREVERSIBLE ACTION, ARE YOU SURE YOU WISH TO PROCEED?
                                    </Text>
                                </VStack>
                            </ModalBody>

                            <ModalFooter>
                                <Button variant="ghost" mr={3} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="submit"
                                    bg="red"
                                    isLoading={formikProps.isSubmitting}
                                    onClick={formikProps.handleSubmit}
                                >
                                    Submit
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Form>
                )
            }}
        </Formik>
    );
}