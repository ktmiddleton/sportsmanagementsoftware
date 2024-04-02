import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";
import DateTimePicker from 'react-datetime-picker';

/**
 * Serves as a formik text question
 * 
 * Usage:
 *  <DateTimeQuestion
        fieldName="name"
        placeHolder="Name"
        label="Team Name"
        required={true}
        formikProps={formikProps}
    />
 */
function DateTimeQuestion({ fieldName, placeHolder, label, formikProps, required  }) {

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
                    <DateTimePicker onChange={(value) => form.setFieldValue(fieldName, value)} value={field.value} />
                </InputGroup>
                <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
            </FormControl>
            )}
        </Field>
    );
}

export default DateTimeQuestion;