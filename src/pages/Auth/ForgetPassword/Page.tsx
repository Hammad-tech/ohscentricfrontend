import { useState } from "react";
import { ArrowLeft, ArrowRight, Mail, Shield, Check, AlertCircle, Zap, FileText, Clock, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address.");
        return;
      }

      setIsEmailSent(true);
      startResendTimer();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const startResendTimer = () => {
    setResendTimer(60);
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    startResendTimer();
    alert("Password reset email resent successfully!");
  };

  const handleBackToLogin = () => {
    navigate('/login')
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">Ohsist</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Reset Your{" "}
                <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  Password
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
                No worries! We'll send you a secure link to reset your password and get you back to managing workplace safety.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Secure Process</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Encrypted reset links</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Quick Recovery</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Reset in minutes</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Account Safety</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Your data stays secure</p>
                </div>
              </div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-100 dark:border-amber-800">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2">
                    Need Additional Help?
                  </h3>
                  <div className="text-sm text-amber-700 dark:text-amber-300 space-y-2">
                    <p>• Check your spam/junk folder for the reset email</p>
                    <p>• Reset links expire after 24 hours for security</p>
                    <p>• Contact support if you don't receive the email</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:sticky lg:top-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {isEmailSent ? "Check Your Email" : "Forgot Password"}
                </h2>
                <p className="text-blue-100">
                  {isEmailSent 
                    ? "We've sent you a password reset link" 
                    : "Enter your email to receive reset instructions"
                  }
                </p>
              </div>
              <div className="p-6 sm:p-8">
                {!isEmailSent ? (
                  <>
                    {error && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-4 rounded-lg mb-6 flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        {error}
                      </div>
                    )}
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            placeholder="Enter your email address"
                          />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          We'll send password reset instructions to this email
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isLoading || !email}
                        className="w-full flex justify-center items-center py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Sending Reset Link...
                          </div>
                        ) : (
                          <>
                            Send Reset Instructions
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleBackToLogin}
                        className="w-full flex justify-center items-center py-3 px-6 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                      >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Sign In
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                      <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Reset Link Sent!
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        We've sent password reset instructions to:
                      </p>
                      <p className="font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 py-2 px-4 rounded-lg">
                        {email}
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Next Steps:</h4>
                      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1 text-left">
                        <p>1. Check your email inbox (and spam folder)</p>
                        <p>2. Click the reset link in the email</p>
                        <p>3. Create your new password</p>
                        <p>4. Sign in with your new password</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={resendTimer > 0 || isLoading}
                      className="w-full flex justify-center items-center py-3 px-6 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                          Resending...
                        </div>
                      ) : resendTimer > 0 ? (
                        <>
                          <Clock className="w-4 h-4 mr-2" />
                          Resend in {resendTimer}s
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Resend Reset Link
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleBackToLogin}
                      className="w-full flex justify-center items-center py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-lg transition-all"
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Back to Sign In
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6 bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-100 dark:border-green-800">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                    Secure Reset Process
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Reset links are encrypted and expire in 24 hours for your security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;