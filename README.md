# 🚢 SSCEC/SSCC - Ship Sanitation Certificate Application

Aplikasi web untuk pemeriksaan dan penerbitan Sertifikat Sanitasi Kapal (Ship Sanitation Certificate) sesuai standar Kementerian Kesehatan RI - Balai Karantina Kesehatan Tanjung Pinang.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.3.1-61dafb)
![Vite](https://img.shields.io/badge/Vite-5.4.21-646cff)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📋 Daftar Isi

- [Tentang Aplikasi](#-tentang-aplikasi)
- [Fitur Utama](#-fitur-utama)
- [Teknologi](#-teknologi)
- [Instalasi](#-instalasi)
- [Penggunaan](#-penggunaan)
- [Struktur Folder](#-struktur-folder)
- [Validasi & Error Handling](#-validasi--error-handling)
- [PDF Output](#-pdf-output)
- [Mobile Responsive](#-mobile-responsive)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

---

## 🎯 Tentang Aplikasi

Aplikasi SSCEC/SSCC adalah sistem informasi berbasis web untuk memudahkan petugas Balai Karantina Kesehatan dalam melakukan inspeksi sanitasi kapal dan menerbitkan sertifikat sanitasi kapal (SSCEC - Ship Sanitation Control Exemption Certificate atau SSCC - Ship Sanitation Control Certificate).

### Latar Belakang

Sesuai dengan International Health Regulations (IHR) 2005, setiap kapal yang berlayar internasional wajib memiliki sertifikat sanitasi kapal yang valid. Aplikasi ini membantu proses inspeksi dan penerbitan sertifikat tersebut secara digital dan efisien.

### Tujuan

- Digitalisasi proses inspeksi sanitasi kapal
- Mempercepat penerbitan sertifikat
- Standardisasi format laporan
- Kemudahan akses dan penyimpanan data
- Mengurangi penggunaan kertas (paperless)

---

## ✨ Fitur Utama

### 1. Multi-Step Form (9 Langkah)
- **Step 1**: Data Umum Kapal & Petugas
- **Step 2**: Checklist Sanitasi Kapal
- **Step 3**: Checklist Air Minum
- **Step 4**: Checklist Pangan
- **Step 5**: Checklist Limbah
- **Step 6**: Checklist Radiasi
- **Step 7**: Checklist Vektor & Binatang
- **Step 8**: Laporan Hasil Pemeriksaan
- **Step 9**: Tanda Tangan & Dokumentasi Foto

### 2. Validasi Input Profesional
- ✅ **NIP Validation**: 18 digit angka (real-time)
- ✅ **IMO Validation**: 7 digit angka (real-time)
- ✅ **Required Fields**: Validasi field wajib
- ✅ **Date Validation**: Tanggal tidak boleh di masa depan
- ✅ **File Size Limit**: Max 5MB per file
- ✅ **Photo Count Limit**: Max 10 foto dokumentasi
- ✅ **File Type Check**: Hanya JPG, PNG, WebP

### 3. Toast Notification System
- 4 tipe notifikasi: Success, Error, Warning, Info
- Auto-close setelah 3 detik
- Animasi smooth slide-in
- User-friendly messages dalam Bahasa Indonesia

### 4. Signature Pad
- Draw signature langsung di canvas
- Upload signature dari file
- Auto remove background (opsional)
- Preview real-time

### 5. Auto-Save & Remember Data
- Auto-save ke localStorage setiap perubahan
- Remember Petugas: Simpan data petugas untuk form berikutnya
- Data persisten meskipun browser ditutup
- Quota management untuk localStorage

### 6. PDF Export
- Layout compact & profesional
- Logo Kemenkes BKK Tanjung Pinang terbaru
- Format 2 kolom untuk Data Umum
- Consistent output di web & mobile
- Include dokumentasi foto

### 7. Mobile Responsive
- Hamburger menu untuk navigasi
- Sidebar slide animation
- Touch-optimized buttons (min 44px)
- Responsive grid layout
- Optimized untuk semua ukuran layar

---

## 🛠 Teknologi

### Frontend Framework
- **React 18.3.1** - UI library
- **Vite 5.4.21** - Build tool & dev server

### Styling
- **CSS3** - Custom styling
- **Flexbox & Grid** - Layout system
- **Media Queries** - Responsive design

### State Management
- **React Hooks** (useState, useCallback, useEffect)
- **localStorage** - Data persistence

### Utilities
- **Canvas API** - Signature pad & image processing
- **FileReader API** - File upload handling
- **Print API** - PDF generation via iframe

---

## 📦 Instalasi

### Prerequisites
- Node.js >= 16.x
- npm >= 8.x atau yarn >= 1.22.x

### Clone Repository
```bash
git clone https://github.com/piddd/Kemenkes.git
cd Kemenkes
```

### Install Dependencies
```bash
npm install
# atau
yarn install
```

### Run Development Server
```bash
npm run dev
# atau
yarn dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### Build for Production
```bash
npm run build
# atau
yarn build
```

Output akan ada di folder `dist/`

---

## 🚀 Penggunaan

### 1. Onboarding Screen
- Klik/tap layar untuk memulai
- Logo Kemenkes BKK Tanjung Pinang ditampilkan
- Informasi sistem aplikasi

### 2. Mengisi Form
1. **Data Umum**: Isi informasi kapal dan petugas pemeriksa
   - Centang "Ingat data petugas" untuk auto-fill di form berikutnya
2. **Checklist**: Pilih kondisi untuk setiap item pemeriksaan
   - Kolom 1: Tersedia/Baik
   - Kolom 2: Tidak Tersedia/Tidak Baik
   - Rekomendasi: Isi jika diperlukan
3. **Laporan**: Review hasil pemeriksaan
   - Tambahkan catatan untuk setiap kategori
   - Pilih rekomendasi akhir (SSCEC atau SSCC)
4. **Submit & TTD**: Upload/draw tanda tangan
   - Cap kapal & TTD nakhoda
   - TTD petugas (1-3 orang)
   - TTD Kepala Wilker
   - TTD Ketua Tim
   - Upload foto dokumentasi (max 10 foto)

### 3. Export PDF
- Klik tombol "📄 Export PDF" di header
- Browser akan membuka print dialog
- Pilih "Save as PDF" atau print langsung
- PDF akan include semua data dan foto dokumentasi

### 4. Hapus Data
- Klik tombol "🗑️ Hapus Data" di header
- Konfirmasi penghapusan
- Semua data akan dihapus dari localStorage
- Data petugas yang di-remember tetap tersimpan

---

## 📁 Struktur Folder

```
Kemenkes/
├── public/
│   ├── logo-kemenkes-tanjungpinang.jpeg  # Logo sidebar
│   ├── logo-kop-terbaru.jpeg             # Logo kop surat PDF
│   └── ...
├── src/
│   ├── components/
│   │   ├── steps/
│   │   │   ├── StepDataUmum.jsx          # Step 1: Data Umum
│   │   │   ├── StepSanitasi.jsx          # Step 2: Sanitasi
│   │   │   ├── StepAirMinum.jsx          # Step 3: Air Minum
│   │   │   ├── StepPangan.jsx            # Step 4: Pangan
│   │   │   ├── StepLimbah.jsx            # Step 5: Limbah
│   │   │   ├── StepRadiasi.jsx           # Step 6: Radiasi
│   │   │   ├── StepVektor.jsx            # Step 7: Vektor
│   │   │   ├── StepLaporan.jsx           # Step 8: Laporan
│   │   │   └── StepSubmit.jsx            # Step 9: Submit & TTD
│   │   ├── OnboardingScreen.jsx          # Splash screen
│   │   ├── Sidebar.jsx                   # Navigation sidebar
│   │   ├── SignaturePad.jsx              # Signature canvas
│   │   └── Toast.jsx                     # Toast notification
│   ├── data/
│   │   └── forms.js                      # Form data & checklist items
│   ├── print/
│   │   ├── buildPrint.js                 # PDF HTML generator
│   │   └── printStyles.js                # PDF CSS styles
│   ├── styles/
│   │   ├── app.css                       # Main styles
│   │   └── index.css                     # Global styles
│   ├── utils/
│   │   ├── validation.js                 # Input validation utilities
│   │   ├── storage.js                    # localStorage management
│   │   └── fileValidation.js             # File upload validation
│   ├── App.jsx                           # Main app component
│   └── main.jsx                          # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## ✅ Validasi & Error Handling

### Input Validation

#### NIP (Nomor Induk Pegawai)
```javascript
// Harus 18 digit angka
validateNIP('198501012010011001') // ✅ Valid
validateNIP('12345')               // ❌ Invalid
```

#### IMO Number
```javascript
// Harus 7 digit angka
validateIMO('9234567') // ✅ Valid
validateIMO('123')     // ❌ Invalid
```

#### Required Fields
- Nama Kapal
- Jenis Kapal
- Bendera
- Nama Petugas 1
- NIP Petugas 1

### File Validation

#### File Size
- **Max**: 5MB per file
- **Error**: "Ukuran file terlalu besar (7.2MB). Maksimal 5.0MB"

#### File Type
- **Allowed**: JPG, JPEG, PNG, WebP
- **Error**: "Format file tidak didukung. Gunakan JPG, PNG, atau WebP"

#### Photo Count
- **Max**: 10 foto dokumentasi
- **Error**: "Maksimal 10 foto. Anda sudah memiliki 8 foto."

### localStorage Management

#### Quota Check
```javascript
checkStorageQuota()
// Returns: { used, available, percentage, isNearLimit }
```

#### Warning System
- Alert jika storage >80% penuh
- Error jika storage penuh saat save
- Auto-compression untuk images (optional)

---

## 📄 PDF Output

### Layout Specifications

#### Page Setup
- **Size**: A4 Portrait (210mm x 297mm)
- **Margin**: 1cm (top, bottom, left, right)
- **Font**: Arial, 8.5-10pt
- **Line Height**: 1.2-1.6

#### Sections

1. **Kop Surat**
   - Logo Kemenkes BKK Tanjung Pinang
   - Full width, centered

2. **Title**
   - "SUPERVISI CHECKLIST PEMERIKSAAN SANITASI KAPAL"
   - "(INSPECTION OF SHIP SANITATION)"
   - Bold, 10pt

3. **Data Umum**
   - 2 kolom layout
   - Kolom kiri: Item 1-8
   - Kolom kanan: Item 9-14
   - Line height: 1.6

4. **Checklist Table**
   - Border: 1.5px solid
   - Columns: No (25px), Label, Kondisi 1 (60px), Kondisi 2 (70px), Rekomendasi (120px)
   - Font: 8pt

5. **Signature Section**
   - Cap kapal & TTD nakhoda (kiri)
   - TTD petugas 1-3 (kanan)
   - TTD Kepala Wilker
   - TTD Ketua Tim
   - Image max-height: 36-43px

6. **Dokumentasi Foto**
   - Grid 2 kolom
   - Border frame
   - Caption "Foto 1", "Foto 2", etc.

### Print Optimization
- Color accuracy: `-webkit-print-color-adjust: exact`
- Page breaks: Proper handling
- Orphans & widows control
- Consistent rendering di semua browser

---

## 📱 Mobile Responsive

### Breakpoints

#### Desktop (>768px)
- Sidebar fixed di kiri (260px)
- Full layout dengan semua elemen

#### Tablet (768px - 480px)
- Hamburger menu muncul
- Sidebar slide dari kiri
- Grid 2 kolom → 1 kolom
- Font size adjusted

#### Mobile (≤480px)
- Hamburger menu
- Sidebar 260px width
- Grid 1 kolom
- Touch-optimized buttons (min 44px)
- Font size 14-16px untuk prevent zoom

### Touch Optimization
- Min touch target: 44x44px
- Smooth scrolling: `-webkit-overflow-scrolling: touch`
- No hover effects on touch devices
- Larger radio buttons & checkboxes (20px)

### Hamburger Menu
- **Button**: 3 garis horizontal putih
- **Sidebar**: Slide dari kiri dengan animation
- **Overlay**: Background gelap (rgba(0,0,0,0.5))
- **Close**: Button X di kanan atas sidebar
- **Z-index**: Sidebar (999), Overlay (998)

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Production Deploy**
```bash
vercel --prod
```

### Manual Deployment

1. **Build**
```bash
npm run build
```

2. **Upload `dist/` folder** ke hosting:
   - Netlify
   - GitHub Pages
   - Firebase Hosting
   - AWS S3 + CloudFront

### Environment Variables
Tidak ada environment variables yang diperlukan. Semua konfigurasi hardcoded untuk simplicity.

---

## 🔧 Troubleshooting

### Logo tidak muncul
**Problem**: Logo Kemenkes tidak tampil di sidebar atau PDF

**Solution**:
1. Pastikan file ada di `public/logo-kemenkes-tanjungpinang.jpeg`
2. Pastikan file ada di `public/logo-kop-terbaru.jpeg`
3. Hard refresh browser: `Ctrl + Shift + R` (Windows) atau `Cmd + Shift + R` (Mac)
4. Clear browser cache

### PDF page count berbeda di mobile vs web
**Problem**: PDF di web 10 halaman, di mobile 14 halaman

**Solution**: Sudah diperbaiki dengan:
- Consistent `@page` setup
- Fixed font sizes
- Proper viewport meta tag
- Print-specific CSS

### localStorage penuh
**Problem**: Error "QuotaExceededError" saat save

**Solution**:
1. Hapus data lama: Klik "🗑️ Hapus Data"
2. Kurangi jumlah foto dokumentasi
3. Compress images sebelum upload
4. Clear browser data untuk domain ini

### Hamburger menu tidak muncul
**Problem**: Sidebar tidak slide saat hamburger diklik

**Solution**:
1. Check z-index di CSS (sidebar: 999, overlay: 998)
2. Pastikan class `sidebar-open` diterapkan
3. Check console untuk JavaScript errors
4. Hard refresh browser

### Validasi NIP/IMO tidak jalan
**Problem**: Input NIP/IMO tidak menampilkan error

**Solution**:
1. Pastikan `src/utils/validation.js` ter-import
2. Check console untuk errors
3. Pastikan `showToast` prop diteruskan ke component
4. Restart dev server

### Toast notification tidak muncul
**Problem**: Tidak ada feedback saat aksi

**Solution**:
1. Pastikan `Toast` component ter-import di `App.jsx`
2. Check state `toast` di App component
3. Check z-index Toast (harus 9999)
4. Check console untuk errors

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan ikuti langkah berikut:

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Coding Standards
- Use ES6+ syntax
- Follow React best practices
- Add comments untuk logic yang complex
- Test di multiple browsers sebelum PR
- Update README jika ada perubahan fitur

---

## 📝 Changelog

### Version 1.0.0 (2024-12-XX)

#### Added
- ✅ Multi-step form dengan 9 langkah
- ✅ Toast notification system
- ✅ Input validation (NIP, IMO, required fields)
- ✅ File upload validation (size, type, count)
- ✅ localStorage management dengan quota check
- ✅ Auto-save functionality
- ✅ Remember Petugas feature
- ✅ Signature pad dengan draw & upload
- ✅ Auto remove background untuk signature
- ✅ PDF export dengan layout compact
- ✅ Mobile responsive dengan hamburger menu
- ✅ Dokumentasi foto (max 10)
- ✅ Onboarding screen

#### Fixed
- ✅ PDF page count consistency (web vs mobile)
- ✅ Logo filename dengan spaces → kebab-case
- ✅ Photo upload crash saat multiple files
- ✅ Layout PDF berantakan → 2 kolom rapi
- ✅ Hamburger menu tidak muncul → z-index fix
- ✅ Logo kemenkes terlalu kecil → diperbesar

#### Changed
- ✅ Logo kop surat → `logo-kop-terbaru.jpeg`
- ✅ Font family → Arial (lebih compact)
- ✅ Font sizes → reduced untuk compact layout
- ✅ Spacing → reduced untuk efisiensi
- ✅ Label "Nama Kepala Wilker" → "Kepala Wilayah Kerja/Penanggung Jawab"
- ✅ Label "Nama Ketua Tim" → "Ketua Tim Kerja Pengawasan Alat Angkut dan Barang"

---

## 📄 Lisensi

MIT License

Copyright (c) 2024 Kementerian Kesehatan RI - Balai Karantina Kesehatan Tanjung Pinang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 📞 Kontak & Support

**Kementerian Kesehatan RI**  
**Balai Karantina Kesehatan Tanjung Pinang**

- 📧 Email: bkk.tanjungpinang@kemkes.go.id
- 🌐 Website: https://www.bkktanjungpinang.com
- 📱 Telepon: (0771) 7335043

**Developer**
- 👨‍💻 GitHub: [@piddd](https://github.com/piddd)
- 📦 Repository: [Kemenkes](https://github.com/piddd/Kemenkes)

---

## 🙏 Acknowledgments

- Kementerian Kesehatan RI
- Balai Karantina Kesehatan Tanjung Pinang
- International Health Regulations (IHR) 2005
- React Team
- Vite Team
- Open Source Community

---

**Made with ❤️ for Kemenkes BKK Tanjung Pinang**

*Last Updated: December 2024*
