import { db } from './firebase-config.js';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const COLLECTION_NAME = "foods";

/**
 * 1. เพิ่มข้อมูลอาหาร (Create)
 */
export async function addFood(userId, foodData) {
  try {
    const payload = {
      userId: userId,
      name: foodData.name,
      category: foodData.category || "General",
      quantity: Number(foodData.quantity) || 1,
      unit: foodData.unit || "ชิ้น",
      imageUrl: foodData.imageUrl || "",
      expirationDate: foodData.expirationDate, // Format: YYYY-MM-DD
      expirationType: foodData.expirationType || "EXACT", // EXACT, ESTIMATED, AFTER_OPENING
      source: foodData.source || "MANUAL", // OCR, MANUAL, FRESH_FOOD_DATABASE
      openedDate: foodData.openedDate || null,
      estimatedDays: foodData.estimatedDays || null,
      status: "ACTIVE", // ACTIVE, CONSUMED, DISCARDED
      notificationSent: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), payload);
    return docRef.id;
  } catch (error) {
    console.error("Error adding food: ", error);
    throw error;
  }
}

/**
 * 2. ดึงรายการอาหารทั้งหมดของผู้ใช้ (Read)
 */
export async function getFoodsByUser(userId) {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    const foods = [];
    querySnapshot.forEach((doc) => {
      foods.push({ id: doc.id, ...doc.data() });
    });
    
    // เรียงลำดับตามวันหมดอายุจากน้อยไปมาก
    foods.sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate));
    return foods;
  } catch (error) {
    console.error("Error getting foods: ", error);
    throw error;
  }
}

/**
 * 3. อัปเดตข้อมูลอาหาร (Update)
 */
export async function updateFood(foodId, updatedData) {
  try {
    const foodRef = doc(db, COLLECTION_NAME, foodId);
    await updateDoc(foodRef, {
      ...updatedData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error updating food: ", error);
    throw error;
  }
}

/**
 * 4. เปลี่ยนสถานะอาหาร เช่น CONSUMED หรือ DISCARDED (Update Status)
 */
export async function updateFoodStatus(foodId, newStatus) {
  return await updateFood(foodId, { status: newStatus });
}

/**
 * 5. ลบอาหารออกจากระบบ (Delete)
 */
export async function deleteFood(foodId) {
  try {
    const foodRef = doc(db, COLLECTION_NAME, foodId);
    await deleteDoc(foodRef);
  } catch (error) {
    console.error("Error deleting food: ", error);
    throw error;
  }
}