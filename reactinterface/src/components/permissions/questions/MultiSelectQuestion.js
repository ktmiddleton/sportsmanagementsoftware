import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup, Select, CheckboxGroup, Checkbox } from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";

/**
 * Serves as a formik multi-select question
 * 
 * Usage:
 *  <MultiSelectQuestion 
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
function MultiSelectQuestion({ fieldName, checkedList, label, options, formikProps, required  }) {

    function validateQuestion(value) 
    {
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
                <CheckboxGroup defaultValue={checkedList}>
                    {options.map(option => (
                            <Checkbox isDisabled={option.value == 'user' ? true : false}{...field} key={option.value} value={option.value}>
                                {option.label}
                            </Checkbox>
                        ))}
                </CheckboxGroup>
                <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
            </FormControl>
            )}
        </Field>
    );
}

export default MultiSelectQuestion;