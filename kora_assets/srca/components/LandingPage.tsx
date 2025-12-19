import { ImageWithFallback } from "./figma/ImageWithFallback";
import koraLogoImage from "figma:asset/8e3476fc29c802a2e8b95a923c5f6ee91e5f295d.png";
import { useState } from "react";
import { Eye, EyeOff, LogIn, CreditCard } from "lucide-react";

interface LandingPageProps {
  onExploreProperties: () => void;
  onLoginRegister: () => void;
  onCreateAccount: () => void;
  onQuickPay: () => void;
  onDemoLogin?: () => void; // For testing multi-role flow
}

export function LandingPage({
  onExploreProperties,
  onLoginRegister,
  onCreateAccount,
  onQuickPay,
  onDemoLogin,
}: LandingPageProps) {
  const [authMethod, setAuthMethod] = useState<
    "email" | "mobile"
  >("email");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
    mobileNumber: "",
    otpCode: "",
  });

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginRegister();
  };

  const handleSendOTP = () => {
    // Handle OTP sending logic
    console.log("Sending OTP to:", formData.mobileNumber);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col px-5 py-6 max-w-md mx-auto w-full">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <ImageWithFallback
            src={koraLogoImage}
            alt="Kora Properties"
            className="h-10 w-auto"
          />
        </div>

        {/* Welcome Heading */}
        <h1 className="text-black text-center mb-3">Welcome</h1>

        {/* Tagline */}
        <p className="text-gray-600 text-center mb-6 text-sm leading-5">
          Sign in to view exclusive Kora projects and available
          units.
        </p>

        {/* Info Box */}
        <div className="bg-[rgba(0,91,120,0.08)] border border-[rgba(43,127,255,0.2)] rounded-2xl p-4 mb-8">
          <p className="text-[#0066cc] text-sm leading-[22.75px]">
            <span className="font-bold">New user?</span> Click
            &quot;Try Demo Account&quot; below to explore the
            app instantly, or create a new account to get
            started.
          </p>
        </div>

        {/* Auth Method Tabs */}
        <div className="bg-gray-50 border border-gray-200 rounded-[10px] p-1 mb-6">
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => setAuthMethod("email")}
              className={`py-3 rounded-lg text-sm transition-colors ${
                authMethod === "email"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500"
              }`}
            >
              Email & Password
            </button>
            <button
              onClick={() => setAuthMethod("mobile")}
              className={`py-3 rounded-lg text-sm transition-colors ${
                authMethod === "mobile"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500"
              }`}
            >
              Mobile + OTP
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSignIn}
          className="space-y-4 mb-6"
        >
          {authMethod === "email" ? (
            <>
              {/* Email/Username Input */}
              <div>
                <label className="block text-gray-600 text-sm mb-2.5">
                  Email or Username
                </label>
                <input
                  type="text"
                  value={formData.emailOrUsername}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emailOrUsername: e.target.value,
                    })
                  }
                  placeholder="Enter your email or username"
                  className="w-full h-[58px] bg-white border border-gray-200 rounded-2xl px-4 text-black text-base placeholder:text-gray-400 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-gray-600 text-sm mb-2.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                    placeholder="Enter your password"
                    className="w-full h-[58px] bg-white border border-gray-200 rounded-2xl px-4 pr-12 text-black text-base placeholder:text-gray-400 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Mobile Number Input */}
              <div>
                <label className="block text-gray-600 text-sm mb-2.5">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mobileNumber: e.target.value,
                    })
                  }
                  placeholder="+971 50 123 4567"
                  className="w-full h-[58px] bg-white border border-gray-200 rounded-2xl px-4 text-black text-base placeholder:text-gray-400 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
                />
              </div>

              {/* OTP Code Input */}
              <div>
                <label className="block text-gray-600 text-sm mb-2.5">
                  OTP Code
                </label>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={formData.otpCode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        otpCode: e.target.value,
                      })
                    }
                    placeholder="Enter OTP"
                    className="w-full h-[58px] bg-white border border-gray-200 rounded-2xl px-4 text-black text-base placeholder:text-gray-400 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
                  />
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    className="w-full h-[58px] bg-gray-100 border border-gray-300 text-gray-700 rounded-2xl text-base font-normal hover:bg-gray-200 transition-colors"
                  >
                    Send OTP
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onLoginRegister}
              className="text-[#005B78] text-sm hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full h-[56px] bg-[#005B78] text-white rounded-2xl text-base font-normal hover:bg-[#004a61] transition-colors flex items-center justify-center gap-2 shadow-md text-[16px]"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </button>

          {/* Social Sign In Section */}
          <div className="space-y-3">
            <p className="text-center text-gray-500 text-sm">
              or continue with
            </p>

            {/* Continue with Google */}
            <button
              type="button"
              onClick={onLoginRegister}
              className="w-full h-[56px] bg-white border border-gray-300 rounded-2xl text-base font-normal text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            {/* Continue with Apple */}
            <button
              type="button"
              onClick={onLoginRegister}
              className="w-full h-[56px] bg-black border border-black rounded-2xl text-base font-normal text-white hover:bg-gray-900 transition-colors flex items-center justify-center gap-3"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09l-.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Continue with Apple
            </button>
          </div>
        </form>

        {/* Divider with "or" */}
        <div className="relative h-5 mb-8">
          <div className="absolute top-[9px] left-0 right-0 border-t border-gray-200" />
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-white px-4">
            <p className="text-gray-400 text-sm leading-5">
              or
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 mb-6">
          {/* Try Demo Account */}
          <button
            onClick={onDemoLogin}
            className="w-full h-[58px] rounded-2xl border border-[#005B78] text-[#005B78] text-base leading-6 font-normal hover:bg-[#005B78]/5 transition-colors"
          >
            Try Demo Account
          </button>
          <p className="text-gray-500 text-xs text-center leading-4 -mt-2">
            Quick access with pre-loaded demo data
          </p>

          {/* Quick Pay Button - NEW */}
          <button
            onClick={onQuickPay}
            className="w-full h-[58px] rounded-2xl bg-gradient-to-r from-[#005B78] to-[#007a9e] text-white text-base leading-6 font-normal hover:opacity-90 transition-opacity flex items-center justify-center gap-3 shadow-md"
          >
            <CreditCard className="w-5 h-5" />
            Quick Pay
          </button>

          {/* Create New Account */}
          <button
            onClick={onCreateAccount}
            className="w-full h-[58px] rounded-2xl border border-gray-300 text-gray-700 text-base leading-6 font-normal hover:bg-gray-50 transition-colors"
          >
            Create New Account
          </button>

          {/* Continue as Guest - Browse Properties */}
          <button
            onClick={onExploreProperties}
            className="w-full h-[58px] rounded-2xl border border-gray-300 text-gray-600 text-base leading-6 font-normal hover:bg-gray-50 transition-colors"
          >
            Continue as Guest
          </button>
          <p className="text-gray-400 text-xs text-center leading-4 -mt-2">
            Browse available inventory only
          </p>
        </div>
      </div>
    </div>
  );
}