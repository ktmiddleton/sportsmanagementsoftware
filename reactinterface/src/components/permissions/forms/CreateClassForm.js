import React from "react";
import TextQuestion from "../questions/TextQuestion";
import { Form, Formik } from "formik";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";

import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup } from "@chakra-ui/react";
import { Field } from "formik";
import DropdownQuestion from "../questions/DropdownQuestion";
import IntegerQuestion from "../questions/IntegerQuestion";
import DateTimeQuestion from "../questions/DateTimeQuestion";
import DeleteClassButton from "../DeleteClassButton";

/*
    mode: {"create", "update"} <-- undefined defaults to create
*/
function CreateClassForm({ isOpen, onClose, initialValues, mode, pk }) {
    mode = (mode === undefined ? "create" : mode); // Make sure mode is create if not specified

    const toast = useToast()

    const submitForm = (formValues) => {
        console.log(formValues)
        let data = {
            ...formValues,
        }
        if (mode === "create") {
            axios.post(
                `http://localhost:8000/classes/?token=${localStorage.getItem("token")}`,
                data
            ).then((response) => {
                isOpen = !isOpen;
                window.location.reload();
                toast({
                    title: 'Class successfully created.',
                    description: "You've successfully created the class: " + formValues.name + ".",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            }).catch((error) => {
                toast({
                    title: 'Failed to create class.',
                    description: "You've encountered an error creating the class " + error.response.data.error,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
                console.error(error);
            });
        } else if (mode === "update") {
            axios.patch(
                `http://localhost:8000/classes/?token=${localStorage.getItem("token")}&classId=${pk}`,
                data
            ).then((response) => {
                isOpen = !isOpen;
                window.location.reload();
                toast({
                    title: 'Class successfully updated.',
                    description: "You've successfully updated the class: " + formValues.name + ".",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            }).catch((error) => {
                toast({
                    title: 'Failed to update class.',
                    description: "You've encountered an error updating the class " + error.response.data.error,
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
                        <ModalContent>
                            <ModalHeader>{mode === "create" ? "Create" : "Update"} Class</ModalHeader>
                            
                            <ModalCloseButton />

                            <ModalBody> {/* Put questions in here */}
                                <VStack
                                    spacing="2rem"
                                    width="100%"
                                >

                                    <TextQuestion
                                        fieldName="name"
                                        placeHolder="Name"
                                        label="Class Name"
                                        required={true}
                                        formikProps={formikProps}
                                    />
                                    <TextQuestion
                                        fieldName="description"
                                        placeHolder="Description"
                                        label="Description"
                                        formikProps={formikProps}
                                    />
                                    <IntegerQuestion
                                        fieldName="capacity"
                                        placeHolder={0}
                                        label="Capacity"
                                        formikProps={formikProps}
                                    />
                                    <DateTimeQuestion
                                        fieldName="class_time"
                                        placeHolder=""
                                        label="Class Date and Time"
                                        required={true}
                                        formikProps={formikProps}
                                    />
                                    {/* <DropdownQuestion 
                                        fieldName="registration" 
                                        label="Registration Status" 
                                        placeHolder=" "
                                        required={true}
                                        options={[
                                            { value: 'open', label: 'Open' },
                                            { value: 'closed', label: 'Closed' },
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
                                    {mode === "create" ? "Submit" : "Update"}
                                </Button>
                                {mode === "update" ? <DeleteClassButton pk={pk} /> : <></>}
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Form>
                )
            }}
        </Formik>
    );
}

export default CreateClassForm;