/**
 * สแกนรูปภาพด้วย Tesseract.js เพื่อหา Text
 */
export async function scanImageForDate(imageSource, onProgress) {
  if (!window.Tesseract) {
    throw new Error("Tesseract.js CDN ยังไม่ถูกโหลด");
  }

  const worker = await Tesseract.createWorker('eng', 1, {
    logger: m => {
      if (m.status === 'recognizing text' && onProgress) {
        onProgress(Math.round(m.progress * 100));
      }
    }
  });

  const ret = await worker.recognize(imageSource);
  await worker.terminate();

  const detectedText = ret.data.text;
  const extractedDate = extractDateFromText(detectedText);

  return {
    rawText: detectedText,
    extractedDate: extractedDate
  };
}

/**
 * Regex สำหรับดึงรูปแบบวันที่ เช่น DD/MM/YYYY, YYYY-MM-DD, DD.MM.YY
 */
function extractDateFromText(text) {
  if (!text) return null;

  // คลีนตัวอักษรขยะเบื้องต้น
  const cleanText = text.toUpperCase().replace(/\s+/g, ' ');

  // Patterns ที่พบบ่อยบนฉลากอาหาร
  const datePatterns = [
    // YYYY-MM-DD หรือ YYYY/MM/DD
    /\b(202[4-9]|203[0-0])[\/\.-](0[1-9]|1[0-2])[\/\.-](0[1-9]|[12][0-9]|3[01])\b/,
    // DD/MM/YYYY หรือ DD.MM.YYYY
    /\b(0[1-9]|[12][0-9]|3[01])[\/\.-](0[1-9]|1[0-2])[\/\.-](202[4-9]|203[0-0])\b/,
    // DD/MM/YY หรือ DD.MM.YY (ปี ค.ศ. 2 หลัก เช่น 25, 26)
    /\b(0[1-9]|[12][0-9]|3[01])[\/\.-](0[1-9]|1[0-2])[\/\.-](2[4-9]|3[0-0])\b/
  ];

  for (const pattern of datePatterns) {
    const match = cleanText.match(pattern);
    if (match) {
      return formatToISOString(match[0]);
    }
  }

  return null;
}

/**
 * แปลง Format วันที่ที่พบให้อยู่ในรูปแบบ YYYY-MM-DD สำหรับ HTML Date Input
 */
function formatToISOString(dateStr) {
  const parts = dateStr.split(/[\/\.-]/);
  if (parts.length !== 3) return null;

  let year, month, day;

  if (parts[0].length === 4) {
    // YYYY-MM-DD
    year = parts[0];
    month = parts[1].padStart(2, '0');
    day = parts[2].padStart(2, '0');
  } else if (parts[2].length === 4) {
    // DD-MM-YYYY
    day = parts[0].padStart(2, '0');
    month = parts[1].padStart(2, '0');
    year = parts[2];
  } else if (parts[2].length === 2) {
    // DD-MM-YY
    day = parts[0].padStart(2, '0');
    month = parts[1].padStart(2, '0');
    year = "20" + parts[2];
  }

  return `${year}-${month}-${day}`;
}