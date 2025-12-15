/**
 * Format UUID bằng cách lấy phần đầu và thêm prefix
 * @param {string} uuid - UUID cần format (ví dụ: "05b88bc5-9b26-40d4-bc76-76cd05a144b2")
 * @param {string} prefix - Chuỗi ký tự thêm vào đầu (ví dụ: "ORDER-")
 * @returns {string} UUID đã format với prefix
 * @example formatUuidWithPrefix("05b88bc5-9b26-40d4-bc76-76cd05a144b2", "ORDER-") => "ORDER-05b88bc5"
 */
export const formatUuidWithPrefix = (uuid, prefix = "") => {
  if (!uuid || typeof uuid !== 'string') {
    return prefix;
  }

  // Lấy phần đầu tiên của UUID (trước dấu '-' đầu tiên)
  const shortId = uuid.split('-')[0];
  
  return `${prefix}${shortId}`;
};

/**
 * Format UUID về dạng ngắn (chỉ lấy phần đầu)
 * @param {string} uuid - UUID cần format
 * @returns {string} Phần đầu của UUID
 * @example formatShortUuid("05b88bc5-9b26-40d4-bc76-76cd05a144b2") => "05b88bc5"
 */
export const formatShortUuid = (uuid) => {
  if (!uuid || typeof uuid !== 'string') {
    return '';
  }

  return uuid.split('-')[0];
};

/**
 * Format UUID thành mã đơn hàng
 * @param {string} uuid - UUID của đơn hàng
 * @returns {string} Mã đơn hàng
 * @example formatOrderId("05b88bc5-9b26-40d4-bc76-76cd05a144b2") => "ĐH-05b88bc5"
 */
export const formatOrderId = (uuid) => {
  return formatUuidWithPrefix(uuid, "ĐH-");
};

/**
 * Format UUID thành mã nhà hàng
 * @param {string} uuid - UUID của nhà hàng
 * @returns {string} Mã nhà hàng
 * @example formatRestaurantId("05b88bc5-9b26-40d4-bc76-76cd05a144b2") => "NH-05b88bc5"
 */
export const formatRestaurantId = (uuid) => {
  return formatUuidWithPrefix(uuid, "NH-");
};
