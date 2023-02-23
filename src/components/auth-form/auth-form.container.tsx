import { FC } from 'react';

import { useAuthMutation } from 'hooks/useAuthMutation';

import { AuthFormData, AuthFormError } from './auth-form.types';
import { AuthForm } from './auth-form';

// A container is where all external logic gets connected to our component.
// We could think about a container as a viewmodel from MVVM and the inner component as a view.
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
