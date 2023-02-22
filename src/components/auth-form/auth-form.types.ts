type FieldName = 'email' | 'password';
type FieldValues = Record<FieldName, string>;

export interface AuthFormData extends FieldValues {}

type ValidationValue = string;

export type ValidationRule = {
  validate: (value: ValidationValue) => boolean;
  message: string;
};

export type AuthFormValidationRules = Record<FieldName, ValidationRule[]>;

type Error = {
  message: string;
};

export type AuthFormError = Error | undefined;

export type AuthFormErrors = {
  [K in keyof FieldValues]?: Error;
} & {
  root?: Error;
};
