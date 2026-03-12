import { FORMS } from '../../data/forms';

export default function StepLaporan({ checklist, updateChecklist, rekomendasi, updateRekomendasi, rekAkhir, setRekAkhir, prevStep, nextStep }) {
  const form = FORMS.laporan;

  return (
    <div className="step-wrapper">
      <div className="step-header">
        <h2>Laporan Hasil</h2>
        <p>Laporan hasil pemeriksaan sanitasi kapal</p>
      </div>

      <div className="card">
        <h3 className="card-title">Checklist Pemeriksaan</h3>
        <div className="table-responsive">
          <table className="ck-table">
            <thead>
              <tr>
                <th style={{width:40}}>No</th>
                <th>Jenis Pemeriksaan</th>
                <th style={{width:100}}>Ada</th>
                <th style={{width:100}}>Tidak Ada</th>
                <th style={{width:180}}>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {form.items.map(item => {
                const val = (checklist.laporan || {})[item.id] || '';
                const rek = (rekomendasi.laporan || {})[item.id] || '';
                const isHeader = item.level === 0 && item.no !== '';
                
                return (
                  <tr key={item.id} className={isHeader ? 'row-header' : ''}>
                    <td style={{textAlign:'center'}}>{item.no}</td>
                    <td style={{paddingLeft: item.level ? item.level*14+4 : 4}}>
                      {item.label} {item.en && <em>({item.en})</em>}
                    </td>
                    <td className="radio-cell">
                      <input 
                        type="radio" 
                        checked={val === 'col1'} 
                        onChange={() => updateChecklist('laporan', item.id, 'col1')} 
                      />
                    </td>
                    <td className="radio-cell">
                      <input 
                        type="radio" 
                        checked={val === 'col2'} 
                        onChange={() => updateChecklist('laporan', item.id, 'col2')} 
                      />
                    </td>
                    <td>
                      <input 
                        className="rek-input" 
                        value={rek} 
                        onChange={e => updateRekomendasi('laporan', item.id, e.target.value)} 
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Rekomendasi Akhir</h3>
        <div className="rek-akhir">
          <label>
            <input 
              type="radio" 
              checked={rekAkhir === 'SSCEC'} 
              onChange={() => setRekAkhir('SSCEC')} 
            />
            <span>Diterbitkan SSCEC <em>(issued SSCEC)</em></span>
          </label>
          <label>
            <input 
              type="radio" 
              checked={rekAkhir === 'SSCC'} 
              onChange={() => setRekAkhir('SSCC')} 
            />
            <span>Diterbitkan SSCC <em>(issued SSCC)</em></span>
          </label>
        </div>
      </div>

      <div className="step-actions">
        <button className="btn-back" onClick={prevStep}>
          ← Kembali
        </button>
        <button className="btn-next" onClick={nextStep}>
          Lanjut ke Submit & TTD →
        </button>
      </div>
    </div>
  );
}
