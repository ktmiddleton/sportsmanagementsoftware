import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup, Select } from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";

/**
 * Serves as a formik true or false question
 * 
 * Usage:
 *  <TrueFalseQuestion 
        fieldName="registration" 
        label="Registration Status" 
        placeHolder=" "
        required={true}
        trueOptionRequired={true} // The true option must be selected in order to submit this form
        formikProps={formikProps}
    />
 */
function TrueFalseQuestion({ fieldName, placeHolder, label, formikProps, required, trueOptionRequired  }) {

    function validateQuestion(value) {
        let error
        console.log(typeof(value))
        if (value === placeHolder && required) {
          error = `${label} is required 😱`
        } else if ((value === "false" || value === placeHolder) && trueOptionRequired) {
            error = `${label} must be set to true to submit`
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
                        <option key={true} value={true}>
                            True
                        </option>
                        <option key={false} value={false}>
                            False
                        </option>
                    </Select>
                </InputGroup>
                <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
            </FormControl>
            )}
        </Field>
    );
}

export default TrueFalseQuestion;