/**
 * localStorage utilities with quota management and compression
 * @module utils/storage
 */

const STORAGE_KEY = 'sscec-data';
const PETUGAS_KEY = 'remembered-petugas';
const MAX_STORAGE_SIZE = 4.5 * 1024 * 1024; // 4.5MB (safe limit for 5MB quota)

/**
 * Check localStorage available space
 * @returns {object} - { used: number, available: number, percentage: number }
 */
export const checkStorageQuota = () => {
  try {
    let used = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        used += localStorage[key].length + key.length;
      }
    }
    
    const available = MAX_STORAGE_SIZE - used;
    const percentage = (used / MAX_STORAGE_SIZE) * 100;
    
    return {
      used,
      available,
      percentage: Math.round(percentage),
      isNearLimit: percentage > 80
    };
  } catch (error) {
    console.error('Error checking storage quota:', error);
    return { used: 0, available: MAX_STORAGE_SIZE, percentage: 0, isNearLimit: false };
  }
};

/**
 * Compress image data URL
 * @param {string} dataUrl - Image data URL
 * @param {number} maxWidth - Maximum width
 * @param {number} quality - JPEG quality (0-1)
 * @returns {Promise<string>} - Compressed data URL
 */
export const compressImage = (dataUrl, maxWidth = 800, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to JPEG for better compression
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = dataUrl;
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Save data to localStorage with quota check
 * @param {string} key - Storage key
 * @param {any} data - Data to save
 * @returns {object} - { success: boolean, error: string }
 */
export const saveToStorage = (key, data) => {
  try {
    const jsonData = JSON.stringify(data);
    const dataSize = jsonData.length;
    const quota = checkStorageQuota();

    if (dataSize > quota.available) {
      return {
        success: false,
        error: 'Penyimpanan penuh. Hapus beberapa foto atau data lama.'
      };
    }

    localStorage.setItem(key, jsonData);
    return { success: true };
  } catch (error) {
    console.error('Error saving to storage:', error);
    
    if (error.name === 'QuotaExceededError') {
      return {
        success: false,
        error: 'Penyimpanan penuh. Hapus beberapa foto atau data lama.'
      };
    }
    
    return {
      success: false,
      error: 'Gagal menyimpan data. Mohon coba lagi.'
    };
  }
};

/**
 * Load data from localStorage
 * @param {string} key - Storage key
 * @returns {any} - Parsed data or null
 */
export const loadFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading from storage:', error);
    return null;
  }
};

/**
 * Remove data from localStorage
 * @param {string} key - Storage key
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from storage:', error);
  }
};

/**
 * Clear all app data from localStorage
 */
export const clearAllStorage = () => {
  try {
    removeFromStorage(STORAGE_KEY);
    // Don't remove PETUGAS_KEY - user may want to keep it
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};

/**
 * Get storage keys
 */
export const STORAGE_KEYS = {
  DATA: STORAGE_KEY,
  PETUGAS: PETUGAS_KEY
};
