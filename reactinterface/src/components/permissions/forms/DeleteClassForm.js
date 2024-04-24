import React from "react";
import TextQuestion from "../questions/TextQuestion";
import { Form, Formik } from "formik";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";

import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup } from "@chakra-ui/react";
import { Field } from "formik";
import TrueFalseQuestion from "../questions/TrueFalseQuestion";
import { useNavigate } from "react-router-dom";
import ConfirmCheckbox from "../questions/ConfirmCheckbox";

function DeleteClassForm({ pk, isOpen, onClose }) {

    const toast = useToast()

    const navigate = useNavigate();

    const submitForm = (formValues) => {
        console.log(formValues)
        if (formValues.confirmation === true) {
            axios.delete(
                `${process.env.REACT_APP_DJANGO_SERVER_URL}/classes/?classId=${pk}&token=${localStorage.getItem("token")}`
            ).then((response) => {
                isOpen = !isOpen;
                window.location.reload();
                toast({
                    title: 'Class Successfully deleted.',
                    description: "You've successfully deleted class: " + pk + ".",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            }).catch((error) => {
                toast({
                    title: 'Failed to delete class.',
                    description: "You've encountered an error deleting class: " + pk + " - " + error.response.data.error,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
                console.error(error);
            });
        }
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
            enableReinitialize
        >
            {(formikProps) => {

                return (
                <Form>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Delete Class</ModalHeader>
                            
                            <ModalCloseButton />

                            <ModalBody> {/* Put questions in here */}
                                <VStack
                                    spacing="2rem"
                                    width="100%"
                                > 
                                    <ConfirmCheckbox 
                                        fieldName="confirmation" 
                                        label="Confirm Deletion"
                                        checkboxLabel="Click here to ensure you wish to delete the class"
                                        placeHolder=" "
                                        required={true}
                                        trueRequired={true}
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

export default DeleteClassForm;