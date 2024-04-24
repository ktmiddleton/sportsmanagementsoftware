import React from "react";
import TextQuestion from "../questions/TextQuestion";
import { Form, Formik } from "formik";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";

import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup } from "@chakra-ui/react";
import { Field } from "formik";
import DropdownQuestion from "../questions/DropdownQuestion";
import DateTimeQuestion from "../questions/DateTimeQuestion";

function CreateIntramuralSportForm({ isOpen, onClose }) {

    const toast = useToast()

    const submitForm = (formValues) => {
        console.log(formValues)
        let data = {
            ...formValues,
            token: localStorage.getItem("token")
        }
        axios.post(
            `${process.env.REACT_APP_DJANGO_SERVER_URL}/intramurals/`,
            data
        ).then((response) => {
            isOpen = !isOpen;
            window.location.reload();
            toast({
                title: 'Intramural Sport successfully created.',
                description: "You've successfully created the sport: " + formValues.name + ".",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }).catch((error) => {
            toast({
                title: 'Failed to create Intramural Sport.',
                description: "You've encountered an error creating the Intramural Sport " + error.response.data.error,
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
            enableReinitialize
        >
            {(formikProps) => {

                return (
                <Form>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Create Intramural Sport</ModalHeader>
                            
                            <ModalCloseButton />

                            <ModalBody> {/* Put questions in here */}
                                <VStack
                                    spacing="2rem"
                                    width="100%"
                                >

                                    <TextQuestion
                                        fieldName="name"
                                        placeHolder="Name"
                                        label="Team Name"
                                        required={true}
                                        formikProps={formikProps}
                                    />
                                    <TextQuestion
                                        fieldName="description"
                                        placeHolder="Description"
                                        label="Team Description"
                                        formikProps={formikProps}
                                    />
                                    <DateTimeQuestion
                                        fieldName="registration_opens"
                                        placeHolder=""
                                        label="Registration Opens"
                                        required={true}
                                        formikProps={formikProps}
                                    />
                                    <DateTimeQuestion
                                        fieldName="registration_deadline"
                                        placeHolder=""
                                        label="Registration Deadline"
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

export default CreateIntramuralSportForm;