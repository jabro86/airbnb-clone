import gql from "graphql-tag";
import * as React from "react";
import { graphql, ChildProps } from "react-apollo";
import {
  RegisterMutation,
  RegisterMutationVariables
} from "./__generated__/RegisterMutation";

interface Props {
  children: (
    data: { submit: (values: RegisterMutationVariables) => Promise<null> }
  ) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildProps<Props, RegisterMutation, RegisterMutationVariables>
> {
  submit = async (values: RegisterMutationVariables) => {
    console.log(values);
    if (!this.props.mutate) {
      throw new Error(`Cannot find mutate on RegisterController props`);
    }
    const response = await this.props.mutate({
      variables: values
    });
    console.log("response:", response);
    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}

const registerMutation = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      path
      message
    }
  }
`;

const RegisterController = graphql<
  Props,
  RegisterMutation,
  RegisterMutationVariables
>(registerMutation)(C);

export { RegisterController };
