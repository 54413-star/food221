/**
 * ฐานข้อมูลสูตรอาหารตัวอย่าง
 */
export const RECIPES_DATABASE = [
  {
    id: "r1",
    name: "ผัดกระเพราไข่ดาว",
    ingredients: ["เนื้อหมูสด", "เนื้อไก่สด", "ไข่ไก่ / ไข่เป็ด", "กระเทียม", "พริก"],
    steps: "ผัดกระเทียมและพริกให้หอม ใส่เนื้อสัตว์ ผัดจนสุก ปรุงรสตามใจชอบ ใส่ใบกระเพราแล้วปิดไฟ ทอดไข่ดาวเสิร์ฟคู่กัน"
  },
  {
    id: "r2",
    name: "ข้าวผัดไข่ใส่ผัก",
    ingredients: ["ไข่ไก่ / ไข่เป็ด", "ผักใบเขียว (คะน้า, ผักกาด)", "ผักหัว (แครอท, มันฝรั่ง)", "ข้าวสวย"],
    steps: "ผัดไข่ให้พอหอม ใส่ผักลงไปผัดจนสุก ตามด้วยข้าวสวย ปรุงรสด้วยซอสและพริกไทย"
  },
  {
    id: "r3",
    name: "ซุปผักและเนื้อสัตว์",
    ingredients: ["เนื้อวัวสด", "เนื้อหมูสด", "เนื้อไก่สด", "ผักหัว (แครอท, มันฝรั่ง)"],
    steps: "ต้มน้ำให้เดือด ใส่ผักหัวและเนื้อสัตว์ ต้มเคี่ยวด้วยไฟอ่อนจนเปื่อยนุ่ม ปรุงรสด้วยเกลือและพริกไทย"
  },
  {
    id: "r4",
    name: "สลัดผลไม้สด",
    ingredients: ["ผลไม้เนื้ออ่อน (กล้วย, สตรอเบอร์รี่)", "ผลไม้เนื้อแข็ง (แอปเปิ้ล, ส้ม)", "นมสด (เปิดขวดแล้ว)"],
    steps: "หั่นผลไม้เป็นชิ้นพอดีคำ คลุกเคล้ากับโยเกิร์ตหรือน้ำสลัด พร้อมเสิร์ฟทันที"
  }
];

/**
 * คำนวณและแนะนำสูตรอาหารตามวัตถุดิบที่มีอยู่ (เน้นวัตถุดิบที่ใกล้หมดอายุก่อน)
 */
export function recommendRecipes(userFoods) {
  const activeFoods = userFoods.filter(f => f.status === 'ACTIVE');
  const availableNames = activeFoods.map(f => f.name.toLowerCase());

  return RECIPES_DATABASE.map(recipe => {
    // นับวัตถุดิบที่ตรงกัน
    const matched = recipe.ingredients.filter(ing => 
      availableNames.some(name => name.includes(ing.toLowerCase()) || ing.toLowerCase().includes(name))
    );

    const matchPercent = Math.round((matched.length / recipe.ingredients.length) * 100);

    return {
      ...recipe,
      matchedIngredients: matched,
      matchPercent: matchPercent
    };
  }).filter(r => r.matchPercent > 0).sort((a, b) => b.matchPercent - a.matchPercent);
}