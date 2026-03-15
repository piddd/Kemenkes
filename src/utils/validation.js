/**
 * Validation utilities for form inputs
 * @module utils/validation
 */

/**
 * Validate NIP (Nomor Induk Pegawai) - must be numbers only
 * @param {string} nip - NIP to validate
 * @returns {boolean} - true if valid
 */
export const validateNIP = (nip) => {
  if (!nip) return true; // Optional field
  const nipStr = String(nip).replace(/\s/g, '');
  // Only check if it's all numbers, no length requirement
  return /^\d+$/.test(nipStr);
};

/**
 * Validate required field
 * @param {string} value - Value to validate
 * @returns {boolean} - true if not empty
 */
export const validateRequired = (value) => {
  return value !== null && value !== undefined && String(value).trim() !== '';
};

/**
 * Validate date is not in future
 * @param {string} date - Date string in YYYY-MM-DD format
 * @returns {boolean} - true if valid
 */
export const validateDateNotFuture = (date) => {
  if (!date) return true;
  const inputDate = new Date(date);
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return inputDate <= today;
};

/**
 * Validate date range (start date must be before or equal to end date)
 * @param {string} startDate - Start date
 * @param {string} endDate - End date
 * @returns {boolean} - true if valid
 */
export const validateDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return true;
  return new Date(startDate) <= new Date(endDate);
};

/**
 * Validate number is positive
 * @param {number} value - Number to validate
 * @returns {boolean} - true if positive
 */
export const validatePositiveNumber = (value) => {
  if (!value) return true;
  return Number(value) > 0;
};

/**
 * Validate IMO number (allows alphanumeric - letters and numbers)
 * @param {string} imo - IMO number
 * @returns {boolean} - true if valid
 */
export const validateIMO = (imo) => {
  if (!imo) return true;
  // Allow any alphanumeric input (letters and numbers)
  const imoStr = String(imo).replace(/\s/g, '');
  return /^[a-zA-Z0-9]+$/.test(imoStr);
};

/**
 * Get validation error message
 * @param {string} field - Field name
 * @param {string} type - Validation type
 * @returns {string} - Error message
 */
export const getValidationMessage = (field, type) => {
  const messages = {
    required: `${field} wajib diisi`,
    nip: 'NIP harus angka saja',
    imo: 'Nomor IMO harus berisi huruf/angka saja',
    positive: `${field} harus lebih dari 0`,
    dateFuture: 'Tanggal tidak boleh di masa depan',
    dateRange: 'Tanggal tiba harus sebelum tanggal berangkat',
  };
  return messages[type] || 'Input tidak valid';
};

/**
 * Validate all required fields for Data Umum step
 * @param {object} kapal - Kapal data
 * @param {object} petugas - Petugas data
 * @returns {object} - { isValid: boolean, errors: array }
 */
export const validateDataUmum = (kapal, petugas) => {
  const errors = [];

  // Required kapal fields
  if (!validateRequired(kapal.namaKapal)) {
    errors.push({ field: 'namaKapal', message: getValidationMessage('Nama Kapal', 'required') });
  }
  if (!validateRequired(kapal.jenisKapal)) {
    errors.push({ field: 'jenisKapal', message: getValidationMessage('Jenis Kapal', 'required') });
  }
  if (!validateRequired(kapal.bendera)) {
    errors.push({ field: 'bendera', message: getValidationMessage('Bendera', 'required') });
  }

  // Validate IMO
  if (kapal.nomorIMO && !validateIMO(kapal.nomorIMO)) {
    errors.push({ field: 'nomorIMO', message: getValidationMessage('', 'imo') });
  }

  // Validate dates
  if (kapal.tanggalTiba && !validateDateNotFuture(kapal.tanggalTiba)) {
    errors.push({ field: 'tanggalTiba', message: getValidationMessage('', 'dateFuture') });
  }
  if (kapal.tanggalPeriksa && !validateDateNotFuture(kapal.tanggalPeriksa)) {
    errors.push({ field: 'tanggalPeriksa', message: getValidationMessage('', 'dateFuture') });
  }

  // Validate date range
  if (!validateDateRange(kapal.tanggalTiba, kapal.tanggalBerangkat)) {
    errors.push({ field: 'tanggalBerangkat', message: getValidationMessage('', 'dateRange') });
  }

  // Required petugas fields
  if (!validateRequired(petugas.nama1)) {
    errors.push({ field: 'nama1', message: getValidationMessage('Nama Petugas 1', 'required') });
  }
  if (!validateRequired(petugas.nip1)) {
    errors.push({ field: 'nip1', message: getValidationMessage('NIP Petugas 1', 'required') });
  }

  // Validate NIPs
  if (petugas.nip1 && !validateNIP(petugas.nip1)) {
    errors.push({ field: 'nip1', message: getValidationMessage('', 'nip') });
  }
  if (petugas.nip2 && !validateNIP(petugas.nip2)) {
    errors.push({ field: 'nip2', message: getValidationMessage('', 'nip') });
  }
  if (petugas.nip3 && !validateNIP(petugas.nip3)) {
    errors.push({ field: 'nip3', message: getValidationMessage('', 'nip') });
  }
  if (petugas.nipWilker && !validateNIP(petugas.nipWilker)) {
    errors.push({ field: 'nipWilker', message: getValidationMessage('', 'nip') });
  }
  if (petugas.nipKetuaTim && !validateNIP(petugas.nipKetuaTim)) {
    errors.push({ field: 'nipKetuaTim', message: getValidationMessage('', 'nip') });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
