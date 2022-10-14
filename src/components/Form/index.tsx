import React, { useEffect } from 'react';
import {
  FormProvider,
  useForm,
  useController,
  useFormContext,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  TextInput,
  InputBase,
  NativeSelect,
  Textarea as TextareaMantine,
  TextareaProps,
  ColorInput as ColorInputMantine,
} from '@mantine/core';
import InputMask from 'react-input-mask';
import PriceInput, { PriceInputProps } from './PriceInput';

interface Props {
  onSubmit: (data: any) => void;
  children: any;
  schema: Yup.AnyObjectSchema;
  defaultValues?: any;
  [key: string]: any;
}

type InputProps = {
  name: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  mask?: string;
  [key: string]: any;
};

type SelectProps = {
  name: string;
  data: { label: string; value: string }[];
  label?: string;
};

const Form: React.FC<Props> & {
  Input: React.FC<InputProps>;
  Select: React.FC<SelectProps>;
  Textarea: React.FC<TextareaProps>;
  ColorInput: React.FC<any>;
  PriceInput: React.FC<PriceInputProps>;
  NumberInput: React.FC<any>;
} = ({ onSubmit, children, schema, defaultValues, ...rest }: Props) => {
  const methods = useForm({ resolver: yupResolver(schema), defaultValues });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...rest}>
        {React.Children.map(children, (child) => {
          return child.props.name
            ? React.cloneElement(child, {
                ...methods.register(child.props.name),
                error: methods.formState.errors[child.props.name]?.message,
              })
            : child;
        })}
      </form>
    </FormProvider>
  );
};

const Input: React.FC<InputProps> = React.forwardRef(
  ({ type, mask, ...rest }: InputProps, ref) => {
    if (mask) {
      return (
        // @ts-ignore
        <InputBase ref={ref} {...rest} component={InputMask} mask={mask} />
      );
    }

    // @ts-ignore
    return <TextInput ref={ref} {...rest} type={type} />;
  },
);

const Textarea: React.FC<TextareaProps> = React.forwardRef(
  (props: TextareaProps, ref) => {
    // @ts-ignore
    return <TextareaMantine ref={ref} {...props} />;
  },
);

const Select: React.FC<SelectProps> = React.forwardRef(
  ({ data, ...rest }: SelectProps, ref) => {
    const { setValue } = useFormContext();
    const {
      field: { value },
    } = useController({ name: rest.name });

    useEffect(() => {
      if (data && data.length > 0 && !value) setValue(rest.name, data[0].value);
    }, [data]);

    return (
      <NativeSelect
        // @ts-ignore
        ref={ref}
        {...rest}
        data={data}
        onChange={(e) => {
          setValue(rest.name, e.target.value);
        }}
        value={value}
      />
    );
  },
);

const ColorInput: React.FC<any> = React.forwardRef((props, ref) => {
  const { setValue, getValues } = useFormContext();

  return (
    <ColorInputMantine
      {...props}
      ref={ref}
      defaultValue={getValues(props.name)}
      onChange={(e) => setValue(props.name, e)}
    />
  );
});

const NumberInput: React.FC<any> = React.forwardRef((props, ref) => {
  const { setValue, getValues } = useFormContext();

  return (
    <InputBase
      ref={ref}
      {...props}
      type="number"
      defaultValue={getValues(props.name)}
      onChange={(e: any) => setValue(props.name, e.target.valueAsNumber)}
    />
  );
});

Input.defaultProps = {
  type: undefined,
  label: '',
  mask: '',
};

Select.defaultProps = {
  label: '',
};

Form.Input = Input;
Form.Select = Select;
Form.Textarea = Textarea;
Form.ColorInput = ColorInput;
Form.PriceInput = PriceInput;
Form.NumberInput = NumberInput;

Form.defaultProps = {
  // schema: {},
  defaultValues: {},
};

export default Form;
