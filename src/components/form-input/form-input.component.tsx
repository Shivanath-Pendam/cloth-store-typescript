import { InputHTMLAttributes, FC } from 'react';

import {
  FormInputLabel,
  Input,
  Group
} from './form-input.styles';

type FormInputLabel = {
  label: string
} & InputHTMLAttributes<HTMLInputElement>

const FormInput: FC<FormInputLabel> = ({ label, ...otherProps }) => {

  return (
    <Group>
      <Input className="form-input" {...otherProps} />
      {label && (
        <FormInputLabel shrink={Boolean(
          otherProps.value &&
          typeof otherProps.value === 'string' &&
          otherProps.value.length
        )}
        >
          {label}
        </FormInputLabel>)}
    </Group>
  )
}

export default FormInput;
