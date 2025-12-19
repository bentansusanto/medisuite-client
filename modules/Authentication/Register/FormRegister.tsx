"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterMutation } from "@/store/services/authApi";
import { useFormik } from "formik";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { registerSchema } from "./schema";

export const FormRegister = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [register, { isLoading }] = useRegisterMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      phone_number: "",
      email: "",
      password: "",
      role_id: "c59fdefb-d0eb-4bbd-b709-fca5321f459b"
    },
    validate: (values) => {
      const result = registerSchema.safeParse(values);
      if (!result.success) {
        const errors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          if (issue.path[0]) {
            errors[issue.path[0] as string] = issue.message;
          }
        });
        return errors;
      }
      return {};
    },
    onSubmit: async (values) => {
      setStatusMessage(null); // Clear previous message
      try {
        await register(values).unwrap();
        setStatusMessage({
          type: "success",
          text: "Registration successful! Check your email for verification."
        });
        formik.resetForm();
      } catch (err: any) {
        setStatusMessage({
          type: "error",
          text: err?.data?.message || "Registration failed. Please try again."
        });
        console.error("Registration failed", err);
      }
    }
  });

  return (
    <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="sr-only">
            Name
          </Label>
          <Input
            id="name"
            type="text"
            className="w-full text-sm"
            placeholder="Name"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="mt-1 text-xs text-red-500">{formik.errors.name}</p>
          )}
        </div>
        <div>
          <Label htmlFor="phone" className="sr-only">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="text"
            className="w-full text-sm"
            placeholder="Phone Number"
            {...formik.getFieldProps("phone_number")}
          />
          {formik.touched.phone_number && formik.errors.phone_number && (
            <p className="mt-1 text-xs text-red-500">{formik.errors.phone_number}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email" className="sr-only">
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            className="w-full text-sm"
            placeholder="Email address"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-xs text-red-500">{formik.errors.email}</p>
          )}
        </div>
        <div>
          <Label htmlFor="password" className="sr-only">
            Password
          </Label>
          <div className="flex w-full items-center gap-3 rounded-md border border-gray-200 px-3">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              className="w-full border-none p-2 text-sm focus-visible:ring-0 focus-visible:ring-offset-0" // precise styling to match previous look/behavior
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
            <div className="cursor-pointer" onClick={handleShowPassword}>
              {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </div>
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="mt-1 text-xs text-red-500">{formik.errors.password}</p>
          )}
        </div>
      </div>

      <div>
        <Button
          type="submit"
          variant="default"
          disabled={isLoading}
          className="w-full bg-blue-500 text-[13px] hover:bg-blue-600">
          {isLoading ? "Loading..." : "Register Now"}
        </Button>
        {statusMessage && (
          <div
            className={`mt-4 rounded-md p-3 text-sm ${
              statusMessage.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}>
            {statusMessage.text}
          </div>
        )}
      </div>
    </form>
  );
};
