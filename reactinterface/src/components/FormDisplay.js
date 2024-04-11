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
            ...formValues,
            token: localStorage.getItem("token")
        }
        // axios.post(
        //     `http://localhost:8000/classes/`,
        //     data
        // ).then((response) => {
        //     isOpen = !isOpen;
        //     window.location.reload();
        //     toast({
        //         title: 'Class successfully created.',
        //         description: "You've successfully created the class: " + formValues.name + ".",
        //         status: 'success',
        //         duration: 9000,
        //         isClosable: true,
        //     })
        // }).catch((error) => {
        //     toast({
        //         title: 'Failed to create class.',
        //         description: "You've encountered an error creating the class " + error.response.data.error,
        //         status: 'error',
        //         duration: 9000,
        //         isClosable: true,
        //     })
        //     console.error(error);
        // });
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
                        <ModalContent maxW="50vw">
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
                                        {formData.form_info.body}
                                    </Text>
                                    <TextQuestion
                                        fieldName="name"
                                        placeHolder="Name"
                                        label="Full Name"
                                        required={true}
                                        formikProps={formikProps}
                                    />
                                    <ConfirmCheckbox
                                        fieldName="confirm" 
                                        label="Confirm Signature"
                                        checkboxLabel="By checking this box, I certify that all information provided is accurate and complete to the best of my knowledge."
                                        required={true}
                                        trueRequired={true}
                                        formikProps={formikProps}
                                    />
                                    {/* <MultiSelectQuestion 
                                        fieldName="groups" 
                                        label="Confirm Signature" 
                                        // checkedList={groups}
                                        required={true}
                                        options={[
                                            { value: 'certify', label: '' },
                                        ]}
                                        formikProps={formikProps}
                                    /> */}
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