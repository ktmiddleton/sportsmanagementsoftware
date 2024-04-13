import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup } from "@chakra-ui/react";
import { Field } from "formik";
import React, { useEffect, useState } from "react";
import RichTextEditor from 'react-rte';

/**
 * Serves as a formik text question
 * 
 * Usage:
 *  <RichTextQuestion
        fieldName="name"
        placeHolder="Name"
        label="Team Name"
        required={true}
        formikProps={formikProps}
    />
 */
function RichTextQuestion({ fieldName, placeHolder, label, formikProps, required  }) {
    const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString((formikProps.values[fieldName] ? formikProps.values[fieldName] : ""), "html"));

    function validateQuestion(value) {
        let error
        if (!value && required) {
          error = `${label} is required 😱`
        }
        return error
    }

    function onChange(value) {
        setEditorValue(value)
    }

    useEffect(() => {
        formikProps.setFieldValue(fieldName, editorValue.toString("html"));
    }, [editorValue])

    return (
        <Field name={fieldName} validate={validateQuestion}>
            {({ field, form }) => (
            <FormControl isInvalid={form.errors[fieldName] && form.touched[fieldName]}>
                <FormLabel fontSize="1.5rem">{label}</FormLabel>
                <RichTextEditor
                    value={editorValue}
                    onChange={onChange}
                />
                <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
            </FormControl>
            )}
        </Field>
    );
}

export default RichTextQuestion;