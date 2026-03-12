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
      <div className="card">
        <h3 className="card-title">Informasi Kapal</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Nama Kapal <em>(Ship Name)</em></label>
            <input value={kapal.namaKapal} onChange={e => updateKapal('namaKapal', e.target.value)} placeholder="MV Sinar Batam" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Nama resmi kapal sesuai dokumen</small>
          </div>
          <div className="form-group">
            <label>Jenis Kapal <em>(Type of Ship)</em></label>
            <input value={kapal.jenisKapal} onChange={e => updateKapal('jenisKapal', e.target.value)} placeholder="Cargo" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Pilih sesuai klasifikasi kapal</small>
          </div>
          <div className="form-group">
            <label>Besar Kapal <em>(Weight) (GRT)</em></label>
            <input type="number" value={kapal.grt} onChange={e => updateKapal('grt', e.target.value)} placeholder="8500" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Gross Tonnage tercantum di Surat Ukur</small>
          </div>
          <div className="form-group">
            <label>Bendera <em>(Flag)</em></label>
            <input value={kapal.bendera} onChange={e => updateKapal('bendera', e.target.value)} placeholder="Indonesia" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Negara registrasi kapal</small>
          </div>
          <div className="form-group">
            <label>Nomor IMO <em>(IMO Number)</em></label>
            <input value={kapal.nomorIMO} onChange={e => updateKapal('nomorIMO', e.target.value)} placeholder="9234567" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>7 digit angka unik identitas kapal</small>
          </div>
          <div className="form-group">
            <label>Nama Kapten <em>(Captain Name)</em></label>
            <input value={kapal.namaKapten} onChange={e => updateKapal('namaKapten', e.target.value)} placeholder="Capt. John Smith" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Nama lengkap sesuai Sertifikat Kompetensi</small>
          </div>
          <div className="form-group">
            <label>Pemilik/Agen <em>(Owner/Agent)</em></label>
            <input value={kapal.pemilikAgen} onChange={e => updateKapal('pemilikAgen', e.target.value)} placeholder="PT Pelayaran Nasional" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Nama perusahaan pelayaran atau agen lokal</small>
          </div>
          <div className="form-group">
            <label>Jumlah ABK <em>(Total Crew)</em></label>
            <input type="number" value={kapal.jumlahABK} onChange={e => updateKapal('jumlahABK', e.target.value)} placeholder="25" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Total awak kapal aktif di atas kapal</small>
          </div>
          <div className="form-group">
            <label>Jumlah Penumpang <em>(Total Passenger)</em></label>
            <input type="number" value={kapal.jumlahPenumpang} onChange={e => updateKapal('jumlahPenumpang', e.target.value)} placeholder="0" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Isi 0 jika kapal kargo tanpa penumpang</small>
          </div>
          <div className="form-group">
            <label>Pelabuhan Asal <em>(Last Port)</em></label>
            <input value={kapal.lastPort} onChange={e => updateKapal('lastPort', e.target.value)} placeholder="Singapore" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Pelabuhan terakhir sebelum tiba</small>
          </div>
          <div className="form-group">
            <label>Pelabuhan Tujuan <em>(Next Port)</em></label>
            <input value={kapal.nextPort} onChange={e => updateKapal('nextPort', e.target.value)} placeholder="Belawan" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Pelabuhan berikutnya setelah singgah</small>
          </div>
          <div className="form-group">
            <label>Lokasi Sandar <em>(Berthing Location)</em></label>
            <input value={kapal.lokasiSandar} onChange={e => updateKapal('lokasiSandar', e.target.value)} placeholder="Dermaga 3 Pelabuhan Tanjung Priok" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Nomor dermaga dan nama pelabuhan sandar</small>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Waktu & Lokasi</h3>
        <div className="form-grid col3">
          <div className="form-group">
            <label>Tanggal Tiba</label>
            <input type="date" value={kapal.tanggalTiba} onChange={e => updateKapal('tanggalTiba', e.target.value)} placeholder="dd/mm/yyyy" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Tanggal kapal tiba di pelabuhan</small>
          </div>
          <div className="form-group">
            <label>Jam Tiba</label>
            <input type="time" value={kapal.jamTiba} onChange={e => updateKapal('jamTiba', e.target.value)} placeholder="HH:MM" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Waktu kapal sandar/labuh jangkar</small>
          </div>
          <div className="form-group">
            <label>Lokasi Tiba</label>
            <input value={kapal.lokasiTiba} onChange={e => updateKapal('lokasiTiba', e.target.value)} placeholder="Pelabuhan Tanjung Priok" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Nama pelabuhan kedatangan</small>
          </div>
          <div className="form-group">
            <label>Tanggal Periksa</label>
            <input type="date" value={kapal.tanggalPeriksa} onChange={e => updateKapal('tanggalPeriksa', e.target.value)} placeholder="dd/mm/yyyy" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Tanggal pelaksanaan inspeksi sanitasi</small>
          </div>
          <div className="form-group">
            <label>Jam Periksa</label>
            <input type="time" value={kapal.jamPeriksa} onChange={e => updateKapal('jamPeriksa', e.target.value)} placeholder="HH:MM" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Waktu mulai pemeriksaan di atas kapal</small>
          </div>
          <div className="form-group">
            <label>Lokasi Periksa</label>
            <input value={kapal.lokasiPeriksa} onChange={e => updateKapal('lokasiPeriksa', e.target.value)} placeholder="Dermaga 3 Pelabuhan Tanjung Priok" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Lokasi spesifik pemeriksaan dilakukan</small>
          </div>
          <div className="form-group">
            <label>Tanggal Berangkat</label>
            <input type="date" value={kapal.tanggalBerangkat} onChange={e => updateKapal('tanggalBerangkat', e.target.value)} placeholder="dd/mm/yyyy" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Tanggal kapal dijadwalkan meninggalkan pelabuhan</small>
          </div>
          <div className="form-group">
            <label>Jam Berangkat</label>
            <input type="time" value={kapal.jamBerangkat} onChange={e => updateKapal('jamBerangkat', e.target.value)} placeholder="HH:MM" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Estimasi waktu kapal bertolak</small>
          </div>
          <div className="form-group">
            <label>SSCEC/SSCC Lama</label>
            <input value={kapal.sscecLama} onChange={e => updateKapal('sscecLama', e.target.value)} placeholder="SSCEC/2024/001" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Nomor sertifikat sanitasi sebelumnya (jika ada)</small>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Data Petugas Pemeriksa</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Nama Petugas 1</label>
            <input value={petugas.nama1} onChange={e => updatePetugas('nama1', e.target.value)} placeholder="Dr. Ahmad Hidayat" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Nama lengkap + gelar sesuai SK penugasan</small>
          </div>
          <div className="form-group">
            <label>NIP Petugas 1</label>
            <input type="number" value={petugas.nip1} onChange={e => updatePetugas('nip1', e.target.value)} placeholder="198501012010011001" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>18 digit NIP ASN petugas</small>
          </div>
          <div className="form-group">
            <label>Nama Petugas 2</label>
            <input value={petugas.nama2} onChange={e => updatePetugas('nama2', e.target.value)} placeholder="Dr. Siti Nurhaliza" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Kosongkan jika hanya 1 petugas</small>
          </div>
          <div className="form-group">
            <label>NIP Petugas 2</label>
            <input type="number" value={petugas.nip2} onChange={e => updatePetugas('nip2', e.target.value)} placeholder="198602022011012002" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Kosongkan jika hanya 1 petugas</small>
          </div>
          <div className="form-group">
            <label>Nama Petugas 3</label>
            <input value={petugas.nama3} onChange={e => updatePetugas('nama3', e.target.value)} placeholder="Dr. Budi Santoso" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Kosongkan jika hanya 2 petugas</small>
          </div>
          <div className="form-group">
            <label>NIP Petugas 3</label>
            <input type="number" value={petugas.nip3} onChange={e => updatePetugas('nip3', e.target.value)} placeholder="198703032012013003" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Kosongkan jika hanya 2 petugas</small>
          </div>
          <div className="form-group">
            <label>Nama Kepala Wilker</label>
            <input value={petugas.namaWilker} onChange={e => updatePetugas('namaWilker', e.target.value)} placeholder="Dr. Andi Wijaya, M.Kes" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Kepala Wilayah Kerja KKP yang berwenang</small>
          </div>
          <div className="form-group">
            <label>NIP Kepala Wilker</label>
            <input type="number" value={petugas.nipWilker} onChange={e => updatePetugas('nipWilker', e.target.value)} placeholder="197501011998031001" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>NIP Kepala Wilker sesuai SK jabatan</small>
          </div>
          <div className="form-group">
            <label>Nama Ketua Tim</label>
            <input value={petugas.namaKetuaTim} onChange={e => updatePetugas('namaKetuaTim', e.target.value)} placeholder="Dr. Rini Kusuma, M.Sc" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Penanggung jawab tim inspeksi</small>
          </div>
          <div className="form-group">
            <label>NIP Ketua Tim</label>
            <input type="number" value={petugas.nipKetuaTim} onChange={e => updatePetugas('nipKetuaTim', e.target.value)} placeholder="197602022000032001" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>NIP Ketua Tim sesuai surat tugas</small>
          </div>
          <div className="form-group full">
            <label>Nama Pelabuhan</label>
            <input value={petugas.pelabuhan} onChange={e => updatePetugas('pelabuhan', e.target.value)} placeholder="Tanjung Priok" />
            <small style={{display:'block',marginTop:4,fontSize:12,color:'#64748b'}}>Nama pelabuhan KKP yang melaksanakan pemeriksaan</small>
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
