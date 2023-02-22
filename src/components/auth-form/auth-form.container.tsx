import { FC } from 'react';

import { useAuthMutation } from 'hooks/useAuthMutation';

import { AuthFormData, AuthFormError } from './auth-form.types';
import { AuthForm } from './auth-form';

export const AuthFormContainer: FC = () => {
  const { error, isLoading, mutate } =
    useAuthMutation<AuthFormData, AuthFormError>();

  const handleSubmit = (data: AuthFormData) => {
    mutate(data);
  };

  const restorePassword = () => {
    alert('Too bad!');
  };

  return (
    <AuthForm
      isLoading={isLoading}
      onRestorePasswordClick={restorePassword}
      onSubmit={handleSubmit}
      rootError={error}
    />
  );
};
