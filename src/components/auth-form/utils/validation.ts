import {
  AuthFormErrors,
  AuthFormValidationRules,
  ValidationRule,
} from '../auth-form.types';

const validationRules: AuthFormValidationRules = {
  email: [
    {
      validate: (v) => /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v),
      message: 'Please enter a valid email',
    },
  ],
  password: [
    {
      validate: (v) => v.length > 0,
      message: 'Password is required',
    },
  ],
};

const resolveField = (value: string, rules: ValidationRule[]) => {
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];

    if (!rule.validate(value)) {
      return { message: rule.message };
    }
  }
};

export const validateEmail = (value: string) =>
  resolveField(value, validationRules.email);

export const validatePassword = (value: string) =>
  resolveField(value, validationRules.password);

export const checkFormIsValid = (errors: AuthFormErrors) =>
  !Object.values(errors).some((error) => typeof error !== 'undefined');
