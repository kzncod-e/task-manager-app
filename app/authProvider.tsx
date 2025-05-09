import React from "react";
import { Authenticator, Placeholder } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { signUp } from "aws-amplify/auth";
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || "",
      userPoolClientId:
        process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "",
    },
  },
});
const formFields = {
  signUp: {
    username: {
      order: 1,
      Placeholder: "Choose a username",
      label: "Username",
      inputProps: {
        required: true,
      },
    },
    email: {
      order: 2,
      Placeholder: "Enter your email address",
      label: "Email",
      inputProps: {
        required: true,
        type: "email",
      },
    },
    given_name: {
      order: 2,
      Placeholder: "Enter your first name or given name",
      label: "First Name or Given Name",
      inputProps: {
        required: true,
      },
    },
    password: {
      order: 3,
      Placeholder: "Enter your password",
      label: "Password",
      inputProps: {
        required: true,
        type: "password",
      },
    },
    confirm_password: {
      order: 4,
      Placeholder: "Confirm your password",
      label: "Confirm Password",
      inputProps: {
        required: true,
        type: "password",
      },
    },
  },
};
const AuthProvider = ({ children }) => {
  return (
    <div className="mt-5">
      <Authenticator formFields={formFields}>
        {({ user }) =>
          user ? (
            <div>{children}</div>
          ) : (
            <div>
              <h1>Please sign in below:</h1>
            </div>
          )
        }
      </Authenticator>
    </div>
  );
};

export default AuthProvider;
