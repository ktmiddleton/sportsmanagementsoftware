import React from "react";
import TextQuestion from "../questions/TextQuestion";
import { Form, Formik } from "formik";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";

import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup } from "@chakra-ui/react";
import { Field } from "formik";
import TrueFalseQuestion from "../questions/TrueFalseQuestion";
import { useNavigate } from "react-router-dom";
import UserSelectQuestion from "../questions/UserSelectQuestion";

function PromoteCaptainForm({ teamData, isOpen, onClose }) {

    const toast = useToast()

    const navigate = useNavigate();

    const submitForm = (formValues) => {
        console.log(formValues)
        const data = {
            username: formValues.username,
            teamId: teamData.id,
            token: localStorage.getItem("token")
        }
        axios.post(
            `http://localhost:8000/clubsports/promotecaptain/`,
            data
        ).then((response) => {
            isOpen = !isOpen;
            window.location.reload();
            toast({
                title: 'User Successfully promoted',
                description: "You've successfully promoted " + formValues.username + " to Captain",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }).catch((error) => {
            toast({
                title: 'Failed to promote user',
                description: "You've encountered an error promoting user: " + formValues.username + " - " + error.response.data.error,
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
                console.log(values);
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
                            <ModalHeader>Delete Club Sport Team</ModalHeader>
                            
                            <ModalCloseButton />

                            <ModalBody> {/* Put questions in here */}
                                <VStack
                                    spacing="2rem"
                                    width="100%"
                                > 
                                    <UserSelectQuestion 
                                        fieldName="username" 
                                        label="User to promote to captain" 
                                        placeHolder=" "
                                        users={teamData.members}
                                        required={true}
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

export default PromoteCaptainForm;