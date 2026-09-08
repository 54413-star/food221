import { calculateRemainingDays } from './expiration.js';

/**
 * ขอสิทธิ์แจ้งเตือนจาก Browser
 */
export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    console.log("Browser นี้ไม่รองรับระบบ Notification");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  return false;
}

/**
 * ตรวจสอบและยิง Notification แจ้งเตือนอาหารใกล้หมดอายุ
 */
export function checkAndSendNotifications(foods) {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    return;
  }

  const activeFoods = foods.filter(f => f.status === 'ACTIVE');
  const urgentFoods = activeFoods.filter(f => {
    const days = calculateRemainingDays(f.expirationDate);
    return days <= 2; // ใกล้หมดอายุหรือหมดอายุแล้ว
  });

  if (urgentFoods.length > 0) {
    const title = `⚠️ FoodGuard: มีอาหาร ${urgentFoods.length} รายการต้องรีบจัดการ!`;
    const body = urgentFoods.map(f => `- ${f.name} (หมดอายุ: ${f.expirationDate})`).join('\n');

    new Notification(title, {
      body: body,
      icon: 'https://cdn-icons-png.flaticon.com/512/2927/2927347.png'
    });
  }
}