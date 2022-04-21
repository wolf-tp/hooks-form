import { useState, useCallback } from 'react';

type ValidateRules<T = any> = (
  input: T | undefined,
  data?: any
) => string | boolean | undefined;

type TypeInputData<T> =
  | []
  | [ValidateRules<T>[] | undefined]
  | [
      /* Validate */ ValidateRules<T>[] | undefined,
      /* Default Value */ T | null
    ];
type Props<T> = {
  [key in keyof T]?: TypeInputData<T[key]>;
};
export type ValidateParams = {
  hideError?: boolean;
};
export const useForm = <T>(props: Props<T>) => {
  // Init Data in form
  const [formData, setFormData] = useState<FormDataType<T>>(
    (() => {
      const formObject: FormDataType<T> = {} as FormDataType<T>;
      (Object.keys(props) as (keyof T)[]).forEach((key) => {
        const propsField = props[key];
        const fieldLength = Number(propsField?.length);
        const isValidInitField =
          fieldLength > 1 && !Array.isArray(props[key]?.[fieldLength - 1]);

        const valueField = isValidInitField
          ? props[key]?.[fieldLength - 1]
          : '';

        formObject[key] = valueField as any;
      });
      return formObject;
    })()
  );
  const [errors, setErrors] = useState<FormDataOptionalType<T>>({});

  const onValidateField = <Key extends keyof T>(key: Key, value?: T[Key]) => {
    const [validateList] = props[key] || [];
    let errorMessage: ReturnType<ValidateRules> = '';
    validateList &&
      validateList?.every((funcValidate) => {
        const errMessage = funcValidate(value, formData);
        errMessage && (errorMessage = errMessage ?? '');
        return !errorMessage;
      });
    return errorMessage;
  };

  const onChange = useCallback(
    <Key extends keyof T>(key: Key) => {
      return (value?: T[Key]) => {
        const errorsValidate: FormDataOptionalType<T> = {
          ...errors,
          [key]: undefined,
        };
        const errorMessage = onValidateField(key, value);
        errorMessage && (errorsValidate[key] = errorMessage);

        setErrors({ ...errorsValidate });
        setFormData({ ...formData, [key]: value });
      };
    },
    [formData, errors]
  );

  const onValidate = useCallback(
    ({ hideError }: ValidateParams = {}): ReturnTypeValidate<T> => {
      // Error Object
      const errorsValidate: FormDataOptionalType<T> = {};
      // Loop for object and assign error
      for (const [key, value] of Object.entries(formData) as [
        keyof T,
        T[keyof T]
      ][]) {
        const errorMessage = onValidateField(key, value);
        errorMessage && (errorsValidate[key] = errorMessage);
      }
      !hideError && setErrors(errorsValidate);
      return [!Object.keys(errorsValidate).length, formData];
    },
    [formData]
  );
  const register = useCallback(
    <Key extends keyof T>(key: Key) => ({
      value: formData[key],
      errorMessage: errors[key],
      onChangeText: onChange(key),
    }),
    [onChange, formData, errors]
  );

  return { formData, errors, onChange, onValidate, register };
};
