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

function DeleteFormForm({ pk, isOpen, onClose }) {

    const toast = useToast()

    const submitForm = (formValues) => {
        console.log(formValues)
        if (formValues.confirmation) {
            axios.delete(
                `${process.env.REACT_APP_DJANGO_SERVER_URL}/forms/?token=${localStorage.getItem("token")}&formId=${pk}&info=1`
            ).then((response) => {
                isOpen = !isOpen;
                toast({
                    title: 'Form Successfully deleted.',
                    description: "You've successfully deleted team: " + pk + ".",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }).catch((error) => {
                toast({
                    title: 'Failed to delete Form.',
                    description: "You've encountered an error deleting Form: " + pk + " - " + error.response.data.error,
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
                            <ModalHeader>Delete Form</ModalHeader>
                            
                            <ModalCloseButton />

                            <ModalBody> {/* Put questions in here */}
                                <VStack
                                    spacing="2rem"
                                    width="100%"
                                > 
                                    <ConfirmCheckbox 
                                        fieldName="confirmation" 
                                        label="Confirm Deletion"
                                        checkboxLabel="Click here to ensure you wish to delete the form"
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

export default DeleteFormForm;