# Deployment Guide

## Production Build

Aplikasi sudah siap untuk production deployment.

### Build Steps

```bash
# 1. Install dependencies
npm install

# 2. Build for production
npm run build

# 3. Output akan ada di folder dist/
```

### Deployment Options

#### Option 1: Static Hosting (Recommended)

Deploy folder `dist/` ke static hosting seperti:
- **Netlify** - Drag & drop folder dist/
- **Vercel** - Connect GitHub repo atau upload dist/
- **GitHub Pages** - Push dist/ ke gh-pages branch
- **Firebase Hosting** - `firebase deploy`

#### Option 2: Web Server (Apache/Nginx)

1. Copy semua file dari folder `dist/` ke web server root
2. Pastikan file `kop-header.png` ada di folder `public/`
3. Configure web server untuk SPA routing:

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Apache Configuration (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Environment Setup

Tidak ada environment variables yang diperlukan. Semua konfigurasi sudah built-in.

### Post-Deployment Checklist

- [ ] Test semua 9 steps form
- [ ] Test save & load data dari localStorage
- [ ] Test digital signature pad
- [ ] Test upload gambar (cap kapal, ttd, foto dokumentasi)
- [ ] Test auto remove background feature
- [ ] Test export PDF functionality
- [ ] Test di berbagai browser (Chrome, Firefox, Safari)
- [ ] Test di berbagai device (Desktop, Tablet)
- [ ] Verify kop-header.png muncul dengan benar
- [ ] Test print preview PDF

### Performance Optimization

Build sudah include:
- ✅ Minified JS & CSS
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Gzip compression ready

### Browser Requirements

- Modern browsers dengan ES6+ support
- Canvas API support (untuk digital signature)
- LocalStorage support (untuk data persistence)
- Print API support (untuk PDF export)

### Troubleshooting

**Issue: Gambar kop tidak muncul**
- Pastikan file `kop-header.png` ada di folder `public/`
- Check path di browser console

**Issue: PDF tidak bisa di-print**
- Pastikan browser support print API
- Try di browser lain (Chrome recommended)

**Issue: Data hilang setelah refresh**
- Check localStorage browser tidak di-block
- Pastikan user klik tombol "Simpan"

**Issue: Auto remove background tidak bekerja**
- Feature ini optional, bisa dimatikan via toggle
- Bekerja optimal untuk background putih/terang

### Security Notes

- Data disimpan di localStorage browser (client-side only)
- Tidak ada data yang dikirim ke server
- Tidak ada API calls atau external dependencies
- Semua processing dilakukan di browser

### Support

Untuk pertanyaan atau issue, hubungi tim IT Kementerian Kesehatan RI.
