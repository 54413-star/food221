import { auth } from './firebase-config.js';
import { logout } from './auth.js';
import { requestNotificationPermission } from './notifications.js';

export function initSettingsPage() {
  const user = auth.currentUser;
  
  if (user) {
    document.getElementById('user-email').textContent = user.email || 'ไม่พบอีเมล';
    document.getElementById('user-name-display').textContent = user.displayName || 'ผู้ใช้งาน';
    if (user.photoURL) {
      document.getElementById('user-avatar').src = user.photoURL;
    }
  }

  // ตรวจสอบสถานะการแจ้งเตือนปัจจุบัน
  const notifyStatus = document.getElementById('notify-status');
  if ("Notification" in window) {
    if (Notification.permission === "granted") {
      notifyStatus.textContent = "เปิดใช้งานแล้ว";
      notifyStatus.style.color = "var(--primary-dark)";
    } else if (Notification.permission === "denied") {
      notifyStatus.textContent = "ถูกปฏิเสธสิทธิ์";
      notifyStatus.style.color = "var(--danger)";
    } else {
      notifyStatus.textContent = "ยังไม่ได้เปิดใช้งาน";
      notifyStatus.style.color = "var(--text-muted)";
    }
  } else {
    notifyStatus.textContent = "เบราว์เซอร์ไม่รองรับ";
  }

  // ผูก Event ปุ่มเปิดแจ้งเตือน
  document.getElementById('btn-toggle-notify').addEventListener('click', async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      notifyStatus.textContent = "เปิดใช้งานแล้ว";
      notifyStatus.style.color = "var(--primary-dark)";
      alert("เปิดการแจ้งเตือนเรียบร้อยแล้ว");
    } else {
      alert("กรุณาอนุญาตการแจ้งเตือนในการตั้งค่าของเบราว์เซอร์/ระบบ");
    }
  });

  // ผูก Event ปุ่มออกจากระบบ
  document.getElementById('btn-logout-settings').addEventListener('click', logout);
}