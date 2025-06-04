import { FC, useEffect, useState } from "react";
import { XCircle, ArrowLeft, Crown, RefreshCw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const PaymentCancelPage: FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Auto-redirect to chatbot after 10 seconds
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

  const handleTryAgain = () => {
    // This will trigger the upgrade modal again
    navigate('/chatbot', { state: { showUpgrade: true } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Cancel Icon */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-12 h-12 text-red-600" />
        </div>

        {/* Cancel Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Cancelled
        </h1>
        
        <p className="text-gray-600 mb-6">
          No worries! Your payment was cancelled and no charges were made. You can continue using Ohsist with your current plan or try upgrading again anytime.
        </p>

        {/* What You're Missing */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-center mb-3">
            <Crown className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="font-semibold text-blue-900">Professional Plan Benefits</h3>
          </div>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Unlimited daily conversations</li>
            <li>• Advanced safety analysis</li>
            <li>• Priority support</li>
            <li>• Document upload & analysis</li>
          </ul>
          <div className="mt-3 text-lg font-bold text-blue-900">
            Only $19/month
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleTryAgain}
            className="w-full flex items-center justify-center py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Upgrading Again
          </button>
          
          <Link
            to="/chatbot"
            className="w-full flex items-center justify-center py-3 px-6 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue with Free Plan
          </Link>
          
          <p className="text-sm text-gray-500">
            Returning to chatbot in {countdown} seconds...
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Questions about pricing?{" "}
            <a href="mailto:support@ohsist.com" className="text-blue-600 hover:underline">
              Contact our team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage; 