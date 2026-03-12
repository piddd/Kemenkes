import React from 'react';

export default function StepDataUmum({ kapal, updateKapal, petugas, updatePetugas, nextStep }) {
  const [rememberPetugas, setRememberPetugas] = React.useState(false);

  React.useEffect(() => {
    // Check if there's saved petugas data
    const savedPetugas = localStorage.getItem('remembered-petugas');
    if (savedPetugas) {
      try {
        const data = JSON.parse(savedPetugas);
        // Auto-fill if all current fields are empty
        const isEmpty = !petugas.nama1 && !petugas.nip1 && !petugas.nama2 && !petugas.nip2;
        if (isEmpty) {
          Object.keys(data).forEach(key => {
            updatePetugas(key, data[key]);
          });
          setRememberPetugas(true);
        }
      } catch {
        // Ignore error
      }
    }
  }, []);

  const handleRememberChange = (checked) => {
    setRememberPetugas(checked);
    
    if (checked) {
      // Save current petugas data
      localStorage.setItem('remembered-petugas', JSON.stringify(petugas));
    } else {
      // Remove saved data
      localStorage.removeItem('remembered-petugas');
    }
  };

  // Auto-save when petugas data changes and checkbox is checked
  React.useEffect(() => {
    if (rememberPetugas) {
      localStorage.setItem('remembered-petugas', JSON.stringify(petugas));
    }
  }, [petugas, rememberPetugas]);

  return (
    <div className="step-wrapper">
      <div className="step-header">
        <h2>Data Umum Kapal</h2>
        <p>Lengkapi informasi umum kapal dan petugas pemeriksa</p>
      </div>

      <div className="card">
        <h3 className="card-title">Informasi Kapal</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Nama Kapal <em>(Ship Name)</em></label>
            <input value={kapal.namaKapal} onChange={e => updateKapal('namaKapal', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Jenis Kapal <em>(Type of Ship)</em></label>
            <input value={kapal.jenisKapal} onChange={e => updateKapal('jenisKapal', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Besar Kapal <em>(Weight) (GRT)</em></label>
            <input type="number" value={kapal.grt} onChange={e => updateKapal('grt', e.target.value)} placeholder="Contoh: 8500" />
          </div>
          <div className="form-group">
            <label>Bendera <em>(Flag)</em></label>
            <input value={kapal.bendera} onChange={e => updateKapal('bendera', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Nomor IMO <em>(IMO Number)</em></label>
            <input value={kapal.nomorIMO} onChange={e => updateKapal('nomorIMO', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Nama Kapten <em>(Captain Name)</em></label>
            <input value={kapal.namaKapten} onChange={e => updateKapal('namaKapten', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Pemilik/Agen <em>(Owner/Agent)</em></label>
            <input value={kapal.pemilikAgen} onChange={e => updateKapal('pemilikAgen', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Jumlah ABK <em>(Total Crew)</em></label>
            <input type="number" value={kapal.jumlahABK} onChange={e => updateKapal('jumlahABK', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Jumlah Penumpang <em>(Total Passenger)</em></label>
            <input type="number" value={kapal.jumlahPenumpang} onChange={e => updateKapal('jumlahPenumpang', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Pelabuhan Asal <em>(Last Port)</em></label>
            <input value={kapal.lastPort} onChange={e => updateKapal('lastPort', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Pelabuhan Tujuan <em>(Next Port)</em></label>
            <input value={kapal.nextPort} onChange={e => updateKapal('nextPort', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Lokasi Sandar <em>(Berthing Location)</em></label>
            <input value={kapal.lokasiSandar} onChange={e => updateKapal('lokasiSandar', e.target.value)} />
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Waktu & Lokasi</h3>
        <div className="form-grid col3">
          <div className="form-group">
            <label>Tanggal Tiba</label>
            <input type="date" value={kapal.tanggalTiba} onChange={e => updateKapal('tanggalTiba', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Jam Tiba</label>
            <input type="time" value={kapal.jamTiba} onChange={e => updateKapal('jamTiba', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Lokasi Tiba</label>
            <input value={kapal.lokasiTiba} onChange={e => updateKapal('lokasiTiba', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Tanggal Periksa</label>
            <input type="date" value={kapal.tanggalPeriksa} onChange={e => updateKapal('tanggalPeriksa', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Jam Periksa</label>
            <input type="time" value={kapal.jamPeriksa} onChange={e => updateKapal('jamPeriksa', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Lokasi Periksa</label>
            <input value={kapal.lokasiPeriksa} onChange={e => updateKapal('lokasiPeriksa', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Tanggal Berangkat</label>
            <input type="date" value={kapal.tanggalBerangkat} onChange={e => updateKapal('tanggalBerangkat', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Jam Berangkat</label>
            <input type="time" value={kapal.jamBerangkat} onChange={e => updateKapal('jamBerangkat', e.target.value)} />
          </div>
          <div className="form-group">
            <label>SSCEC/SSCC Lama</label>
            <input value={kapal.sscecLama} onChange={e => updateKapal('sscecLama', e.target.value)} />
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Data Petugas Pemeriksa</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Nama Petugas 1</label>
            <input value={petugas.nama1} onChange={e => updatePetugas('nama1', e.target.value)} />
          </div>
          <div className="form-group">
            <label>NIP Petugas 1</label>
            <input value={petugas.nip1} onChange={e => updatePetugas('nip1', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Nama Petugas 2</label>
            <input value={petugas.nama2} onChange={e => updatePetugas('nama2', e.target.value)} />
          </div>
          <div className="form-group">
            <label>NIP Petugas 2</label>
            <input value={petugas.nip2} onChange={e => updatePetugas('nip2', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Nama Petugas 3</label>
            <input value={petugas.nama3} onChange={e => updatePetugas('nama3', e.target.value)} />
          </div>
          <div className="form-group">
            <label>NIP Petugas 3</label>
            <input value={petugas.nip3} onChange={e => updatePetugas('nip3', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Nama Kepala Wilker</label>
            <input value={petugas.namaWilker} onChange={e => updatePetugas('namaWilker', e.target.value)} />
          </div>
          <div className="form-group">
            <label>NIP Kepala Wilker</label>
            <input value={petugas.nipWilker} onChange={e => updatePetugas('nipWilker', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Nama Ketua Tim</label>
            <input value={petugas.namaKetuaTim} onChange={e => updatePetugas('namaKetuaTim', e.target.value)} />
          </div>
          <div className="form-group">
            <label>NIP Ketua Tim</label>
            <input value={petugas.nipKetuaTim} onChange={e => updatePetugas('nipKetuaTim', e.target.value)} />
          </div>
          <div className="form-group full">
            <label>Nama Pelabuhan</label>
            <input value={petugas.pelabuhan} onChange={e => updatePetugas('pelabuhan', e.target.value)} placeholder="Tanjung Priok" />
          </div>
        </div>
        
        <div style={{marginTop:16,padding:12,background:'#f8fafc',borderRadius:8,border:'1px solid #e2e8f0'}}>
          <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',fontSize:13}}>
            <input 
              type="checkbox" 
              checked={rememberPetugas}
              onChange={(e) => handleRememberChange(e.target.checked)}
              style={{width:18,height:18,cursor:'pointer',accentColor:'#17726d'}}
            />
            <span style={{fontWeight:600,color:'#475569'}}>💾 Ingat data petugas ini untuk pengisian berikutnya</span>
          </label>
          <p style={{margin:'6px 0 0 26px',fontSize:11,color:'#64748b',lineHeight:1.4}}>
            Data petugas akan otomatis terisi saat membuka form baru
          </p>
        </div>
      </div>

      <div className="step-actions">
        <button className="btn-next" onClick={nextStep}>
          Lanjut ke Sanitasi Kapal →
        </button>
      </div>
    </div>
  );
}
