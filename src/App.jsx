import { useState, useCallback, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import StepDataUmum from './components/steps/StepDataUmum';
import StepSanitasi from './components/steps/StepSanitasi';
import StepAirMinum from './components/steps/StepAirMinum';
import StepPangan from './components/steps/StepPangan';
import StepLimbah from './components/steps/StepLimbah';
import StepRadiasi from './components/steps/StepRadiasi';
import StepVektor from './components/steps/StepVektor';
import StepLaporan from './components/steps/StepLaporan';
import StepSubmit from './components/steps/StepSubmit';
import OnboardingScreen from './components/OnboardingScreen';
import { FORM_KEYS } from './data/forms';
import { buildPrintHTML } from './print/buildPrint';
import './styles/app.css';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Shared state
  const [kapal, setKapal] = useState({
    namaKapal:'', jenisKapal:'', grt:'', bendera:'', lastPort:'', nomorIMO:'',
    namaKapten:'', pemilikAgen:'', jumlahABK:'', jumlahPenumpang:'', nextPort:'',
    lokasiSandar:'', tanggalTiba:'', jamTiba:'', tanggalPeriksa:'', jamPeriksa:'',
    tanggalBerangkat:'', jamBerangkat:'', lokasiTiba:'', lokasiPeriksa:'', sscecLama:'',
  });

  const [petugas, setPetugas] = useState({
    nama1:'', nip1:'',
    nama2:'', nip2:'',
    nama3:'', nip3:'',
    namaWilker:'', nipWilker:'', pelabuhan:'',
    namaKetuaTim:'', nipKetuaTim:'',
  });

  const [ttd, setTtd] = useState({ 
    capKapal:null, nakhoda:null, p1:null, p2:null, p3:null, wilker:null, ketuaTim:null 
  });

  const [fotoDokumentasi, setFotoDokumentasi] = useState([]);

  const [checklist, setChecklist] = useState(() => {
    const obj = {};
    FORM_KEYS.forEach(k => { obj[k] = {}; });
    return obj;
  });

  const [rekomendasi, setRekomendasi] = useState(() => {
    const obj = {};
    FORM_KEYS.forEach(k => { obj[k] = {}; });
    return obj;
  });

  const [catatan, setCatatan] = useState({
    sanitasi:'', airMinum:'', pangan:'', limbah:'', radiasi:'',
  });

  const [rekAkhir, setRekAkhir] = useState('SSCEC');

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('sscec-data');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.kapal) setKapal(data.kapal);
        if (data.petugas) setPetugas(data.petugas);
        if (data.ttd) setTtd(data.ttd);
        if (data.checklist) setChecklist(data.checklist);
        if (data.rekomendasi) setRekomendasi(data.rekomendasi);
        if (data.catatan) setCatatan(data.catatan);
        if (data.rekAkhir) setRekAkhir(data.rekAkhir);
        if (data.fotoDokumentasi) setFotoDokumentasi(data.fotoDokumentasi);
      } catch {
        // Silently fail if data is corrupted
      }
    }
  }, []);

  // Auto-save data to localStorage whenever it changes
  useEffect(() => {
    const data = { kapal, petugas, ttd, checklist, rekomendasi, catatan, rekAkhir, fotoDokumentasi };
    localStorage.setItem('sscec-data', JSON.stringify(data));
  }, [kapal, petugas, ttd, checklist, rekomendasi, catatan, rekAkhir, fotoDokumentasi]);

  // Update functions
  const updateKapal = useCallback((field, value) => {
    setKapal(prev => ({ ...prev, [field]: value }));
  }, []);

  const updatePetugas = useCallback((field, value) => {
    setPetugas(prev => ({ ...prev, [field]: value }));
  }, []);

  const updateChecklist = useCallback((formKey, itemId, value) => {
    setChecklist(prev => ({
      ...prev,
      [formKey]: { ...prev[formKey], [itemId]: value }
    }));
  }, []);

  const updateRekomendasi = useCallback((formKey, itemId, value) => {
    setRekomendasi(prev => ({
      ...prev,
      [formKey]: { ...prev[formKey], [itemId]: value }
    }));
  }, []);

  const updateCatatan = useCallback((field, value) => {
    setCatatan(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleTtdUpload = useCallback((key, file) => {
    const reader = new FileReader();
    reader.onload = (e) => setTtd(prev => ({ ...prev, [key]: e.target.result }));
    reader.readAsDataURL(file);
  }, []);

  const handleTtdClear = useCallback((key) => {
    setTtd(prev => ({ ...prev, [key]: null }));
  }, []);

  const handleFotoUpload = useCallback((files) => {
    const newFotos = Array.from(files).map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(newFotos).then(results => {
      setFotoDokumentasi(prev => [...prev, ...results]);
    });
  }, []);

  const handleFotoRemove = useCallback((index) => {
    setFotoDokumentasi(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handlePrint = useCallback(() => {
    try {
      const html = buildPrintHTML({ 
        kapal, petugas, ttd, checklist, rekomendasi, catatan, rekAkhir, fotoDokumentasi 
      });
      
      if (html.length === 0) {
        alert('Error: Gagal generate PDF. Mohon coba lagi.');
        return;
      }
      
      // Remove existing iframe if any
      const existingIframe = document.getElementById('print-iframe');
      if (existingIframe) {
        existingIframe.remove();
      }
      
      // Create hidden iframe for printing
      const iframe = document.createElement('iframe');
      iframe.id = 'print-iframe';
      iframe.style.position = 'absolute';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = 'none';
      iframe.style.visibility = 'hidden';
      
      document.body.appendChild(iframe);
      
      const iframeDoc = iframe.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>SSCEC/SSCC - Ship Sanitation Certificate</title>
          <style>
            @page { margin: 0.5cm; }
            body { margin: 0; padding: 10px; }
          </style>
        </head>
        <body>
          ${html}
        </body>
        </html>
      `);
      iframeDoc.close();
      
      // Wait for content to load, then print
      iframe.onload = function() {
        setTimeout(() => {
          try {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
          } catch {
            alert('Gagal membuka print dialog. Mohon coba lagi.');
          }
        }, 250);
      };
      
    } catch {
      alert('Error saat generate PDF. Mohon coba lagi.');
    }
  }, [kapal, petugas, ttd, checklist, rekomendasi, catatan, rekAkhir, fotoDokumentasi]);

  const handleClearData = useCallback(() => {
    if (confirm('Apakah Anda yakin ingin menghapus semua data? Tindakan ini tidak dapat dibatalkan.')) {
      // Clear localStorage
      localStorage.removeItem('sscec-data');
      
      // Reset all state to initial values
      setKapal({
        namaKapal:'', jenisKapal:'', grt:'', bendera:'', lastPort:'', nomorIMO:'',
        namaKapten:'', pemilikAgen:'', jumlahABK:'', jumlahPenumpang:'', nextPort:'',
        lokasiSandar:'', tanggalTiba:'', jamTiba:'', tanggalPeriksa:'', jamPeriksa:'',
        tanggalBerangkat:'', jamBerangkat:'', lokasiTiba:'', lokasiPeriksa:'', sscecLama:'',
      });
      setPetugas({
        nama1:'', nip1:'',
        nama2:'', nip2:'',
        nama3:'', nip3:'',
        namaWilker:'', nipWilker:'', pelabuhan:'',
        namaKetuaTim:'', nipKetuaTim:'',
      });
      setTtd({ 
        capKapal:null, nakhoda:null, p1:null, p2:null, p3:null, wilker:null, ketuaTim:null 
      });
      setFotoDokumentasi([]);
      
      const obj = {};
      FORM_KEYS.forEach(k => { obj[k] = {}; });
      setChecklist(obj);
      setRekomendasi(obj);
      
      setCatatan({
        sanitasi:'', airMinum:'', pangan:'', limbah:'', radiasi:'',
      });
      setRekAkhir('SSCEC');
      
      alert('Semua data berhasil dihapus!');
    }
  }, []);

  const nextStep = () => {
    if (currentStep < 9) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const goToStep = (step) => {
    setCurrentStep(step);
    setSidebarOpen(false); // Close sidebar after selecting step on mobile
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Calculate progress
  const progress = Math.round((currentStep / 9) * 100);

  if (showOnboarding) {
    return <OnboardingScreen onComplete={() => setShowOnboarding(false)} />;
  }

  const stepProps = {
    kapal, updateKapal,
    petugas, updatePetugas,
    ttd, onTtdUpload: handleTtdUpload, onTtdClear: handleTtdClear,
    checklist, updateChecklist,
    rekomendasi, updateRekomendasi,
    catatan, updateCatatan,
    rekAkhir, setRekAkhir,
    fotoDokumentasi, onFotoUpload: handleFotoUpload, onFotoRemove: handleFotoRemove,
    nextStep, prevStep,
  };

  return (
    <div className="app-layout">
      <Sidebar 
        currentStep={currentStep} 
        progress={progress}
        onStepClick={goToStep}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}
      
      <div className="main-container">
        <header className="app-header">
          <button className="hamburger-btn" onClick={toggleSidebar} aria-label="Toggle Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <div className="header-left">
            <div>
              <h1>Sanitation Inspection</h1>
              <p>KEMENTERIAN KESEHATAN RI</p>
            </div>
          </div>
          <div className="header-right">
            <button className="btn-clear" onClick={handleClearData}>
              🗑️ Hapus Data
            </button>
            <button className="btn-export" onClick={handlePrint}>
              📄 Export PDF
            </button>
          </div>
        </header>

        <main className="step-content">
          {currentStep === 1 && <StepDataUmum {...stepProps} />}
          {currentStep === 2 && <StepSanitasi {...stepProps} />}
          {currentStep === 3 && <StepAirMinum {...stepProps} />}
          {currentStep === 4 && <StepPangan {...stepProps} />}
          {currentStep === 5 && <StepLimbah {...stepProps} />}
          {currentStep === 6 && <StepRadiasi {...stepProps} />}
          {currentStep === 7 && <StepVektor {...stepProps} />}
          {currentStep === 8 && <StepLaporan {...stepProps} />}
          {currentStep === 9 && <StepSubmit {...stepProps} />}
        </main>
      </div>
    </div>
  );
}

export default App;

