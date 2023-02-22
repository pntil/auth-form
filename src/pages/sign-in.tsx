import { FC } from 'react';

import { Layout } from 'components/layout/layout';
import { Logo } from 'components/logo/logo';
import { AuthFormContainer } from 'components/auth-form/auth-form.container';

export const SignInPage: FC = () => {
  return (
    <Layout noHeader>
      <Logo />
      <AuthFormContainer />
    </Layout>
  );
};

export default SignInPage;
