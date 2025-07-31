import { useForm } from 'react-hook-form';
import { CouponFormData } from '../types';

interface CouponFormProps {
  onSubmit: (data: CouponFormData) => void;
  isGenerating: boolean;
}

export default function CouponForm({ onSubmit, isGenerating }: CouponFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CouponFormData>({
    defaultValues: {
      retailerCode: '',
      retailerName: '',
      retailerArea: '',
      retailerMobile: '',
      fromCoupon: 'COUPON001',
      toCoupon: 'COUPON010',
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Retailer Code
          </label>
          <input
            type="text"
            {...register('retailerCode', { required: 'Retailer code is required' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {errors.retailerCode && (
            <p className="mt-1 text-sm text-red-600">{errors.retailerCode.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Retailer Name
          </label>
          <input
            type="text"
            {...register('retailerName', { required: 'Retailer name is required' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {errors.retailerName && (
            <p className="mt-1 text-sm text-red-600">{errors.retailerName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Retailer Area
          </label>
          <input
            type="text"
            {...register('retailerArea', { required: 'Retailer area is required' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {errors.retailerArea && (
            <p className="mt-1 text-sm text-red-600">{errors.retailerArea.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Retailer Mobile
          </label>
          <input
            type="text"
            {...register('retailerMobile', { 
              required: 'Mobile number is required',
              pattern: {
                value: /^[0-9]+$/,
                message: 'Please enter a valid mobile number'
              }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {errors.retailerMobile && (
            <p className="mt-1 text-sm text-red-600">{errors.retailerMobile.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From Coupon
          </label>
          <input
            type="text"
            {...register('fromCoupon', { 
              required: 'From coupon is required',
              pattern: {
                value: /^[A-Za-z]+\d+$/,
                message: 'Format should be like COUPON001'
              }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {errors.fromCoupon && (
            <p className="mt-1 text-sm text-red-600">{errors.fromCoupon.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To Coupon
          </label>
          <input
            type="text"
            {...register('toCoupon', { 
              required: 'To coupon is required',
              pattern: {
                value: /^[A-Za-z]+\d+$/,
                message: 'Format should be like COUPON999'
              }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {errors.toCoupon && (
            <p className="mt-1 text-sm text-red-600">{errors.toCoupon.message}</p>
          )}
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isGenerating}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out disabled:opacity-70 flex justify-center items-center"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate Coupons'
          )}
        </button>
      </div>
    </form>
  );
}
