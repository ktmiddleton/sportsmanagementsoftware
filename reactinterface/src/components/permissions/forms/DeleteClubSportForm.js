import React from "react";
import TextQuestion from "../questions/TextQuestion";
import { Form, Formik } from "formik";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";

import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup } from "@chakra-ui/react";
import { Field } from "formik";
import TrueFalseQuestion from "../questions/TrueFalseQuestion";
import { useNavigate } from "react-router-dom";

function CreateClubSportForm({ teamId, isOpen, onClose }) {

    const toast = useToast()

    const navigate = useNavigate();

    const submitForm = (formValues) => {
        console.log(formValues)
        axios.delete(
            `http://localhost:8000/clubsports/?teamId=${teamId}&token=${localStorage.getItem("token")}`
        ).then((response) => {
            isOpen = !isOpen;
            navigate("/clubsports");
            toast({
                title: 'Team Successfully deleted.',
                description: "You've successfully deleted team: " + teamId + ".",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }).catch((error) => {
            toast({
                title: 'Failed to delete team.',
                description: "You've encountered an error deleting team: " + teamId + " - " + error.response.data.error,
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
                                    <TrueFalseQuestion 
                                        fieldName="confirmation" 
                                        label="Confirm Deletion" 
                                        placeHolder=" "
                                        required={true}
                                        trueOptionRequired={true}
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

export default CreateClubSportForm;