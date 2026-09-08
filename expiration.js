/**
 * คำนวณจำนวนวันที่เหลือจากวันหมดอายุเทียบกับวันปัจจุบัน
 * @param {string} expDateStr - วันหมดอายุ รูปแบบ YYYY-MM-DD
 * @returns {number} จำนวนวันที่เหลือ (ติดลบคือหมดอายุแล้ว)
 */
export function calculateRemainingDays(expDateStr) {
  if (!expDateStr) return 0;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0); // รีเซ็ตเวลาเป็น 00:00:00 เพื่อคำนวณเฉพาะวันที่

  const targetDate = new Date(expDateStr);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

/**
 * ประเมินสถานะของอาหารตามจำนวนวันที่เหลือ
 * Threshold: > 2 วัน = SAFE, 0 ถึง 2 วัน = NEAR_EXPIRY, < 0 วัน = EXPIRED
 */
export function evaluateFoodStatus(remainingDays) {
  if (remainingDays < 0) {
    return { code: "EXPIRED", label: "หมดอายุแล้ว", class: "badge-danger" };
  } else if (remainingDays <= 2) {
    return { code: "NEAR_EXPIRY", label: `เหลือ ${remainingDays} วัน`, class: "badge-warning" };
  } else {
    return { code: "SAFE", label: `เหลือ ${remainingDays} วัน`, class: "badge-safe" };
  }
}

/**
 * คำนวณวันหมดอายุสำหรับกรณีเปิดถุงใช้งานแล้ว (AFTER_OPENING)
 */
export function calculateAfterOpeningExp(openedDateStr, estimatedDays) {
  if (!openedDateStr || !estimatedDays) return "";
  const opened = new Date(openedDateStr);
  opened.setDate(opened.getDate() + parseInt(estimatedDays, 10));
  return opened.toISOString().split('T')[0];
}