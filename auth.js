import { auth, googleProvider } from './firebase-config.js';
import { signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// ฟังก์ชัน Log in ด้วย Google
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("Logged in user:", user.displayName);
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error("Login failed:", error.message);
    alert("การเข้าสู่ระบบล้มเหลว: " + error.message);
  }
}

// ฟังก์ชัน Log out
export async function logout() {
  try {
    await signOut(auth);
    window.location.href = "index.html";
  } catch (error) {
    console.error("Logout failed:", error.message);
  }
}

// ฟังก์ชันตรวจสอบสถานะผู้ใช้ (ใช้กับหน้า Dashboard และอื่นๆ)
export function requireAuth(onAuthenticated) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // ล็อกอินอยู่
      if (onAuthenticated) onAuthenticated(user);
    } else {
      // ไม่ได้ล็อกอิน -> ส่งกลับไปหน้า index.html
      window.location.href = "index.html";
    }
  });
}