# SSCEC/SSCC Ship Sanitation Inspection Form

Aplikasi web untuk pemeriksaan sanitasi kapal dan penerbitan sertifikat SSCEC/SSCC (Ship Sanitation Control Exemption Certificate / Ship Sanitation Control Certificate).

## Fitur Utama

✅ **Multi-Step Form** - 9 langkah pemeriksaan yang terstruktur
- Data Umum Kapal
- Sanitasi Kapal
- Air Minum
- Pangan
- Limbah
- Radiasi
- Vektor & Binatang Penular Penyakit
- Laporan Hasil Pemeriksaan
- Tanda Tangan & Dokumentasi

✅ **Auto Save** - Data otomatis tersimpan di localStorage browser

✅ **Digital Signature** - Tanda tangan digital dengan canvas

✅ **Auto Remove Background** - Hapus background putih dari gambar tanda tangan secara otomatis

✅ **PDF Export** - Export hasil pemeriksaan ke PDF dengan format resmi

✅ **Foto Dokumentasi** - Upload dan kelola foto dokumentasi pemeriksaan

✅ **Responsive Design** - Tampilan optimal di desktop dan tablet

## Teknologi

- **React 18** - UI Framework
- **Vite** - Build tool & dev server
- **CSS3** - Styling dengan modern design
- **Canvas API** - Digital signature & background removal
- **LocalStorage** - Data persistence

## Instalasi

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Production Build

```bash
npm run build
```

Output akan ada di folder `dist/` yang siap di-deploy ke web server.

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari

## Catatan Penting

- Data disimpan di localStorage browser (tidak di server)
- Untuk backup data, gunakan tombol "Simpan" secara berkala
- PDF export memerlukan browser modern dengan print API support
- Fitur auto remove background bekerja optimal untuk gambar dengan background putih/terang

## Struktur Folder

```
src/
├── components/          # React components
│   ├── steps/          # Step components (9 steps)
│   ├── Sidebar.jsx     # Navigation sidebar
│   ├── SignaturePad.jsx # Digital signature component
│   └── OnboardingScreen.jsx
├── data/               # Form definitions
│   └── forms.js
├── print/              # PDF generation
│   ├── buildPrint.js
│   └── printStyles.js
├── styles/             # CSS files
│   ├── app.css
│   └── index.css
├── App.jsx             # Main app component
└── main.jsx            # Entry point
```

## License

© 2024 Kementerian Kesehatan Republik Indonesia
