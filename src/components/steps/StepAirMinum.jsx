import { FORMS } from '../../data/forms';

export default function StepAirMinum({ checklist, updateChecklist, rekomendasi, updateRekomendasi, catatan, updateCatatan, prevStep, nextStep }) {
  const form = FORMS.airMinum;

  return (
    <div className="step-wrapper">
      <div className="step-header">
        <h2>Air Minum</h2>
        <p>Supervisi checklist penyehatan air minum</p>
      </div>

      <div className="card">
        <h3 className="card-title">Checklist Pemeriksaan</h3>
        <div className="table-responsive">
          <table className="ck-table">
            <thead>
              <tr>
                <th style={{width:40}}>No</th>
                <th>Prosedur Tindakan Penyehatan</th>
                <th style={{width:100}}>Sesuai</th>
                <th style={{width:100}}>Tidak Sesuai</th>
                <th style={{width:180}}>Rekomendasi</th>
              </tr>
            </thead>
            <tbody>
              {form.items.map(item => {
                const val = (checklist.airMinum || {})[item.id] || '';
                const rek = (rekomendasi.airMinum || {})[item.id] || '';
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
                        onChange={() => updateChecklist('airMinum', item.id, 'col1')} 
                      />
                    </td>
                    <td className="radio-cell">
                      <input 
                        type="radio" 
                        checked={val === 'col2'} 
                        onChange={() => updateChecklist('airMinum', item.id, 'col2')} 
                      />
                    </td>
                    <td>
                      <input 
                        className="rek-input" 
                        value={rek} 
                        onChange={e => updateRekomendasi('airMinum', item.id, e.target.value)} 
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
          <label>Catatan untuk Air Minum</label>
          <textarea 
            value={catatan.airMinum} 
            onChange={e => updateCatatan('airMinum', e.target.value)} 
            rows={3}
            placeholder="Tulis catatan pemeriksaan air minum..."
          />
        </div>
      </div>

      <div className="step-actions">
        <button className="btn-back" onClick={prevStep}>
          ← Kembali
        </button>
        <button className="btn-next" onClick={nextStep}>
          Lanjut ke Pangan →
        </button>
      </div>
    </div>
  );
}
