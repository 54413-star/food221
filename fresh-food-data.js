/**
 * ฐานข้อมูลประเมินอายุการเก็บรักษาอาหารสด (เก็บในตู้เย็นช่องปกติ)
 */
export const FRESH_FOOD_DATABASE = [
  { id: "pork", name: "เนื้อหมูสด", category: "Meat", shelfLifeDays: 3 },
  { id: "chicken", name: "เนื้อไก่สด", category: "Meat", shelfLifeDays: 2 },
  { id: "beef", name: "เนื้อวัวสด", category: "Meat", shelfLifeDays: 3 },
  { id: "fish", name: "ปลาสด / อาหารทะเล", category: "Meat", shelfLifeDays: 2 },
  { id: "egg", name: "ไข่ไก่ / ไข่เป็ด", category: "Dairy", shelfLifeDays: 21 },
  { id: "milk_opened", name: "นมสด (เปิดขวดแล้ว)", category: "Dairy", shelfLifeDays: 3 },
  { id: "leafy_greens", name: "ผักใบเขียว (คะน้า, ผักกาด)", category: "Vegetable", shelfLifeDays: 5 },
  { id: "root_veg", name: "ผักหัว (แครอท, มันฝรั่ง)", category: "Vegetable", shelfLifeDays: 14 },
  { id: "fruit_soft", name: "ผลไม้เนื้ออ่อน (กล้วย, สตรอเบอร์รี่)", category: "Vegetable", shelfLifeDays: 4 },
  { id: "fruit_hard", name: "ผลไม้เนื้อแข็ง (แอปเปิ้ล, ส้ม)", category: "Vegetable", shelfLifeDays: 14 }
];

/**
 * คำนวณวันหมดอายุอัตโนมัติจากจำนวนวันที่เก็บได้
 */
export function getCalculatedFreshExpDate(shelfLifeDays) {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + parseInt(shelfLifeDays, 10));
  return targetDate.toISOString().split('T')[0];
}