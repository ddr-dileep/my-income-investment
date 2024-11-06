"use client";

import { authAPI } from "@/api/auth";
import Form from "@/components/Form";
import Heading from "@/components/Heading";
import { loginFields } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (formValues: object) => {
    setError(null);
    setLoading(true);

    try {
      console.log("Form submitted:", formValues);
      const response = await authAPI.login(formValues);

      console.log("Login successful:", response);
      if (response?.success === true) {
        localStorage.setItem("token", response?.data?.token);

        // user info api
        const resp = await authAPI.userInfo();
        localStorage.setItem("user-info", JSON.stringify(resp?.data));
        router.push("/dashboard");
        alert(response.message);
      }
    } catch (err) {
      console.log(err);
      setError("Failed to log in. Please check your credentials."); // Custom error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Heading
        title="Welcome back"
        subtitle="Fill below form and login"
        className="text-center"
      />
      <Form fields={loginFields} onSubmit={onSubmit} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
