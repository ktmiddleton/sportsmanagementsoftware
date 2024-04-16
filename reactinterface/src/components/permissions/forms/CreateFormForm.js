import React from "react";
import TextQuestion from "../questions/TextQuestion";
import { Form, Formik } from "formik";
import { Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";

import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup } from "@chakra-ui/react";
import { Field } from "formik";
import DropdownQuestion from "../questions/DropdownQuestion";
import IntegerQuestion from "../questions/IntegerQuestion";
import DateTimeQuestion from "../questions/DateTimeQuestion";
import MultiSelectQuestion from "../questions/MultiSelectQuestion";
import ConfirmCheckbox from "../questions/ConfirmCheckbox";
import RichTextQuestion from "../questions/RichTextQuestion";
import RichTextEditor from "react-rte";
import DeleteFormButton from "../DeleteFormButton";

/*
    mode: {"create", "update"} <-- undefined defaults to create
*/
function CreateFormForm({ isOpen, onClose, initialValues, mode, pk }) {
    mode = (mode === undefined ? "create" : mode); // Make sure mode is create if not specified

    const toast = useToast()

    const submitForm = (formValues) => {
        console.log(formValues)
        let data = {
            ...formValues
        }
        if (mode === "create") {
            axios.post(
                `http://localhost:8000/forms/?token=${localStorage.getItem("token")}&info=1`,
                data
            ).then((response) => {
                isOpen = !isOpen;
                window.location.reload();
                toast({
                    title: 'Form successfully created.',
                    description: "You've successfully created the form: " + formValues.name + ".",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            }).catch((error) => {
                toast({
                    title: 'Failed to create form.',
                    description: "You've encountered an error creating the form " + error.response.data.error,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
                console.error(error);
            });
        } else if (mode === "update") {
            axios.patch(
                `http://localhost:8000/forms/?token=${localStorage.getItem("token")}&formId=${pk}&info=1`,
                data
            ).then((response) => {
                isOpen = !isOpen;
                window.location.reload();
                toast({
                    title: 'Form successfully created.',
                    description: "You've successfully created the form: " + formValues.name + ".",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            }).catch((error) => {
                toast({
                    title: 'Failed to create form.',
                    description: "You've encountered an error creating the form " + error.response.data.error,
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
            initialValues={{...initialValues}} // ABSOLUTELY NECESSARY DO NOT REMOVE
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
                        <ModalContent
                            maxW="50vw"
                        >
                            <ModalHeader>{mode === "create" ? "Create" : "Update"} Form</ModalHeader>
                            
                            <ModalCloseButton />

                            <ModalBody> {/* Put questions in here */}
                                <VStack
                                    spacing="2rem"
                                    width="100%"
                                >

                                    <TextQuestion
                                        fieldName="name"
                                        placeHolder="Name"
                                        label="Form Name"
                                        required={true}
                                        formikProps={formikProps}
                                    />
                                    <RichTextQuestion
                                        fieldName="body"
                                        placeHolder="Body Text"
                                        label="Body Text"
                                        required={true}
                                        formikProps={formikProps}
                                    />
                                    {/* <TextQuestion
                                        fieldName="body"
                                        placeHolder="Body"
                                        label="Body Text"
                                        formikProps={formikProps}
                                    /> */}
                                    <Heading
                                        width="100%"
                                        textAlign="left"
                                        size="md"
                                    >
                                        Assign user form when:
                                    </Heading>
                                    <ConfirmCheckbox 
                                        fieldName="clubsport_join" 
                                        label="" 
                                        checkboxLabel="Joining Club Sport"
                                        trueRequired={false}
                                        formikProps={formikProps}
                                    />
                                    <ConfirmCheckbox 
                                        fieldName="class_join" 
                                        label="" 
                                        checkboxLabel="Joining Class"
                                        trueRequired={false}
                                        formikProps={formikProps}
                                    />
                                    <ConfirmCheckbox 
                                        fieldName="intramural_team_join" 
                                        label="" 
                                        checkboxLabel="Joining Intramural Team"
                                        trueRequired={false}
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
                                    {mode === "create" ? "Submit" : "Update"}
                                </Button>
                                {mode === "update" ? <DeleteFormButton pk={pk} /> : <></>}
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Form>
                )
            }}
        </Formik>
    );
}

export default CreateFormForm;