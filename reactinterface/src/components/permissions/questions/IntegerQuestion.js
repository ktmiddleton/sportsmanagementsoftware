import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";

/**
 * Serves as a formik text question
 * 
 * Usage:
 *  <IntegerQuestion
        fieldName="name"
        placeHolder="Name"
        label="Team Name"
        required={true}
        formikProps={formikProps}
    />
 */
function IntegerQuestion({ fieldName, placeHolder, label, formikProps, required  }) {

    function validateQuestion(value) {
        let error
        if (!value && required) {
          error = `${label} is required 😱`
        } if (value < 0) {
            error = `${label} must be non-negative`
        }
        return error
    }

    return (
        <Field name={fieldName} validate={validateQuestion}>
            {({ field, form }) => (
            <FormControl isInvalid={form.errors[fieldName] && form.touched[fieldName]}>
                <FormLabel fontSize="1.5rem">{label}</FormLabel>
                <InputGroup>
                    <NumberInput
                        value={field.value}
                        onChange={(valueString) => form.setFieldValue(fieldName, valueString)}
                    >
                        <NumberInputField placeholder={placeHolder} {...field} id={fieldName} />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </InputGroup>
                <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
            </FormControl>
            )}
        </Field>
    );
}

export default IntegerQuestion;