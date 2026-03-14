/**
 * File validation utilities
 * @module utils/fileValidation
 */

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_PHOTO_COUNT = 10;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

/**
 * Validate file size
 * @param {File} file - File to validate
 * @param {number} maxSize - Maximum size in bytes
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateFileSize = (file, maxSize = MAX_FILE_SIZE) => {
  if (!file) {
    return { isValid: false, error: 'File tidak ditemukan' };
  }

  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
    return {
      isValid: false,
      error: `Ukuran file terlalu besar (${fileSizeMB}MB). Maksimal ${maxSizeMB}MB`
    };
  }

  return { isValid: true };
};

/**
 * Validate file type
 * @param {File} file - File to validate
 * @param {array} allowedTypes - Allowed MIME types
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateFileType = (file, allowedTypes = ALLOWED_IMAGE_TYPES) => {
  if (!file) {
    return { isValid: false, error: 'File tidak ditemukan' };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Format file tidak didukung. Gunakan JPG, PNG, atau WebP'
    };
  }

  return { isValid: true };
};

/**
 * Validate image file
 * @param {File} file - File to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateImageFile = (file) => {
  const sizeValidation = validateFileSize(file);
  if (!sizeValidation.isValid) {
    return sizeValidation;
  }

  const typeValidation = validateFileType(file);
  if (!typeValidation.isValid) {
    return typeValidation;
  }

  return { isValid: true };
};

/**
 * Validate multiple files
 * @param {FileList} files - Files to validate
 * @param {number} currentCount - Current photo count
 * @returns {object} - { isValid: boolean, errors: array, validFiles: array }
 */
export const validateMultipleFiles = (files, currentCount = 0) => {
  const errors = [];
  const validFiles = [];

  if (!files || files.length === 0) {
    return { isValid: false, errors: ['Tidak ada file yang dipilih'], validFiles: [] };
  }

  // Check total count
  const totalCount = currentCount + files.length;
  if (totalCount > MAX_PHOTO_COUNT) {
    return {
      isValid: false,
      errors: [`Maksimal ${MAX_PHOTO_COUNT} foto. Anda sudah memiliki ${currentCount} foto.`],
      validFiles: []
    };
  }

  // Validate each file
  Array.from(files).forEach((file, index) => {
    const validation = validateImageFile(file);
    if (validation.isValid) {
      validFiles.push(file);
    } else {
      errors.push(`File ${index + 1}: ${validation.error}`);
    }
  });

  return {
    isValid: validFiles.length > 0,
    errors,
    validFiles
  };
};

/**
 * Format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Get file validation constants
 */
export const FILE_CONSTANTS = {
  MAX_FILE_SIZE,
  MAX_PHOTO_COUNT,
  ALLOWED_IMAGE_TYPES,
  MAX_FILE_SIZE_MB: MAX_FILE_SIZE / (1024 * 1024)
};
