import { useState, useEffect } from 'react';
import './index.css';
import CouponForm from './components/CouponForm';
import CouponPreview from './components/CouponPreview';
import { Coupon } from './types';
import { generateCoupons } from './utils/couponGenerator';

export default function App() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [currentCouponIndex, setCurrentCouponIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleFormSubmit = (formData: any) => {
    setIsGenerating(true);
    setTimeout(() => {
      const generatedCoupons = generateCoupons(formData);
      setCoupons(generatedCoupons);
      setCurrentCouponIndex(0);
      setIsGenerating(false);
    }, 500);
  };

  const handleNextCoupon = () => {
    if (currentCouponIndex < coupons.length - 1) {
      setCurrentCouponIndex(currentCouponIndex + 1);
    }
  };

  const handlePrevCoupon = () => {
    if (currentCouponIndex > 0) {
      setCurrentCouponIndex(currentCouponIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 font-['Inter',sans-serif]">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-indigo-800">Retailer Coupon Generator</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Coupon Details</h2>
            <CouponForm onSubmit={handleFormSubmit} isGenerating={isGenerating} />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Preview</h2>
            {coupons.length > 0 ? (
              <div>
                <CouponPreview coupon={coupons[currentCouponIndex]} allCoupons={coupons} />
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-600">
                    Showing coupon {currentCouponIndex + 1} of {coupons.length}
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={handlePrevCoupon} 
                      disabled={currentCouponIndex === 0}
                      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button 
                      onClick={handleNextCoupon} 
                      disabled={currentCouponIndex === coupons.length - 1}
                      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                {isGenerating ? (
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-2"></div>
                    <p>Generating coupons...</p>
                  </div>
                ) : (
                  <>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-12 w-12 mb-2" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1.5} 
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                      />
                    </svg>
                    <p>Fill in the form to generate coupons</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white mt-8 py-4 border-t">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Retailer Coupon Generator | All rights reserved
        </div>
      </footer>
    </div>
  );
}
