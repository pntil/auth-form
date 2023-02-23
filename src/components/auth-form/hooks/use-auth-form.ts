import {
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
  RefObject,
  useCallback,
  useRef,
  useState,
} from 'react';

import type {
  AuthFormData,
  AuthFormError,
  AuthFormErrors,
} from '../auth-form.types';

import {
  checkEmailIsValid,
  checkPasswordIsValid,
  checkFormIsValid,
} from '../utils/validation';

type UseAuthFormTypeParams = { onSubmit(param: AuthFormData): void };

type UseAuthForm = (params: UseAuthFormTypeParams) => {
  email: string;
  password: string;
  handleEmailChange: ChangeEventHandler<HTMLInputElement>;
  handlePasswordChange: ChangeEventHandler<HTMLInputElement>;
  handleSubmit: FormEventHandler;
  isSubmitted: boolean;
  errors: AuthFormErrors;
  setRootError(error: AuthFormError): void;
  emailInputRef: RefObject<HTMLInputElement>;
  passwordInputRef: RefObject<HTMLInputElement>;
};

export const useAuthForm: UseAuthForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<AuthFormErrors>({});

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const selectEmailInput = () => emailInputRef.current?.select();
  const selectPasswordInput = () => passwordInputRef.current?.select();

  const handleEmailChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setEmail(value);

      if (isSubmitted) {
        setErrors((errors) => ({
          ...errors,
          email: checkEmailIsValid(value),
          root: undefined,
        }));
      }
    },
    [isSubmitted]
  );

  const handlePasswordChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setPassword(value);

      if (isSubmitted) {
        setErrors((errors) => ({
          ...errors,
          password: checkPasswordIsValid(value),
          root: undefined,
        }));
      }
    },
    [isSubmitted]
  );

  const handleSubmit: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();

      if (!isSubmitted) {
        setIsSubmitted(true);
      }

      const nextErrors = {
        ...errors,
        email: checkEmailIsValid(email),
        password: checkPasswordIsValid(password),
      };

      setErrors(nextErrors);

      const isFormValid = checkFormIsValid(nextErrors);

      if (isFormValid) {
        onSubmit({ email, password });
      } else {
        if (nextErrors.root || nextErrors.email) selectEmailInput();
        else if (nextErrors.password) selectPasswordInput();
      }
    },
    [email, errors, isSubmitted, onSubmit, password]
  );

  const setRootError = useCallback((error: AuthFormError) => {
    setErrors((errors) => ({ ...errors, root: error }));
    if (error) selectEmailInput();
  }, []);

  return {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    isSubmitted,
    errors,
    setRootError,
    emailInputRef,
    passwordInputRef,
  };
};
