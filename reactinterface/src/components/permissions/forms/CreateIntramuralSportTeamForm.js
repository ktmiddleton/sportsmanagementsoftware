import React from "react";
import TextQuestion from "../questions/TextQuestion";
import { Form, Formik } from "formik";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";

import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup } from "@chakra-ui/react";
import { Field } from "formik";
import DropdownQuestion from "../questions/DropdownQuestion";
import DateTimeQuestion from "../questions/DateTimeQuestion";

function CreateIntramuralSportTeamForm({ isOpen, onClose, sportData }) {

    const toast = useToast()

    const submitForm = (formValues) => {
        console.log(formValues)
        let data = {
            ...formValues,
            sport: sportData.id,
            token: localStorage.getItem("token")
        }
        axios.post(
            `http://localhost:8000/intramurals/teams/`,
            data
        ).then((response) => {
            isOpen = !isOpen;
            window.location.reload();
            toast({
                title: 'Team successfully created.',
                description: "You've successfully created the team: " + formValues.name + ".",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }).catch((error) => {
            toast({
                title: 'Failed to create team.',
                description: "You've encountered an error creating the team " + error.response.data.error,
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
                                    <DropdownQuestion 
                                        fieldName="team_type" 
                                        label="Casual or Competitive" 
                                        placeHolder=" "
                                        required={true}
                                        options={[
                                            { value: 'casual', label: 'Casual' },
                                            { value: 'competitive', label: 'Competitive' },
                                        ]}
                                        formikProps={formikProps}
                                    />
                                    <DropdownQuestion 
                                        fieldName="registration" 
                                        label="Registration Status" 
                                        placeHolder=" "
                                        required={true}
                                        options={[
                                            { value: 'open', label: 'Open' },
                                            { value: 'closed', label: 'Closed' },
                                        ]}
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

export default CreateIntramuralSportTeamForm;