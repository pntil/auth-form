import { ChangeEvent, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Input } from './input';

export default {
  title: 'Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => {
  const [value, setValue] = useState('');
  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setValue(value);
  };

  return (
    // <div style={{ width: 320, paddingTop:paddingLeft: 40 }}>
    <Input {...args} value={value} onChange={handleChange} />
    // </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  id: 'email',
  type: 'text',
  placeholder: 'Email',
};
