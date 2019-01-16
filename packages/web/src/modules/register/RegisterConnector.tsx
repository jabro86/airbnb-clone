import { RegisterController } from "@abb/controller";
import * as React from "react";

import { RegisterView } from "./view/RegisterView";

class RegisterConnector extends React.PureComponent {
  render() {
    return (
      <RegisterController>
        {({ submit }: { submit: any }) => <RegisterView submit={submit} />}
      </RegisterController>
    );
  }
}

export { RegisterConnector };
