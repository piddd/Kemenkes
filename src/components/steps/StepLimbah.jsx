import { FORMS } from '../../data/forms';

export default function StepLimbah({ checklist, updateChecklist, rekomendasi, updateRekomendasi, catatan, updateCatatan, prevStep, nextStep }) {
  const form = FORMS.limbah;

  return (
    <div className="step-wrapper">
      <div className="step-header">
        <h2>Limbah</h2>
        <p>Supervisi checklist pengamanan pengolahan limbah</p>
      </div>

      <div className="card">
        <h3 className="card-title">Checklist Pemeriksaan</h3>
        <div className="table-responsive">
          <table className="ck-table">
            <thead>
              <tr>
                <th style={{width:40}}>No</th>
                <th>Prosedur Tindakan Pengamanan</th>
                <th style={{width:100}}>Sesuai</th>
                <th style={{width:100}}>Tidak Sesuai</th>
                <th style={{width:180}}>Rekomendasi</th>
              </tr>
            </thead>
            <tbody>
              {form.items.map(item => {
                const val = (checklist.limbah || {})[item.id] || '';
                const rek = (rekomendasi.limbah || {})[item.id] || '';
                const isHeader = item.level === 0;
                
                return (
                  <tr key={item.id} className={isHeader ? 'row-header' : ''}>
                    <td style={{textAlign:'center'}}>{item.no}</td>
                    <td style={{paddingLeft: item.level ? item.level*14+4 : 4}}>
                      {item.label}
                    </td>
                    <td className="radio-cell">
                      <input 
                        type="radio" 
                        checked={val === 'col1'} 
                        onChange={() => updateChecklist('limbah', item.id, 'col1')} 
                      />
                    </td>
                    <td className="radio-cell">
                      <input 
                        type="radio" 
                        checked={val === 'col2'} 
                        onChange={() => updateChecklist('limbah', item.id, 'col2')} 
                      />
                    </td>
                    <td>
                      <input 
                        className="rek-input" 
                        value={rek} 
                        onChange={e => updateRekomendasi('limbah', item.id, e.target.value)} 
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
        <h3 className="card-title">Catatan Pemeriksa</h3>
        <div className="form-group">
          <label>Catatan untuk Pengolahan Limbah</label>
          <textarea 
            value={catatan.limbah} 
            onChange={e => updateCatatan('limbah', e.target.value)} 
            rows={3}
            placeholder="Tulis catatan pemeriksaan limbah..."
          />
        </div>
      </div>

      <div className="step-actions">
        <button className="btn-back" onClick={prevStep}>
          ← Kembali
        </button>
        <button className="btn-next" onClick={nextStep}>
          Lanjut ke Radiasi →
        </button>
      </div>
    </div>
  );
}
