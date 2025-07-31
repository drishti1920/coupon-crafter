export interface Coupon {
  serialNumber: number;
  couponCode: string;
  retailerCode: string;
  retailerName: string;
  retailerArea: string;
  retailerMobile: string;
  entryDate: string;
  grandTotal: number;
  totalCoupons: number;
}

export interface CouponFormData {
  retailerCode: string;
  retailerName: string;
  retailerArea: string;
  retailerMobile: string;
  fromCoupon: string;
  toCoupon: string;
  grandTotal?: number;
}
