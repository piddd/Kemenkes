# Setup Logo Kemenkes

## Cara Menambahkan Logo

### Step 1: Siapkan File Logo
Pastikan Anda punya file logo Kemenkes dengan spesifikasi:
- **Format:** PNG (dengan background transparan)
- **Ukuran:** 200x200px hingga 400x400px
- **File size:** < 100KB
- **Nama file:** `kemenkes-logo.png`

### Step 2: Copy File ke Folder Public

**Lokasi file yang Anda miliki:**
```
dist/kemenkes-logo.png
```

**Copy ke:**
```
public/kemenkes-logo.png
```

**Cara copy (Windows PowerShell):**
```powershell
Copy-Item "dist\kemenkes-logo.png" -Destination "public\kemenkes-logo.png"
```

**Cara copy (Manual):**
1. Buka folder `dist`
2. Copy file `kemenkes-logo.png`
3. Paste ke folder `public`

### Step 3: Rebuild Aplikasi

```bash
npm run build
```

### Step 4: Verify

Logo akan muncul di:
- ✅ Header aplikasi (sebelah kiri)
- ✅ Responsive di semua device
- ✅ Ukuran otomatis adjust:
  - Desktop: 48x48px
  - Tablet: 40x40px
  - Mobile: 36x36px

## Fallback

Jika file `kemenkes-logo.png` tidak ditemukan, aplikasi akan otomatis menggunakan **logo SVG fallback** (icon medical dengan warna hijau tua).

## Troubleshooting

### Logo tidak muncul?

1. **Check file ada di public folder:**
   ```
   public/kemenkes-logo.png ✓
   ```

2. **Check nama file exact:**
   - Harus: `kemenkes-logo.png`
   - Bukan: `Kemenkes-Logo.png` atau `kemenkes_logo.png`

3. **Rebuild aplikasi:**
   ```bash
   npm run build
   ```

4. **Clear browser cache:**
   - Chrome: Ctrl + Shift + Delete
   - Atau hard refresh: Ctrl + F5

### Logo terlalu besar/kecil?

Edit di `src/styles/app.css`:

```css
/* Desktop */
.header-logo-kemenkes {
  width: 48px;  /* Ubah sesuai kebutuhan */
  height: 48px;
}

/* Tablet */
@media (max-width: 768px) {
  .header-logo-kemenkes {
    width: 40px;
    height: 40px;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .header-logo-kemenkes {
    width: 36px;
    height: 36px;
  }
}
```

## Current Status

- ✅ Hamburger menu added (mobile)
- ✅ Logo Kemenkes support added
- ✅ SVG fallback ready
- ⏳ Waiting for actual logo file

**Next:** Copy `dist/kemenkes-logo.png` to `public/kemenkes-logo.png` and rebuild!

---

**Last Updated:** 2024
**Version:** 1.0.0
