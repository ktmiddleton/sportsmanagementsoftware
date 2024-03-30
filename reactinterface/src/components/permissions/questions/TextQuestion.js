import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup } from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";

function TextQuestion({ fieldName, placeHolder, label, formikProps, required  }) {

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
                    <Input {...field} placeholder={placeHolder} />
                </InputGroup>
                <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
            </FormControl>
            )}
        </Field>
    );
}

export default TextQuestion;