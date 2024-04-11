import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup, Select, CheckboxGroup, Checkbox, Stack, Wrap } from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";

/**
 * Serves as a formik multi-select question
 * 
 * Usage:
 *  <ConfirmCheckbox 
        fieldName="registration" 
        label="Registration Status" 
        placeHolder=" "
        required={true}
        formikProps={formikProps}
    />
 */
function ConfirmCheckbox({ fieldName, label, formikProps, trueRequired, checkboxLabel, required  }) {

    function validateQuestion(value) 
    {
        let error
        if (!value && trueRequired) {
          error = `${label} must be checked`
        }
        return error
    }

    return (
        <Field name={fieldName} validate={validateQuestion}>
            {({ field, form }) => (
            <FormControl isInvalid={form.errors[fieldName] && form.touched[fieldName]}>
                <FormLabel fontSize="1.5rem">{label}</FormLabel>
                <Wrap
                    direction="row"
                >
                    <Checkbox
                        {...field}
                        isChecked={field.value || false}
                        key={field.value}
                        value={field.value}
                        onBlur={() => form.setFieldTouched(fieldName, true)}
                    >
                        {checkboxLabel}
                    </Checkbox>
                </Wrap>
                <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
            </FormControl>
            )}
        </Field>
    );
}

export default ConfirmCheckbox;