"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const FormLogin = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  return (
    <form className="mt-8 space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="email" className="sr-only">
            Email address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full text-sm"
            placeholder="Email address"
          />
        </div>
        <div>
          <Label htmlFor="password" className="sr-only">
            Password
          </Label>
          <div className="flex w-full items-center gap-3 rounded-md border border-gray-200 px-3">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              className="w-full border-none p-2 text-sm"
              placeholder="Password"
            />
            <div className="cursor-pointer" onClick={handleShowPassword}>
              {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </div>
          </div>
        </div>
        <div>
          <Link href="#" className="underline-none float-right pb-4 text-sm">
            Forgot your password?
          </Link>
        </div>
      </div>

      <div>
        <Button
          type="submit"
          variant="default"
          className="w-full bg-blue-500 text-[13px] hover:bg-blue-600">
          Login Now
        </Button>
      </div>
    </form>
  );
};
