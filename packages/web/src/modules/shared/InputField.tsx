import { Form, Input } from "antd";
import { FieldProps } from "formik";
import * as React from "react";

const InputField: React.SFC<FieldProps<any> & {prefix: React.ReactNode}> = ({
  field,
  form: { touched, errors },
  ...props
}) => {
  const errorMessage = touched[field.name] && errors[field.name];
  return (
    <Form.Item
      help={errorMessage}
      validateStatus={errorMessage ? "error" : undefined}
    >
      <Input {...field} {...props} />
    </Form.Item>
  );
};

export { InputField };
