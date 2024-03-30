import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup, Select } from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";

/**
 * Serves as a formik dropdown question
 * 
 * Usage:
 *  <DropdownQuestion 
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
function DropdownQuestion({ fieldName, placeHolder, label, options, formikProps, required  }) {

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
                        {options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
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

export default DropdownQuestion;