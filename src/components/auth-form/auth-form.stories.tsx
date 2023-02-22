import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AuthForm } from './auth-form';

export default {
  title: 'AuthForm',
  component: AuthForm,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof AuthForm>;

const Template: ComponentStory<typeof AuthForm> = (args) => (
  <div style={{ width: 320 }}>
    <AuthForm {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  isLoading: false,
  onSubmit: console.log,
};
