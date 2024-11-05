"use client";
import Form from "@/components/Form";
import Heading from "@/components/Heading";
import { loginFields } from "@/utils/constants";

export default function Login() {
  const onSubmit = (formValues: object) => {
    console.log("object is submitted", formValues);
  };
  return (
    <div className="login-page">
      <Heading
        title="Welcome back"
        subtitle="fill below form and login"
        className="text-center"
      />
      <Form fields={loginFields} onSubmit={onSubmit} />
    </div>
  );
}
