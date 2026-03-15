# 🛠️ Development Guide - SSCEC/SSCC Application

Panduan lengkap alur pembuatan aplikasi SSCEC/SSCC dari awal sampai akhir.

---

## 📋 Daftar Isi

1. [Konsep & Perencanaan](#1-konsep--perencanaan)
2. [Setup Project](#2-setup-project)
3. [Struktur Aplikasi](#3-struktur-aplikasi)
4. [Implementasi Fitur](#4-implementasi-fitur)
5. [Styling & UI/UX](#5-styling--uiux)
6. [Testing & Debugging](#6-testing--debugging)
7. [Deployment](#7-deployment)
8. [Maintenance](#8-maintenance)

---

## 1. Konsep & Perencanaan

### 1.1 Analisis Kebutuhan

**Problem Statement:**
- Petugas BKK perlu melakukan inspeksi sanitasi kapal
- Proses manual dengan kertas memakan waktu
- Sulit tracking dan arsip dokumen
- Format laporan tidak konsisten

**Solution:**
- Aplikasi web form digital
- Multi-step wizard untuk guided input
- Auto-save untuk prevent data loss
- PDF export untuk dokumentasi resmi

**Target Users:**
- Petugas Karantina Kesehatan
- Kepala Wilayah Kerja
- Ketua Tim Pengawasan

**Key Requirements:**
- Form input data kapal & petugas
- Checklist pemeriksaan (7 kategori)
- Signature digital
- Upload foto dokumentasi
- Export PDF format resmi
- Mobile responsive

### 1.2 Tech Stack Selection

**Frontend Framework: React + Vite**
- ✅ Fast development dengan Vite HMR
- ✅ Component-based architecture
- ✅ Rich ecosystem & community
- ✅ Easy state management dengan hooks

**Styling: Pure CSS**
- ✅ No dependencies
- ✅ Full control
- ✅ Lightweight
- ✅ Easy maintenance

**State Management: React Hooks + localStorage**
- ✅ Simple & sufficient untuk app ini
- ✅ No need Redux/Zustand
- ✅ Data persistence built-in

**PDF Generation: Browser Print API**
- ✅ No external library needed
- ✅ Native browser support
- ✅ Consistent output


### 1.3 Wireframe & Flow

```
┌─────────────────────────────────────┐
│      Onboarding Screen              │
│   (Logo + Tap to Start)             │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Step 1: Data Umum                  │
│  - Info Kapal (14 fields)           │
│  - Info Petugas (10 fields)         │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Step 2-7: Checklist                │
│  - Sanitasi Kapal                   │
│  - Air Minum                        │
│  - Pangan                           │
│  - Limbah                           │
│  - Radiasi                          │
│  - Vektor & Binatang                │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Step 8: Laporan                    │
│  - Review hasil checklist           │
│  - Tambah catatan per kategori      │
│  - Pilih rekomendasi (SSCEC/SSCC)   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Step 9: Submit & TTD               │
│  - Upload/Draw signature (5 TTD)    │
│  - Upload foto dokumentasi (max 10) │
│  - Export PDF                       │
└─────────────────────────────────────┘
```


---

## 2. Setup Project

### 2.1 Initialize Vite + React

```bash
# Create project
npm create vite@latest form-sscec-sscc -- --template react

# Navigate to project
cd form-sscec-sscc

# Install dependencies
npm install

# Run dev server
npm run dev
```

### 2.2 Project Structure Setup

```bash
# Create folder structure
mkdir -p src/components/steps
mkdir -p src/data
mkdir -p src/print
mkdir -p src/styles
mkdir -p src/utils
mkdir -p public
```

### 2.3 Git Setup

```bash
# Initialize git
git init

# Create .gitignore
echo "node_modules/
dist/
.env
.DS_Store" > .gitignore

# First commit
git add .
git commit -m "Initial commit: Vite + React setup"

# Add remote
git remote add origin https://github.com/piddd/Kemenkes.git
git push -u origin main
```


---

## 3. Struktur Aplikasi

### 3.1 State Management Design

**Main State (App.jsx):**
```javascript
const [currentStep, setCurrentStep] = useState(0);
const [showOnboarding, setShowOnboarding] = useState(true);
const [sidebarOpen, setSidebarOpen] = useState(false);
const [toast, setToast] = useState(null);

// Form data states
const [kapal, setKapal] = useState({ /* 14 fields */ });
const [petugas, setPetugas] = useState({ /* 10 fields */ });
const [checklist, setChecklist] = useState({ /* 7 categories */ });
const [rekomendasi, setRekomendasi] = useState('');
const [catatan, setCatatan] = useState({ /* 7 categories */ });
const [rekAkhir, setRekAkhir] = useState('SSCEC');
const [ttd, setTtd] = useState({ /* 5 signatures */ });
const [fotoDokumentasi, setFotoDokumentasi] = useState([]);
```

**Why this structure?**
- ✅ Flat state = easy to manage
- ✅ Each category separated = easy to update
- ✅ All in App.jsx = single source of truth
- ✅ Pass via props = explicit data flow


### 3.2 Component Architecture

```
App.jsx (Main Container)
├── OnboardingScreen.jsx (Splash)
├── Sidebar.jsx (Navigation)
├── Toast.jsx (Notifications)
└── Steps/
    ├── StepDataUmum.jsx
    ├── StepSanitasi.jsx
    ├── StepAirMinum.jsx
    ├── StepPangan.jsx
    ├── StepLimbah.jsx
    ├── StepRadiasi.jsx
    ├── StepVektor.jsx
    ├── StepLaporan.jsx
    └── StepSubmit.jsx
        └── SignaturePad.jsx
```

**Component Responsibilities:**

1. **App.jsx**: State management, routing, auto-save
2. **OnboardingScreen.jsx**: Welcome screen
3. **Sidebar.jsx**: Navigation menu, step indicator
4. **Toast.jsx**: User feedback notifications
5. **Step Components**: Form inputs, validation, UI
6. **SignaturePad.jsx**: Canvas drawing, upload, processing


### 3.3 Data Structure (forms.js)

```javascript
export const formSanitasi = [
  {
    id: 'sanitasi-1',
    label: 'Kebersihan Kapal',
    labelEn: 'Ship Cleanliness',
    kondisi1: 'Bersih',
    kondisi2: 'Kotor'
  },
  // ... 20+ items
];

export const formAirMinum = [ /* ... */ ];
export const formPangan = [ /* ... */ ];
export const formLimbah = [ /* ... */ ];
export const formRadiasi = [ /* ... */ ];
export const formVektor = [ /* ... */ ];
```

**Why separate file?**
- ✅ Reusable data
- ✅ Easy to update checklist items
- ✅ Clean component code
- ✅ Single source of truth untuk form items


---

## 4. Implementasi Fitur

### 4.1 Phase 1: Basic Form (Week 1)

**Step 1: Create OnboardingScreen**
```javascript
// src/components/OnboardingScreen.jsx
export default function OnboardingScreen({ onStart }) {
  return (
    <div className="onboarding" onClick={onStart}>
      <img src="/logo-kemenkes-tanjungpinang.jpeg" />
      <h1>SSCEC/SSCC</h1>
      <p>Tap to Start</p>
    </div>
  );
}
```

**Step 2: Create Sidebar Navigation**
```javascript
// src/components/Sidebar.jsx
const steps = [
  'Data Umum', 'Sanitasi', 'Air Minum', 
  'Pangan', 'Limbah', 'Radiasi', 
  'Vektor', 'Laporan', 'Submit'
];

export default function Sidebar({ currentStep, goToStep }) {
  return (
    <aside className="sidebar">
      {steps.map((step, idx) => (
        <button 
          key={idx}
          className={currentStep === idx ? 'active' : ''}
          onClick={() => goToStep(idx)}
        >
          {idx + 1}. {step}
        </button>
      ))}
    </aside>
  );
}
```


**Step 3: Create StepDataUmum**
```javascript
// src/components/steps/StepDataUmum.jsx
export default function StepDataUmum({ 
  kapal, updateKapal, 
  petugas, updatePetugas, 
  nextStep 
}) {
  return (
    <div className="step-wrapper">
      <div className="card">
        <h3>Informasi Kapal</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Nama Kapal</label>
            <input 
              value={kapal.namaKapal}
              onChange={e => updateKapal('namaKapal', e.target.value)}
            />
          </div>
          {/* ... 13 more fields */}
        </div>
      </div>
      
      <div className="card">
        <h3>Data Petugas</h3>
        {/* ... petugas fields */}
      </div>
      
      <button onClick={nextStep}>Lanjut →</button>
    </div>
  );
}
```

**Step 4: Wire up in App.jsx**
```javascript
// src/App.jsx
const updateKapal = (field, value) => {
  setKapal(prev => ({ ...prev, [field]: value }));
};

const updatePetugas = (field, value) => {
  setPetugas(prev => ({ ...prev, [field]: value }));
};
```


### 4.2 Phase 2: Checklist Steps (Week 2)

**Step 1: Create Reusable Checklist Component**
```javascript
// Pattern untuk semua checklist steps
export default function StepSanitasi({ 
  checklist, updateChecklist, nextStep, prevStep 
}) {
  const handleCheck = (itemId, column) => {
    updateChecklist('sanitasi', itemId, column);
  };

  return (
    <div className="step-wrapper">
      <table className="checklist-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Item Pemeriksaan</th>
            <th>Baik</th>
            <th>Tidak Baik</th>
            <th>Rekomendasi</th>
          </tr>
        </thead>
        <tbody>
          {formSanitasi.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>{item.label}</td>
              <td>
                <input 
                  type="radio"
                  name={item.id}
                  checked={checklist.sanitasi[item.id] === 'col1'}
                  onChange={() => handleCheck(item.id, 'col1')}
                />
              </td>
              <td>
                <input 
                  type="radio"
                  name={item.id}
                  checked={checklist.sanitasi[item.id] === 'col2'}
                  onChange={() => handleCheck(item.id, 'col2')}
                />
              </td>
              <td>
                <input 
                  value={checklist.sanitasi[`${item.id}-rek`] || ''}
                  onChange={e => updateChecklist('sanitasi', `${item.id}-rek`, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```


**Step 2: Duplicate untuk 6 kategori lainnya**
- StepAirMinum.jsx (copy pattern dari StepSanitasi)
- StepPangan.jsx
- StepLimbah.jsx
- StepRadiasi.jsx
- StepVektor.jsx

**Step 3: Update checklist state handler**
```javascript
// App.jsx
const updateChecklist = (category, itemId, value) => {
  setChecklist(prev => ({
    ...prev,
    [category]: {
      ...prev[category],
      [itemId]: value
    }
  }));
};
```

### 4.3 Phase 3: Laporan & Submit (Week 3)

**Step 1: Create StepLaporan**
```javascript
export default function StepLaporan({ 
  checklist, catatan, updateCatatan, 
  rekAkhir, setRekAkhir, nextStep, prevStep 
}) {
  // Count kondisi1 vs kondisi2 per category
  const countResults = (category) => {
    const items = checklist[category];
    let col1 = 0, col2 = 0;
    Object.keys(items).forEach(key => {
      if (!key.includes('-rek')) {
        if (items[key] === 'col1') col1++;
        if (items[key] === 'col2') col2++;
      }
    });
    return { col1, col2 };
  };

  return (
    <div className="step-wrapper">
      {['sanitasi', 'airMinum', 'pangan', 'limbah', 'radiasi', 'vektor'].map(cat => {
        const result = countResults(cat);
        return (
          <div key={cat} className="card">
            <h3>{cat}</h3>
            <p>Baik: {result.col1} | Tidak Baik: {result.col2}</p>
            <textarea 
              placeholder="Catatan..."
              value={catatan[cat] || ''}
              onChange={e => updateCatatan(cat, e.target.value)}
            />
          </div>
        );
      })}
      
      <div className="card">
        <h3>Rekomendasi Akhir</h3>
        <label>
          <input 
            type="radio" 
            checked={rekAkhir === 'SSCEC'}
            onChange={() => setRekAkhir('SSCEC')}
          />
          SSCEC (Exemption)
        </label>
        <label>
          <input 
            type="radio" 
            checked={rekAkhir === 'SSCC'}
            onChange={() => setRekAkhir('SSCC')}
          />
          SSCC (Control)
        </label>
      </div>
    </div>
  );
}
```


**Step 2: Create SignaturePad Component**
```javascript
// src/components/SignaturePad.jsx
export default function SignaturePad({ value, onChange, label }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      const canvas = canvasRef.current;
      onChange(canvas.toDataURL());
      setIsDrawing(false);
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="signature-pad">
      <label>{label}</label>
      <canvas 
        ref={canvasRef}
        width={300}
        height={150}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <input type="file" accept="image/*" onChange={handleUpload} />
      {value && <img src={value} alt="Preview" />}
    </div>
  );
}
```


**Step 3: Create StepSubmit**
```javascript
export default function StepSubmit({ 
  ttd, updateTtd, 
  fotoDokumentasi, setFotoDokumentasi,
  prevStep, showToast 
}) {
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Validate count
    if (fotoDokumentasi.length + files.length > 10) {
      showToast('Maksimal 10 foto', 'error');
      return;
    }
    
    // Validate each file
    files.forEach(file => {
      const validation = validateFile(file);
      if (!validation.valid) {
        showToast(validation.error, 'error');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setFotoDokumentasi(prev => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="step-wrapper">
      <div className="card">
        <h3>Tanda Tangan</h3>
        <SignaturePad 
          label="Cap Kapal & TTD Nakhoda"
          value={ttd.capKapal}
          onChange={val => updateTtd('capKapal', val)}
        />
        <SignaturePad 
          label="TTD Petugas 1"
          value={ttd.ttdPetugas1}
          onChange={val => updateTtd('ttdPetugas1', val)}
        />
        {/* ... 3 more signatures */}
      </div>
      
      <div className="card">
        <h3>Foto Dokumentasi ({fotoDokumentasi.length} / 10)</h3>
        <input 
          type="file" 
          multiple 
          accept="image/*"
          onChange={handlePhotoUpload}
        />
        <div className="photo-grid">
          {fotoDokumentasi.map((photo, idx) => (
            <img key={idx} src={photo} alt={`Foto ${idx + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
```


### 4.4 Phase 4: Validation System (Week 4)

**Step 1: Create validation utilities**
```javascript
// src/utils/validation.js
export const validateNIP = (nip) => {
  if (!nip) return true;
  const nipStr = String(nip).replace(/\s/g, '');
  return /^\d+$/.test(nipStr); // Numbers only
};

export const validateIMO = (imo) => {
  if (!imo) return true;
  const imoStr = String(imo).replace(/\s/g, '');
  return /^[a-zA-Z0-9]+$/.test(imoStr); // Alphanumeric
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && String(value).trim() !== '';
};

export const validateDataUmum = (kapal, petugas) => {
  const errors = [];
  
  if (!validateRequired(kapal.namaKapal)) {
    errors.push({ field: 'namaKapal', message: 'Nama Kapal wajib diisi' });
  }
  
  if (petugas.nip1 && !validateNIP(petugas.nip1)) {
    errors.push({ field: 'nip1', message: 'NIP harus angka saja' });
  }
  
  if (kapal.nomorIMO && !validateIMO(kapal.nomorIMO)) {
    errors.push({ field: 'nomorIMO', message: 'Nomor IMO harus berisi huruf/angka saja' });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
```


**Step 2: Create file validation**
```javascript
// src/utils/fileValidation.js
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const validateFile = (file) => {
  // Check size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `Ukuran file terlalu besar (${(file.size / 1024 / 1024).toFixed(1)}MB). Maksimal 5.0MB`
    };
  }
  
  // Check type
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Format file tidak didukung. Gunakan JPG, PNG, atau WebP'
    };
  }
  
  return { valid: true };
};
```

**Step 3: Create Toast component**
```javascript
// src/components/Toast.jsx
export default function Toast({ message, type, onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getColors = () => {
    switch (type) {
      case 'success': return { bg: '#10b981', border: '#059669' };
      case 'error': return { bg: '#ef4444', border: '#dc2626' };
      case 'warning': return { bg: '#f59e0b', border: '#d97706' };
      default: return { bg: '#3b82f6', border: '#2563eb' };
    }
  };

  const colors = getColors();

  return (
    <div style={{
      position: 'fixed',
      top: 20,
      right: 20,
      zIndex: 9999,
      background: colors.bg,
      color: '#fff',
      padding: '12px 20px',
      borderRadius: 8,
      border: `2px solid ${colors.border}`
    }}>
      {message}
      <button onClick={onClose}>✕</button>
    </div>
  );
}
```


**Step 4: Integrate validation in StepDataUmum**
```javascript
const handleNext = () => {
  const validation = validateDataUmum(kapal, petugas);
  
  if (!validation.isValid) {
    const errorMap = {};
    validation.errors.forEach(err => {
      errorMap[err.field] = err.message;
    });
    setValidationErrors(errorMap);
    
    // Scroll to first error
    const firstErrorField = validation.errors[0].field;
    const element = document.querySelector(`[name="${firstErrorField}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.focus();
    }
    return;
  }
  
  setValidationErrors({});
  nextStep();
};
```

### 4.5 Phase 5: Auto-Save & Storage (Week 5)

**Step 1: Create storage utilities**
```javascript
// src/utils/storage.js
const STORAGE_KEY = 'sscec-form-data';

export const saveToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return { success: true };
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      return { 
        success: false, 
        error: 'Storage penuh. Hapus data lama atau kurangi foto.' 
      };
    }
    return { success: false, error: error.message };
  }
};

export const loadFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const checkStorageQuota = () => {
  const used = new Blob([localStorage.getItem(STORAGE_KEY) || '']).size;
  const available = 5 * 1024 * 1024; // 5MB estimate
  const percentage = (used / available) * 100;
  
  return {
    used,
    available,
    percentage,
    isNearLimit: percentage > 80
  };
};
```


**Step 2: Implement auto-save in App.jsx**
```javascript
// Auto-save whenever state changes
useEffect(() => {
  const formData = {
    kapal, petugas, checklist, rekomendasi,
    catatan, rekAkhir, ttd, fotoDokumentasi
  };
  
  const result = saveToStorage(formData);
  
  if (!result.success) {
    showToast(result.error, 'error');
  }
}, [kapal, petugas, checklist, rekomendasi, catatan, rekAkhir, ttd, fotoDokumentasi]);

// Load on mount
useEffect(() => {
  const savedData = loadFromStorage();
  if (savedData) {
    setKapal(savedData.kapal || {});
    setPetugas(savedData.petugas || {});
    setChecklist(savedData.checklist || {});
    // ... load all states
  }
}, []);
```

**Step 3: Remember Petugas feature**
```javascript
// In StepDataUmum.jsx
const [rememberPetugas, setRememberPetugas] = useState(false);

const handleRememberChange = (checked) => {
  setRememberPetugas(checked);
  
  if (checked) {
    localStorage.setItem('remembered-petugas', JSON.stringify(petugas));
  } else {
    localStorage.removeItem('remembered-petugas');
  }
};

// Auto-fill on mount
useEffect(() => {
  const savedPetugas = localStorage.getItem('remembered-petugas');
  if (savedPetugas) {
    const data = JSON.parse(savedPetugas);
    Object.keys(data).forEach(key => {
      updatePetugas(key, data[key]);
    });
    setRememberPetugas(true);
  }
}, []);
```


### 4.6 Phase 6: PDF Export (Week 6)

**Step 1: Create PDF HTML builder**
```javascript
// src/print/buildPrint.js
export const buildPrintHTML = (formData) => {
  const { kapal, petugas, checklist, catatan, rekAkhir, ttd, fotoDokumentasi } = formData;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>SSCEC - ${kapal.namaKapal}</title>
      <style>${printStyles}</style>
    </head>
    <body>
      <!-- Kop Surat -->
      <div class="kop-surat">
        <img src="/logo-kop-terbaru.jpeg" alt="Logo" />
      </div>
      
      <!-- Title -->
      <h1 class="title">
        SUPERVISI CHECKLIST PEMERIKSAAN SANITASI KAPAL<br/>
        (INSPECTION OF SHIP SANITATION)
      </h1>
      
      <!-- Data Umum -->
      <div class="data-umum">
        <div class="col-left">
          <div class="row">
            <span class="label">Nama Kapal:</span>
            <span class="value">${kapal.namaKapal}</span>
          </div>
          <!-- ... 7 more items -->
        </div>
        <div class="col-right">
          <div class="row">
            <span class="label">Pelabuhan Asal:</span>
            <span class="value">${kapal.lastPort}</span>
          </div>
          <!-- ... 5 more items -->
        </div>
      </div>
      
      <!-- Checklist Tables -->
      ${buildChecklistTable('Sanitasi Kapal', checklist.sanitasi, formSanitasi)}
      ${buildChecklistTable('Air Minum', checklist.airMinum, formAirMinum)}
      <!-- ... 5 more categories -->
      
      <!-- Signatures -->
      <div class="signature-section">
        <div class="sig-left">
          <p>Cap Kapal & TTD Nakhoda</p>
          <img src="${ttd.capKapal}" />
        </div>
        <div class="sig-right">
          <p>TTD Petugas 1</p>
          <img src="${ttd.ttdPetugas1}" />
          <p>${petugas.nama1}</p>
          <p>NIP: ${petugas.nip1}</p>
        </div>
      </div>
      
      <!-- Foto Dokumentasi -->
      <div class="foto-section">
        ${fotoDokumentasi.map((foto, idx) => `
          <div class="foto-item">
            <img src="${foto}" />
            <p>Foto ${idx + 1}</p>
          </div>
        `).join('')}
      </div>
    </body>
    </html>
  `;
};
```


**Step 2: Create PDF styles**
```javascript
// src/print/printStyles.js
export const printStyles = `
  @page {
    size: A4 portrait;
    margin: 1cm;
  }
  
  body {
    font-family: Arial, sans-serif;
    font-size: 8.5pt;
    line-height: 1.2;
    color: #000;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  .kop-surat {
    text-align: center;
    margin-bottom: 8px;
  }
  
  .kop-surat img {
    width: 100%;
    max-width: 700px;
    height: auto;
  }
  
  .title {
    text-align: center;
    font-size: 10pt;
    font-weight: bold;
    margin: 8px 0;
  }
  
  .data-umum {
    display: flex;
    gap: 20px;
    margin-bottom: 10px;
  }
  
  .col-left, .col-right {
    flex: 1;
  }
  
  .row {
    display: flex;
    line-height: 1.6;
    margin-bottom: 2px;
  }
  
  .label {
    min-width: 140px;
    font-weight: 600;
  }
  
  .value {
    flex: 1;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
    font-size: 8pt;
  }
  
  th, td {
    border: 1.5px solid #000;
    padding: 4px 6px;
    text-align: left;
  }
  
  th {
    background: #f0f0f0;
    font-weight: bold;
  }
  
  .signature-section {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .signature-section img {
    max-height: 40px;
    margin: 8px 0;
  }
  
  .foto-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-top: 20px;
  }
  
  .foto-item {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: center;
  }
  
  .foto-item img {
    width: 100%;
    height: auto;
    max-height: 200px;
    object-fit: contain;
  }
`;
```


**Step 3: Implement print function**
```javascript
// In App.jsx
const handlePrint = useCallback(() => {
  const formData = {
    kapal, petugas, checklist, rekomendasi,
    catatan, rekAkhir, ttd, fotoDokumentasi
  };
  
  const printHTML = buildPrintHTML(formData);
  
  // Create iframe
  const iframe = document.createElement('iframe');
  iframe.style.position = 'absolute';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = 'none';
  
  document.body.appendChild(iframe);
  
  const iframeDoc = iframe.contentWindow.document;
  iframeDoc.open();
  iframeDoc.write(printHTML);
  iframeDoc.close();
  
  // Wait for images to load
  iframe.contentWindow.onload = () => {
    setTimeout(() => {
      iframe.contentWindow.print();
      
      // Remove iframe after print
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    }, 500);
  };
}, [kapal, petugas, checklist, rekomendasi, catatan, rekAkhir, ttd, fotoDokumentasi]);
```


---

## 5. Styling & UI/UX

### 5.1 Color Scheme

```css
:root {
  --primary: #17726d;      /* Kemenkes teal */
  --primary-dark: #0f5450;
  --success: #10b981;
  --error: #ef4444;
  --warning: #f59e0b;
  --info: #3b82f6;
  --gray-50: #f8fafc;
  --gray-100: #f1f5f9;
  --gray-200: #e2e8f0;
  --gray-600: #475569;
  --gray-900: #0f172a;
}
```

### 5.2 Typography

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
               Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: var(--gray-900);
}

h1 { font-size: 28px; font-weight: 700; }
h2 { font-size: 24px; font-weight: 600; }
h3 { font-size: 20px; font-weight: 600; }
label { font-size: 14px; font-weight: 500; }
small { font-size: 12px; color: var(--gray-600); }
```

### 5.3 Layout System

```css
/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Grid System */
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.form-grid.col3 {
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
```


### 5.4 Component Styles

```css
/* Card */
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

/* Form Group */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-weight: 500;
  color: var(--gray-900);
}

.form-group input,
.form-group textarea,
.form-group select {
  padding: 10px 12px;
  border: 1.5px solid var(--gray-200);
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(23, 114, 109, 0.1);
}

/* Buttons */
.btn-primary {
  background: var(--primary);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(23, 114, 109, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
}
```


### 5.5 Mobile Responsive

```css
/* Hamburger Menu */
.hamburger {
  display: none;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1001;
  background: var(--primary);
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
}

.hamburger-icon {
  width: 28px;
  height: 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hamburger-icon span {
  display: block;
  height: 3px;
  background: white;
  border-radius: 2px;
}

/* Sidebar Mobile */
@media (max-width: 768px) {
  .hamburger {
    display: block;
  }
  
  .sidebar {
    position: fixed;
    left: -280px;
    top: 0;
    height: 100vh;
    width: 280px;
    z-index: 999;
    transition: left 0.3s ease;
  }
  
  .sidebar.sidebar-open {
    left: 0;
  }
  
  .sidebar-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
  }
  
  .sidebar-overlay.active {
    display: block;
  }
  
  .main-content {
    margin-left: 0;
    padding-top: 70px;
  }
}
```


---

## 6. Testing & Debugging

### 6.1 Manual Testing Checklist

**Form Input:**
- [ ] Semua field bisa diisi
- [ ] Validation bekerja (NIP, IMO, required)
- [ ] Error messages muncul inline
- [ ] Auto-save berjalan setiap perubahan
- [ ] Remember Petugas berfungsi

**Navigation:**
- [ ] Sidebar navigation bekerja
- [ ] Next/Prev buttons bekerja
- [ ] Step indicator update
- [ ] Hamburger menu (mobile) bekerja

**Signature:**
- [ ] Draw signature bekerja
- [ ] Upload signature bekerja
- [ ] Preview muncul
- [ ] Clear signature bekerja

**Photo Upload:**
- [ ] Upload single photo bekerja
- [ ] Upload multiple photos bekerja
- [ ] Max 10 photos enforced
- [ ] File size validation (5MB)
- [ ] File type validation (JPG/PNG/WebP)
- [ ] Photo counter update

**PDF Export:**
- [ ] PDF generate tanpa error
- [ ] Layout rapi & compact
- [ ] Logo muncul
- [ ] Data lengkap
- [ ] Signatures muncul
- [ ] Photos muncul
- [ ] Consistent di web & mobile

**Mobile Responsive:**
- [ ] Layout responsive di semua breakpoint
- [ ] Touch targets min 44px
- [ ] Hamburger menu slide smooth
- [ ] Overlay background muncul
- [ ] Close button bekerja


### 6.2 Common Issues & Solutions

**Issue 1: localStorage QuotaExceededError**
```
Problem: Storage penuh saat save
Solution: 
- Implement quota check
- Show warning at 80%
- Compress images before save
- Limit photo count to 10
```

**Issue 2: PDF page count berbeda mobile vs web**
```
Problem: PDF 10 halaman di web, 14 di mobile
Solution:
- Fixed @page size: A4 portrait
- Consistent font sizes (8-10pt)
- Proper viewport meta tag
- Test di multiple devices
```

**Issue 3: Hamburger menu tidak muncul**
```
Problem: Sidebar tidak slide
Solution:
- Check z-index (sidebar: 999, overlay: 998)
- Verify class 'sidebar-open' applied
- Check CSS transition property
- Test touch events on mobile
```

**Issue 4: Validation tidak jalan**
```
Problem: Error tidak muncul
Solution:
- Verify validation.js imported
- Check showToast prop passed
- Verify state update logic
- Check console for errors
```

**Issue 5: Auto-save terlalu sering**
```
Problem: Performance issue
Solution:
- Debounce save function (500ms)
- Only save on significant changes
- Skip save if data unchanged
```


### 6.3 Browser Testing

**Desktop Browsers:**
- ✅ Chrome 120+ (Primary)
- ✅ Firefox 120+
- ✅ Safari 17+
- ✅ Edge 120+

**Mobile Browsers:**
- ✅ Chrome Mobile (Android)
- ✅ Safari Mobile (iOS)
- ✅ Samsung Internet

**Testing Tools:**
- Chrome DevTools (Responsive mode)
- Firefox Developer Tools
- BrowserStack (cross-browser)
- Real devices (recommended)

---

## 7. Deployment

### 7.1 Build for Production

```bash
# Install dependencies
npm install

# Build
npm run build

# Output: dist/ folder
```

### 7.2 Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Production
vercel --prod
```

**Vercel Configuration (vercel.json):**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```


### 7.3 Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Production
netlify deploy --prod
```

**Netlify Configuration (netlify.toml):**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 7.4 Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# Deploy
npm run deploy
```

**Update vite.config.js:**
```javascript
export default defineConfig({
  base: '/Kemenkes/', // Your repo name
  plugins: [react()],
})
```


---

## 8. Maintenance

### 8.1 Version Control Best Practices

**Commit Message Format:**
```
<type>: <description>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructure
- test: Testing
- chore: Maintenance
```

**Examples:**
```bash
git commit -m "feat: add NIP validation with real-time feedback"
git commit -m "fix: resolve PDF page count inconsistency on mobile"
git commit -m "docs: update README with deployment guide"
git commit -m "style: improve mobile responsive layout"
```

**Branching Strategy:**
```
main (production)
├── develop (staging)
│   ├── feature/validation-system
│   ├── feature/pdf-export
│   └── fix/mobile-hamburger
```

### 8.2 Code Review Checklist

**Before PR:**
- [ ] Code follows project conventions
- [ ] No console.log() left
- [ ] Comments added for complex logic
- [ ] Tested in multiple browsers
- [ ] Mobile responsive checked
- [ ] No TypeScript/ESLint errors
- [ ] Performance optimized
- [ ] Accessibility considered


### 8.3 Performance Optimization

**Image Optimization:**
```javascript
// Compress images before save
const compressImage = (base64, maxWidth = 800) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ratio = Math.min(maxWidth / img.width, 1);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      resolve(canvas.toDataURL('image/jpeg', 0.8));
    };
    img.src = base64;
  });
};
```

**Debounce Auto-Save:**
```javascript
const debouncedSave = useCallback(
  debounce((data) => {
    saveToStorage(data);
  }, 500),
  []
);
```

**Lazy Load Components:**
```javascript
const StepSubmit = lazy(() => import('./components/steps/StepSubmit'));

<Suspense fallback={<div>Loading...</div>}>
  <StepSubmit {...props} />
</Suspense>
```

### 8.4 Security Considerations

**Input Sanitization:**
```javascript
const sanitizeInput = (input) => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};
```

**File Upload Security:**
- Validate file type (MIME type)
- Limit file size (5MB)
- Scan for malicious content
- Use Content Security Policy


### 8.5 Future Enhancements

**Phase 7: Backend Integration**
- [ ] API untuk save form data
- [ ] Database storage (PostgreSQL/MongoDB)
- [ ] User authentication
- [ ] Role-based access control
- [ ] Form history & versioning

**Phase 8: Advanced Features**
- [ ] Multi-language support (EN/ID)
- [ ] Dark mode
- [ ] Offline mode (PWA)
- [ ] Email notification
- [ ] PDF digital signature
- [ ] QR code verification
- [ ] Export to Excel/CSV

**Phase 9: Analytics & Reporting**
- [ ] Dashboard statistik
- [ ] Report generator
- [ ] Data visualization
- [ ] Export analytics

**Phase 10: Mobile App**
- [ ] React Native version
- [ ] iOS app
- [ ] Android app
- [ ] Push notifications

---

## 📚 Resources & References

### Documentation
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [MDN Web Docs](https://developer.mozilla.org)

### Design Inspiration
- [Dribbble](https://dribbble.com)
- [Behance](https://behance.net)
- [Awwwards](https://awwwards.com)

### Tools
- [Figma](https://figma.com) - Design
- [VS Code](https://code.visualstudio.com) - Editor
- [Chrome DevTools](https://developer.chrome.com/docs/devtools) - Debugging
- [Postman](https://postman.com) - API testing

---

**Made with ❤️ for Kemenkes BKK Tanjung Pinang**

*Last Updated: March 2026*
