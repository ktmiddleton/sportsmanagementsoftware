import React from "react";
import TextQuestion from "./permissions/questions/TextQuestion";
import { Form, Formik } from "formik";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";

import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup } from "@chakra-ui/react";
import { Field } from "formik";
import DropdownQuestion from "./permissions/questions/DropdownQuestion";
import IntegerQuestion from "./permissions/questions/IntegerQuestion";
import DateTimeQuestion from "./permissions/questions/DateTimeQuestion";
import MultiSelectQuestion from "./permissions/questions/MultiSelectQuestion";
import ConfirmCheckbox from "./permissions/questions/ConfirmCheckbox";

function FormDisplay({ formData, isOpen, onClose }) {

    const toast = useToast()

    const submitForm = (formValues) => {
        console.log(formValues)
        let data = {
            ...formValues
        }
        axios.post(
            `${process.env.REACT_APP_DJANGO_SERVER_URL}/forms/complete/?token=${localStorage.getItem("token")}&formId=${formData.id}`,
            data
        ).then((response) => {
            isOpen = !isOpen;
            window.location.reload();
            toast({
                title: 'Form successfully completed.',
                description: "You've successfully completed the form: " + formValues.name + ".",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }).catch((error) => {
            toast({
                title: 'Failed to complete form.',
                description: "You've encountered an error completing the form " + error.response.data.error,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            console.error(error);
        });
    }

    return (
        <Formik
            initialValues={{signature: formData.signature, confirm: formData.completed}} // ABSOLUTELY NECESSARY DO NOT REMOVE
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
                        <ModalContent maxW="50vw">
                            {/* TODO: Add whichever other entity pertains to this form to the header or something */}
                            <ModalHeader>{formData.form_info.name}</ModalHeader>
                            
                            <ModalCloseButton />

                            <ModalBody> {/* Put questions in here */}
                                <VStack
                                    spacing="2rem"
                                    width="100%"
                                    maxH="70vh"
                                >
                                    <Text
                                        width="100%"
                                        textAlign="left"
                                        variant="outlined"
                                        border="1px solid"
                                        borderColor="gray.300"
                                        borderRadius="6px"
                                        padding="6px"
                                        overflowY="scroll"
                                    >
                                        {/* TODO: I really have no fucking clue whether this is safe or not the name having "dangerous" in it makes me suspicious */}
                                        <div dangerouslySetInnerHTML={{ __html: formData.form_info.body }} />
                                    </Text>
                                    <TextQuestion
                                        fieldName="signature"
                                        placeHolder="Full Name"
                                        label="Full Name"
                                        required={true}
                                        formikProps={formikProps}
                                    />
                                    <ConfirmCheckbox
                                        fieldName="confirm" 
                                        label="Confirm Signature"
                                        checkboxLabel="By checking this box, I certify that all information provided is accurate and complete to the best of my knowledge."
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

export default FormDisplay;