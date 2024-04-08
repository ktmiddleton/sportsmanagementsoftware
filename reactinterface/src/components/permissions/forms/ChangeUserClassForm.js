import React from "react";
import TextQuestion from "../questions/TextQuestion";
import { Form, Formik } from "formik";
import { Heading, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";

import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup } from "@chakra-ui/react";
import { Field } from "formik";
import DropdownQuestion from "../questions/DropdownQuestion";
import MultiSelectQuestion from "../questions/MultiSelectQuestion";
import { useUser } from "../../UserContext";



function ChangeUserClassForm({ isOpen, onClose, username}) {

    var userGroups = [];
    const { user, loadUserData, userHasGroup, userHasPerm } = useUser();

    if (userHasGroup("admin") == true) 
    {
        userGroups.push("admin")
    }
    else if (userHasGroup("captain") == true) 
    {
        userGroups.push("captain")
    }
    else if (userHasGroup("instructor") == true) 
    {
        userGroups.push("instructor")
    }
    else if (userHasGroup("referee") == true) 
    {
        userGroups.push("referee")
    }
    else
    {
        userGroups.push("user")
    }
    
    const toast = useToast()

    const submitForm = (formValues) => {
        console.log(formValues)
        let data = {
            ...formValues,
            token: localStorage.getItem("token")
        }
        axios.post(
            `http://localhost:8000/user/addGroup`,
            data
        ).then((response) => {
            isOpen = !isOpen;
            window.location.reload();
            toast({
                title: 'The user ' + {username} + ' has been added to group ' + {formValues},
                description: "",
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
                            <ModalHeader>Change User Class</ModalHeader>
                            
                            <ModalCloseButton />

                            <ModalBody> {/* Put questions in here */}
                                <VStack
                                    spacing="2rem"
                                    width="100%"
                                >
                                    <Heading>
                                        Current User Class: {}
                                    </Heading>
                                    <MultiSelectQuestion 
                                        fieldName="userclass" 
                                        label="User Class" 
                                        checkedList={userGroups}
                                        required={true}
                                        options={[
                                            { value: 'captain', label: 'Captain' },
                                            { value: 'referee', label: 'Referee' },
                                            { value: 'user', label: 'User' },
                                            { value: 'instructor', label: 'Instructor' },
                                            { value: 'admin', label: 'Admin' },
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

export default ChangeUserClassForm;