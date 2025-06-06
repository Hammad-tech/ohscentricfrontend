import { FC, useEffect, useState } from "react";
import { CheckCircle, ArrowRight, Crown, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/app/context/AuthContext";

const PaymentSuccessPage: FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Auto-redirect to chatbot after 5 seconds
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/chatbot');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Successful! 🎉
        </h1>
        
        <p className="text-gray-600 mb-6">
          Welcome to Ohscentric Professional! Your subscription has been activated and you now have unlimited access to our AI safety assistant.
        </p>

        {/* Professional Plan Features */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-center mb-3">
            <Crown className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="font-semibold text-blue-900">Professional Plan Active</h3>
          </div>
          <ul className="text-sm text-blue-800 space-y-2">
            <li className="flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Unlimited daily conversations
            </li>
            <li className="flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Advanced safety analysis
            </li>
            <li className="flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Priority support
            </li>
          </ul>
        </div>

        {/* User Info */}
        {user && (
          <div className="bg-gray-50 rounded-lg p-3 mb-6">
            <p className="text-sm text-gray-600">
              Subscription activated for: <span className="font-medium">{user.email}</span>
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            to="/chatbot"
            className="w-full flex items-center justify-center py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
          >
            Start Using Ohscentric
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
          
          <p className="text-sm text-gray-500">
            Redirecting automatically in {countdown} seconds...
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Need help? Contact our support team at{" "}
            <a href="mailto:support@ohscentric.com" className="text-blue-600 hover:underline">
              support@ohscentric.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage; 