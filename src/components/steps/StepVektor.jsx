import { FORMS } from '../../data/forms';

export default function StepVektor({ checklist, updateChecklist, rekomendasi, updateRekomendasi, prevStep, nextStep }) {
  const form = FORMS.vektor;

  return (
    <div className="step-wrapper">
      <div className="card">
        <h3 className="card-title">Checklist Pemeriksaan</h3>
        <div className="table-responsive">
          <table className="ck-table">
            <thead>
              <tr>
                <th style={{width:40}}>No</th>
                <th>Lokasi yang diperiksa</th>
                <th style={{width:120}}>Tampak Tanda-tanda</th>
                <th style={{width:120}}>Tidak Tampak</th>
                <th style={{width:180}}>Rekomendasi</th>
              </tr>
            </thead>
            <tbody>
              {form.items.map(item => {
                const val = (checklist.vektor || {})[item.id] || '';
                const rek = (rekomendasi.vektor || {})[item.id] || '';
                const isHeader = (item.level===0 && item.no!=='') || (item.no!=='' && !item.indent && item.level===undefined);
                
                return (
                  <tr key={item.id} className={isHeader ? 'row-header' : ''}>
                    <td style={{textAlign:'center'}}>{item.no}</td>
                    <td style={{paddingLeft: item.indent ? 24 : (item.level ? item.level*14+4 : 4)}}>
                      {item.label} {item.en && <em>({item.en})</em>}
                    </td>
                    <td className="radio-cell">
                      <input 
                        type="radio" 
                        checked={val === 'col1'} 
                        onChange={() => updateChecklist('vektor', item.id, 'col1')} 
                      />
                    </td>
                    <td className="radio-cell">
                      <input 
                        type="radio" 
                        checked={val === 'col2'} 
                        onChange={() => updateChecklist('vektor', item.id, 'col2')} 
                      />
                    </td>
                    <td>
                      <input 
                        className="rek-input" 
                        value={rek} 
                        onChange={e => updateRekomendasi('vektor', item.id, e.target.value)} 
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="step-actions">
        <button className="btn-back" onClick={prevStep}>
          ← Kembali
        </button>
        <button className="btn-next" onClick={nextStep}>
          Lanjut ke Laporan →
        </button>
      </div>
    </div>
  );
}
