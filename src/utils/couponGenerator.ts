import { Coupon, CouponFormData } from '../types';

// Function to extract number from coupon code
const extractNumber = (couponCode: string): number => {
  const matches = couponCode.match(/(\d+)$/);
  if (matches && matches[1]) {
    return parseInt(matches[1], 10);
  }
  return 0;
};

// Function to generate a formatted coupon code with padded number
const formatCouponCode = (prefix: string, number: number, padding: number): string => {
  const prefixMatch = prefix.match(/^([A-Za-z]+)/);
  const couponPrefix = prefixMatch ? prefixMatch[1] : 'COUPON';
  return `${couponPrefix}${number.toString().padStart(padding, '0')}`;
};

// Main function to generate coupons based on form data
export const generateCoupons = (formData: CouponFormData): Coupon[] => {
  const {
    retailerCode,
    retailerName,
    retailerArea,
    retailerMobile,
    fromCoupon,
    toCoupon,
  } = formData;

  // Extract numbers from coupon codes
  const fromNumber = extractNumber(fromCoupon);
  const toNumber = extractNumber(toCoupon);
  
  // Determine padding by checking the length of the numeric part
  const padding = fromCoupon.match(/(\d+)$/)?.[1].length || 3;
  
  // Extract prefix from fromCoupon
  const prefixMatch = fromCoupon.match(/^([A-Za-z]+)/);
  const couponPrefix = prefixMatch ? prefixMatch[1] : 'COUPON';
  
  // Generate coupons
  const coupons: Coupon[] = [];
  const totalCoupons = toNumber - fromNumber + 1;
  
  for (let i = 0; i < totalCoupons; i++) {
    const currentNumber = fromNumber + i;
    const couponCode = formatCouponCode(couponPrefix, currentNumber, padding);
    
    coupons.push({
      serialNumber: i + 1,
      couponCode,
      retailerCode,
      retailerName,
      retailerArea,
      retailerMobile,
      entryDate: new Date().toISOString().split('T')[0],
      grandTotal: totalCoupons,
      totalCoupons
    });
  }
  
  return coupons;
};

// Function to generate PDF data
export const exportToPdf = (coupons: Coupon[]) => {
  // This is a placeholder for PDF generation logic
  // The actual implementation will be in the CouponPreview component
  console.log('Exporting coupons to PDF:', coupons);
};
