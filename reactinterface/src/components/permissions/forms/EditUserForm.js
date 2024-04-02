import React from "react";
import TextQuestion from "../questions/TextQuestion";
import { Form, Formik } from "formik";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";

import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup } from "@chakra-ui/react";
import { Field } from "formik";
import DropdownQuestion from "../questions/DropdownQuestion";

export default function EditUserForm({ isOpen, onClose, username, email, first_name, last_name}) {

    const toast = useToast()

    const submitForm = (formValues) => {
        let data = {email: formValues.email, username: formValues.username, first_name: formValues.firstname, last_name: formValues.lastname};
        axios.patch(
            `http://localhost:8000/user/getuser/?token=${localStorage.getItem("token")}&username=${username}`,
            data
        ).then((response) => {
            isOpen = !isOpen;
            window.location.reload();
            toast({
                title: 'User successfully edited.',
                description: "You've successfully edited the user: " + formValues.name + ".",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }).catch((error) => {
            toast({
                title: 'Failed to edit the user.',
                description: "You've encountered an error editing the user " + error.response.data.error,
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
        >
            {(formikProps) => {

                return (
                <Form>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Edit a User</ModalHeader>
                            
                            <ModalCloseButton />

                            <ModalBody> {/* Put questions in here */}
                                <VStack
                                    spacing="2rem"
                                    width="100%"
                                >

                                    <TextQuestion
                                        fieldName="firstname"
                                        placeHolder={first_name}
                                        label="Edit User's First Name"
                                        formikProps={formikProps}
                                    />
                                    <TextQuestion
                                        fieldName="lastname"
                                        placeHolder={last_name}
                                        label="Edit User's Last Name"
                                        formikProps={formikProps}
                                    />
                                    <TextQuestion
                                        fieldName="username"
                                        placeHolder={username}
                                        label="Edit User's Username"
                                        formikProps={formikProps}
                                    />
                                    <TextQuestion
                                        fieldName="email"
                                        placeHolder={email}
                                        label="Edit User's Email"
                                        formikProps={formikProps}
                                    />
                                </VStack>
                            </ModalBody>

                            <ModalFooter>
                                <Button variant="ghost" mr={3} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="submit"
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