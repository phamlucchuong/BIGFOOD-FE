/**
 * Format số tiền theo định dạng Việt Nam
 * @param {number} amount - Số tiền cần format
 * @param {string} currency - Đơn vị tiền tệ (mặc định: 'VND')
 * @returns {string} Số tiền đã được format
 * @example formatCurrency(1000000) => "1.000.000 ₫"
 */
export const formatCurrency = (amount, currency = 'VND') => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '0 ₫';
  }

  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formattedAmount = formatter.format(amount);

  switch (currency.toUpperCase()) {
    case 'VND':
      return `${formattedAmount} ₫`;
    case 'USD':
      return `$${formattedAmount}`;
    case 'EUR':
      return `€${formattedAmount}`;
    default:
      return `${formattedAmount} ${currency}`;
  }
};

/**
 * Format số tiền ngắn gọn (K, M, B)
 * @param {number} amount - Số tiền cần format
 * @returns {string} Số tiền đã được format ngắn gọn
 * @example formatCompactCurrency(1500000) => "1,5 triệu ₫"
 */
export const formatCompactCurrency = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '0 ₫';
  }

  if (amount >= 1000000000) {
    return `${(amount / 1000000000).toFixed(1)} tỷ ₫`;
  }
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)} triệu ₫`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(0)} nghìn ₫`;
  }
  return `${amount} ₫`;
};

/**
 * Parse chuỗi tiền về số
 * @param {string} formattedAmount - Chuỗi tiền đã format
 * @returns {number} Số tiền
 * @example parseCurrency("1.000.000 ₫") => 1000000
 */
export const parseCurrency = (formattedAmount) => {
  if (!formattedAmount || typeof formattedAmount !== 'string') {
    return 0;
  }
  
  // Loại bỏ ký tự không phải số
  const cleaned = formattedAmount.replace(/[^\d]/g, '');
  return parseInt(cleaned, 10) || 0;
};

/**
 * Format số tiền với ký hiệu + hoặc - (cho giao dịch)
 * @param {number} amount - Số tiền
 * @param {string} type - Loại giao dịch ('income' hoặc 'expense')
 * @returns {string} Số tiền đã format với ký hiệu
 * @example formatTransactionAmount(50000, 'income') => "+50.000 ₫"
 */
export const formatTransactionAmount = (amount, type = 'income') => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '0 ₫';
  }

  const formatted = formatCurrency(Math.abs(amount));
  const sign = type === 'income' ? '+' : '-';
  
  return `${sign}${formatted}`;
};

/**
 * Format phần trăm giảm giá
 * @param {number} percentage - Phần trăm giảm giá
 * @returns {string} Phần trăm đã format
 * @example formatDiscount(15.5) => "-15,5%"
 */
export const formatDiscount = (percentage) => {
  if (percentage === null || percentage === undefined || isNaN(percentage)) {
    return '0%';
  }
  
  const formatted = new Intl.NumberFormat('vi-VN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(percentage);
  
  return `-${formatted}%`;
};

/**
 * Tính và format tiền sau khi giảm giá
 * @param {number} originalPrice - Giá gốc
 * @param {number} discount - Phần trăm giảm giá
 * @returns {object} Object chứa giá gốc, giá sau giảm và số tiền tiết kiệm
 */
export const calculateDiscountedPrice = (originalPrice, discount) => {
  if (!originalPrice || !discount) {
    return {
      original: formatCurrency(originalPrice || 0),
      discounted: formatCurrency(originalPrice || 0),
      saved: formatCurrency(0),
      discountPercentage: formatDiscount(0),
    };
  }

  const discountAmount = (originalPrice * discount) / 100;
  const finalPrice = originalPrice - discountAmount;

  return {
    original: formatCurrency(originalPrice),
    discounted: formatCurrency(finalPrice),
    saved: formatCurrency(discountAmount),
    discountPercentage: formatDiscount(discount),
  };
};
