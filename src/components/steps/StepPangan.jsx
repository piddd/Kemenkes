import { FORMS } from '../../data/forms';

export default function StepPangan({ checklist, updateChecklist, rekomendasi, updateRekomendasi, catatan, updateCatatan, prevStep, nextStep }) {
  const form = FORMS.pangan;

  return (
    <div className="step-wrapper">
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
                const val = (checklist.pangan || {})[item.id] || '';
                const rek = (rekomendasi.pangan || {})[item.id] || '';
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
                        onChange={() => updateChecklist('pangan', item.id, 'col1')} 
                      />
                    </td>
                    <td className="radio-cell">
                      <input 
                        type="radio" 
                        checked={val === 'col2'} 
                        onChange={() => updateChecklist('pangan', item.id, 'col2')} 
                      />
                    </td>
                    <td>
                      <input 
                        className="rek-input" 
                        value={rek} 
                        onChange={e => updateRekomendasi('pangan', item.id, e.target.value)} 
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
          <label>Catatan untuk Pangan</label>
          <textarea 
            value={catatan.pangan} 
            onChange={e => updateCatatan('pangan', e.target.value)} 
            rows={3}
            placeholder="Tulis catatan pemeriksaan pangan..."
          />
        </div>
      </div>

      <div className="step-actions">
        <button className="btn-back" onClick={prevStep}>
          ← Kembali
        </button>
        <button className="btn-next" onClick={nextStep}>
          Lanjut ke Limbah →
        </button>
      </div>
    </div>
  );
}
