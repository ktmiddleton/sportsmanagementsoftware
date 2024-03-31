import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup, Select } from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";

/**
 * Serves as a formik dropdown question
 * 
 * Usage:
 *  <UserSelectQuestion 
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
 */
function UserSelectQuestion({ fieldName, placeHolder, label, users, formikProps, required  }) {

    function validateQuestion(value) {
        let error
        if (!value && required) {
          error = `${label} is required 😱`
        }
        return error
    }

    return (
        <Field name={fieldName} validate={validateQuestion}>
            {({ field, form }) => (
            <FormControl isInvalid={form.errors[fieldName] && form.touched[fieldName]}>
                <FormLabel fontSize="1.5rem">{label}</FormLabel>
                <InputGroup>
                    <Select {...field} placeholder={placeHolder}>
                        {users.map(user => (
                            <option key={user.username} value={user.username}>
                                {user.username}
                            </option>
                        ))}
                    </Select>
                </InputGroup>
                <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
            </FormControl>
            )}
        </Field>
    );
}

export default UserSelectQuestion;