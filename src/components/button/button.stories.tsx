import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './button';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Plain = Template.bind({});
Plain.args = {
  label: 'Plain Button',
  appearance: 'plain',
};

export const Submit = Template.bind({});
Submit.args = {
  label: 'Submit Button',
  appearance: 'submit',
};
