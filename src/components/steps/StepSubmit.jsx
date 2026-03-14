import { useState } from 'react';
import SignaturePad from '../SignaturePad';
import { validateImageFile, validateMultipleFiles, FILE_CONSTANTS } from '../../utils/fileValidation';

export default function StepSubmit({ 
  ttd, onTtdUpload, onTtdClear, 
  fotoDokumentasi, onFotoUpload, onFotoRemove,
  prevStep,
  showToast
}) {
  const [processing, setProcessing] = useState({});
  const [removeBackground, setRemoveBackground] = useState(true);
  
  const handleFileUpload = async (key, e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      showToast(validation.error, 'error');
      e.target.value = ''; // Reset input
      return;
    }
    
    if (!removeBackground) {
      // Upload langsung tanpa remove background
      onTtdUpload(key, file);
      showToast('Tanda tangan berhasil diupload', 'success');
      return;
    }
    
    setProcessing(prev => ({ ...prev, [key]: true }));
    
    try {
      // Simple canvas-based background removal (white/light colors)
      const img = new Image();
      const reader = new FileReader();
      
      reader.onload = (event) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          // Remove white/light background (simple threshold)
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // If pixel is light (close to white), make it transparent
            if (r > 200 && g > 200 && b > 200) {
              data[i + 3] = 0; // Set alpha to 0 (transparent)
            }
          }
          
          ctx.putImageData(imageData, 0, 0);
          
          canvas.toBlob((blob) => {
            const processedFile = new File([blob], file.name, { type: 'image/png' });
            onTtdUpload(key, processedFile);
            setProcessing(prev => ({ ...prev, [key]: false }));
            showToast('Tanda tangan berhasil diupload (background dihapus)', 'success');
          }, 'image/png');
        };
        img.src = event.target.result;
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      // Fallback to original file if processing fails
      onTtdUpload(key, file);
      setProcessing(prev => ({ ...prev, [key]: false }));
      showToast('Background removal gagal, file diupload tanpa proses', 'warning');
    }
  };

  const handleSignatureSave = (key, dataUrl) => {
    const blob = dataURLtoBlob(dataUrl);
    const file = new File([blob], 'signature.png', { type: 'image/png' });
    onTtdUpload(key, file);
    showToast('Tanda tangan berhasil disimpan', 'success');
  };

  const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handlePhotoUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Validate files
    const validation = validateMultipleFiles(files, fotoDokumentasi.length);
    
    if (!validation.isValid) {
      showToast(validation.errors[0], 'error');
      e.target.value = ''; // Reset input
      return;
    }

    // Show warnings if some files were rejected
    if (validation.errors.length > 0) {
      validation.errors.forEach(error => {
        showToast(error, 'warning');
      });
    }

    // Upload valid files
    if (validation.validFiles.length > 0) {
      onFotoUpload(validation.validFiles);
    }

    e.target.value = ''; // Reset input
  };

  return (
    <div className="step-wrapper">
      <div className="card" style={{background:'#ecfdf5',borderColor:'#17726d'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
          <div>
            <h3 style={{margin:0,fontSize:15,color:'#17726d'}}>✨ Auto Remove Background</h3>
            <p style={{margin:'4px 0 0',fontSize:12,color:'#64748b'}}>
              Hapus background putih otomatis dari gambar tanda tangan
            </p>
          </div>
          <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer'}}>
            <input 
              type="checkbox" 
              checked={removeBackground}
              onChange={(e) => setRemoveBackground(e.target.checked)}
              style={{width:20,height:20,cursor:'pointer'}}
            />
            <span style={{fontSize:13,fontWeight:600,color:'#17726d'}}>
              {removeBackground ? 'Aktif' : 'Nonaktif'}
            </span>
          </label>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Cap Kapal & Tanda Tangan Nakhoda</h3>
        <p style={{fontSize:12,color:'#64748b',marginBottom:16}}>
          Mengetahui (Knowledge by) - Nakhoda/Perwira Jaga - Master / Officer on charge
        </p>
        
        <div className="form-grid">
          <div className="form-group">
            <label style={{fontSize:12,fontWeight:600,color:'#475569',marginBottom:8,display:'block'}}>
              Cap Kapal (Ship Stamp)
            </label>
            {processing.capKapal ? (
              <div style={{
                border:'2px solid #17726d',
                borderRadius:8,
                padding:20,
                textAlign:'center',
                background:'#ecfdf5'
              }}>
                <div style={{fontSize:32,marginBottom:8}}>⏳</div>
                <div style={{fontSize:13,fontWeight:600,color:'#17726d'}}>
                  Menghapus background...
                </div>
              </div>
            ) : ttd.capKapal ? (
              <div style={{border:'2px solid #e2e8f0',borderRadius:8,padding:8,background:'#f8fafc'}}>
                <img src={ttd.capKapal} alt="Cap Kapal" style={{maxHeight:80,maxWidth:'100%',objectFit:'contain'}} />
                <div style={{display:'flex',gap:8,marginTop:8}}>
                  <button onClick={() => onTtdClear('capKapal')} className="btn-danger" style={{flex:1,fontSize:11,padding:'6px 12px'}}>
                    🗑️ Hapus
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <label style={{
                  display:'block',
                  border:'2px dashed #cbd5e1',
                  borderRadius:8,
                  padding:'20px',
                  textAlign:'center',
                  cursor:'pointer',
                  background:'#f8fafc',
                  transition:'all 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = '#17726d'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = '#cbd5e1'}
                >
                  <div style={{fontSize:32,marginBottom:8}}>📤</div>
                  <div style={{fontSize:13,fontWeight:600,color:'#475569',marginBottom:4}}>
                    Upload Cap Kapal
                  </div>
                  <div style={{fontSize:11,color:'#94a3b8',marginBottom:4}}>
                    Klik untuk memilih gambar
                  </div>
                  {removeBackground && (
                    <div style={{fontSize:10,color:'#17726d',fontWeight:600}}>
                      ✨ Auto remove background aktif
                    </div>
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleFileUpload('capKapal', e)}
                    style={{display:'none'}}
                  />
                </label>
              </div>
            )}
          </div>

          <div className="form-group">
            {processing.nakhoda ? (
              <div style={{
                border:'2px solid #17726d',
                borderRadius:8,
                padding:20,
                textAlign:'center',
                background:'#ecfdf5'
              }}>
                <div style={{fontSize:32,marginBottom:8}}>⏳</div>
                <div style={{fontSize:13,fontWeight:600,color:'#17726d'}}>
                  Menghapus background...
                </div>
              </div>
            ) : (
              <>
                <SignaturePad 
                  label="TTD Nakhoda/Kapten (Captain Signature)"
                  value={ttd.nakhoda}
                  onSave={(dataUrl) => handleSignatureSave('nakhoda', dataUrl)}
                  onClear={() => onTtdClear('nakhoda')}
                />
                <div style={{marginTop:8}}>
                  <label style={{fontSize:11,color:'#64748b',display:'block',marginBottom:6}}>
                    Atau upload gambar{removeBackground && ': ✨ Auto remove BG'}
                  </label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleFileUpload('nakhoda', e)}
                    style={{fontSize:11}}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Tanda Tangan Petugas</h3>
        <div className="form-grid col3">
          <div>
            {processing.p1 ? (
              <div style={{border:'2px solid #17726d',borderRadius:8,padding:20,textAlign:'center',background:'#ecfdf5'}}>
                <div style={{fontSize:24,marginBottom:4}}>⏳</div>
                <div style={{fontSize:11,fontWeight:600,color:'#17726d'}}>Processing...</div>
              </div>
            ) : (
              <>
                <SignaturePad 
                  label="TTD Petugas 1"
                  value={ttd.p1}
                  onSave={(dataUrl) => handleSignatureSave('p1', dataUrl)}
                  onClear={() => onTtdClear('p1')}
                />
                <div style={{marginTop:8}}>
                  <label style={{fontSize:10,color:'#64748b',display:'block',marginBottom:4}}>
                    Upload{removeBackground && ': ✨ Auto remove BG'}
                  </label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleFileUpload('p1', e)}
                    style={{fontSize:10}}
                  />
                </div>
              </>
            )}
          </div>
          <div>
            {processing.p2 ? (
              <div style={{border:'2px solid #17726d',borderRadius:8,padding:20,textAlign:'center',background:'#ecfdf5'}}>
                <div style={{fontSize:24,marginBottom:4}}>⏳</div>
                <div style={{fontSize:11,fontWeight:600,color:'#17726d'}}>Processing...</div>
              </div>
            ) : (
              <>
                <SignaturePad 
                  label="TTD Petugas 2"
                  value={ttd.p2}
                  onSave={(dataUrl) => handleSignatureSave('p2', dataUrl)}
                  onClear={() => onTtdClear('p2')}
                />
                <div style={{marginTop:8}}>
                  <label style={{fontSize:10,color:'#64748b',display:'block',marginBottom:4}}>
                    Upload{removeBackground && ': ✨ Auto remove BG'}
                  </label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleFileUpload('p2', e)}
                    style={{fontSize:10}}
                  />
                </div>
              </>
            )}
          </div>
          <div>
            {processing.p3 ? (
              <div style={{border:'2px solid #17726d',borderRadius:8,padding:20,textAlign:'center',background:'#ecfdf5'}}>
                <div style={{fontSize:24,marginBottom:4}}>⏳</div>
                <div style={{fontSize:11,fontWeight:600,color:'#17726d'}}>Processing...</div>
              </div>
            ) : (
              <>
                <SignaturePad 
                  label="TTD Petugas 3"
                  value={ttd.p3}
                  onSave={(dataUrl) => handleSignatureSave('p3', dataUrl)}
                  onClear={() => onTtdClear('p3')}
                />
                <div style={{marginTop:8}}>
                  <label style={{fontSize:10,color:'#64748b',display:'block',marginBottom:4}}>
                    Upload{removeBackground && ': ✨ Auto remove BG'}
                  </label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleFileUpload('p3', e)}
                    style={{fontSize:10}}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Tanda Tangan Kepala Wilker</h3>
        {processing.wilker ? (
          <div style={{border:'2px solid #17726d',borderRadius:8,padding:20,textAlign:'center',background:'#ecfdf5'}}>
            <div style={{fontSize:32,marginBottom:8}}>⏳</div>
            <div style={{fontSize:13,fontWeight:600,color:'#17726d'}}>Menghapus background...</div>
          </div>
        ) : (
          <>
            <SignaturePad 
              label="TTD Kepala Wilker"
              value={ttd.wilker}
              onSave={(dataUrl) => handleSignatureSave('wilker', dataUrl)}
              onClear={() => onTtdClear('wilker')}
            />
            <div style={{marginTop:12}}>
              <label style={{fontSize:11,color:'#64748b',display:'block',marginBottom:6}}>
                Atau upload gambar{removeBackground && ': ✨ Auto remove BG'}
              </label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleFileUpload('wilker', e)}
                style={{fontSize:11}}
              />
            </div>
          </>
        )}
      </div>

      <div className="card">
        <h3 className="card-title">Tanda Tangan Ketua Tim</h3>
        {processing.ketuaTim ? (
          <div style={{border:'2px solid #17726d',borderRadius:8,padding:20,textAlign:'center',background:'#ecfdf5'}}>
            <div style={{fontSize:32,marginBottom:8}}>⏳</div>
            <div style={{fontSize:13,fontWeight:600,color:'#17726d'}}>Menghapus background...</div>
          </div>
        ) : (
          <>
            <SignaturePad 
              label="TTD Ketua Tim"
              value={ttd.ketuaTim}
              onSave={(dataUrl) => handleSignatureSave('ketuaTim', dataUrl)}
              onClear={() => onTtdClear('ketuaTim')}
            />
            <div style={{marginTop:12}}>
              <label style={{fontSize:11,color:'#64748b',display:'block',marginBottom:6}}>
                Atau upload gambar{removeBackground && ': ✨ Auto remove BG'}
              </label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleFileUpload('ketuaTim', e)}
                style={{fontSize:11}}
              />
            </div>
          </>
        )}
      </div>

      <div className="card">
        <h3 className="card-title">Dokumentasi Foto</h3>
        <div style={{marginBottom:16}}>
          <label style={{fontSize:11,color:'#64748b',display:'block',marginBottom:8}}>
            Upload foto dokumentasi pemeriksaan kapal (Maks {FILE_CONSTANTS.MAX_PHOTO_COUNT} foto, {FILE_CONSTANTS.MAX_FILE_SIZE_MB}MB per file):
          </label>
          <input 
            type="file" 
            accept="image/*" 
            multiple 
            onChange={handlePhotoUpload}
            style={{fontSize:11}}
          />
          <div style={{marginTop:8,fontSize:11,color:'#64748b'}}>
            📊 Foto saat ini: {fotoDokumentasi.length} / {FILE_CONSTANTS.MAX_PHOTO_COUNT}
          </div>
        </div>
        {fotoDokumentasi.length > 0 && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:12,marginTop:16}}>
            {fotoDokumentasi.map((foto, idx) => (
              <div key={idx} style={{position:'relative',border:'2px solid #e2e8f0',borderRadius:8,padding:4}}>
                <img src={foto} alt={`Foto ${idx+1}`} style={{width:'100%',height:120,objectFit:'cover',borderRadius:4}} />
                <button 
                  onClick={() => {
                    onFotoRemove(idx);
                    showToast('Foto berhasil dihapus', 'info');
                  }}
                  style={{
                    position:'absolute',top:8,right:8,
                    background:'#ef4444',color:'#fff',border:'none',
                    borderRadius:4,padding:'4px 8px',fontSize:10,cursor:'pointer'
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="step-actions">
        <button className="btn-back" onClick={prevStep}>
          ← Kembali
        </button>
        <div style={{flex:1,textAlign:'center',color:'#17726d',fontWeight:600,fontSize:14}}>
          ✓ Semua data sudah lengkap! Gunakan tombol "Export PDF" di header untuk mencetak.
        </div>
      </div>
    </div>
  );
}
