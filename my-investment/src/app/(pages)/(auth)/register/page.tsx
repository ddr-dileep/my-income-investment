"use client";
import Form from "@/components/Form";
import Heading from "@/components/Heading";
import { registerFields } from "@/utils/constants";

export default function RegisterPage() {
  const onSubmit = (formValues: any) => {
    console.log("object is submitted", formValues);
  };
  return (
    <div className="register-page">
      <Heading
        title="Welcome to Portfolio"
        subtitle="fill below form and register"
        className="text-center"
      />
      <Form fields={registerFields} onSubmit={onSubmit} />
    </div>
  );
}
