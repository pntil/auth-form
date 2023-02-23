import { FC, MouseEventHandler, useEffect } from 'react';

import { cn } from 'utils/cn';

import { AuthFormData, AuthFormError } from './auth-form.types';

import { useAuthForm } from './hooks/use-auth-form';
import { useTriggerErrorAnimation } from './hooks/use-trigger-error-animation';

import { Button } from 'components/button/button';
import { Input } from 'components/input/input';

import './auth-form.css';

interface AuthFormProps {
  isLoading: boolean;
  onRestorePasswordClick(): void;
  onSubmit(data: AuthFormData): void;
  rootError?: AuthFormError;
}

const cnAuthForm = cn('auth-form');

export const AuthForm: FC<AuthFormProps> = ({
  isLoading,
  onRestorePasswordClick,
  onSubmit,
  rootError,
}) => {
  const {
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
  } = useAuthForm({ onSubmit });

  const { isErrorAnimationTriggered, triggerErrorAnimation } =
    useTriggerErrorAnimation();

  const hasEmailError = Boolean(errors.email);
  const hasPasswordError = Boolean(errors.password);
  const hasRootError = Boolean(errors.root);
  const hasError = hasEmailError || hasPasswordError || hasRootError;

  const handleSubmitClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (hasError) {
      triggerErrorAnimation();
    }
  };

  useEffect(() => {
    setRootError(rootError);
    if (rootError) {
      triggerErrorAnimation();
    }
  }, [rootError, setRootError, triggerErrorAnimation]);

  // A particular case of submitting for the first time with erroneous values,
  // i.e. for once when isSubmitted goes from false to true...
  useEffect(() => {
    if (hasError) {
      triggerErrorAnimation();
    }
    // ...therefore, we don't want hasError as a dependency here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted]);

  return (
    <form className={cnAuthForm({ error: hasError })} onSubmit={handleSubmit}>
      <h1 className={cnAuthForm('heading')}>Wlecome back</h1>

      <label
        className={cnAuthForm('field', { error: hasEmailError })}
        htmlFor="auth-form:email"
      >
        <Input
          className={cnAuthForm('input')}
          name="email"
          id="auth-form:email"
          placeholder="Email"
          type="text"
          value={email}
          tabIndex={10}
          autoComplete="email"
          hasError={hasEmailError}
          inputRef={emailInputRef}
          onChange={handleEmailChange}
        />
        <div className={cnAuthForm('field-underside')}>
          {hasEmailError && (
            <div className={cnAuthForm('field-error')}>
              {errors.email?.message}
            </div>
          )}
        </div>
      </label>

      <label
        className={cnAuthForm('field', { error: hasPasswordError })}
        htmlFor="auth-form:password"
      >
        <Input
          className={cnAuthForm('input')}
          name="password"
          id="auth-form:password"
          placeholder="Password"
          type="password"
          value={password}
          tabIndex={20}
          autoComplete="current-password"
          hasError={hasPasswordError}
          inputRef={passwordInputRef}
          onChange={handlePasswordChange}
        />
        <div className={cnAuthForm('field-underside')}>
          <Button
            className={cnAuthForm('forgot-password')}
            type="button"
            appearance="plain"
            label="Forgot password?"
            tabIndex={40}
            onClick={onRestorePasswordClick}
          />
          {hasPasswordError && (
            <div className={cnAuthForm('field-error')}>
              {errors.password?.message}
            </div>
          )}
        </div>
      </label>

      {hasRootError && (
        <div className={cnAuthForm('root-error')}>
          ⚠️ {errors.root?.message}
        </div>
      )}

      <div className={cnAuthForm('controls')}>
        {isLoading && <div className={cnAuthForm('loader')} />}
        <Button
          className={cnAuthForm('submit', {
            wiggle: isErrorAnimationTriggered,
          })}
          type="submit"
          disabled={isLoading}
          appearance="submit"
          label="Sign in"
          tabIndex={30}
          onClick={handleSubmitClick}
        />
      </div>
    </form>
  );
};
