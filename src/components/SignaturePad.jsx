import { useRef, useState, useEffect } from 'react';

export default function SignaturePad({ label, value, onSave, onClear }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showPad, setShowPad] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [showPad]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    setIsDrawing(true);
    
    // Support both mouse and touch
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    e.preventDefault(); // Prevent scrolling on touch
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    // Support both mouse and touch
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    onSave(dataUrl);
    setShowPad(false);
  };

  const handleCancel = () => {
    handleClear();
    setShowPad(false);
  };

  return (
    <div className="signature-pad-wrapper">
      <label style={{fontSize:11,fontWeight:600,color:'#475569',marginBottom:8,display:'block'}}>{label}</label>
      
      {value && !showPad ? (
        <div style={{border:'2px solid #e2e8f0',borderRadius:8,padding:8,background:'#f8fafc'}}>
          <img src={value} alt={label} style={{maxHeight:80,maxWidth:'100%',objectFit:'contain'}} />
          <div style={{display:'flex',gap:8,marginTop:8}}>
            <button onClick={() => setShowPad(true)} className="btn-secondary" style={{flex:1,fontSize:11,padding:'6px 12px'}}>
              ✏️ Edit TTD
            </button>
            <button onClick={onClear} className="btn-danger" style={{flex:1,fontSize:11,padding:'6px 12px'}}>
              🗑️ Hapus
            </button>
          </div>
        </div>
      ) : !showPad ? (
        <button onClick={() => setShowPad(true)} className="btn-primary" style={{width:'100%',fontSize:11,padding:'8px 12px'}}>
          ✍️ Tanda Tangan Digital
        </button>
      ) : (
        <div style={{border:'2px solid #0d9488',borderRadius:8,padding:12,background:'#fff'}}>
          <div style={{fontSize:10,color:'#64748b',marginBottom:8}}>Tanda tangan di area bawah:</div>
          <canvas
            ref={canvasRef}
            width={300}
            height={150}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            style={{
              border:'1px solid #cbd5e1',
              borderRadius:4,
              cursor:'crosshair',
              width:'100%',
              background:'#fff',
              touchAction:'none'
            }}
          />
          <div style={{display:'flex',gap:8,marginTop:8}}>
            <button onClick={handleClear} className="btn-secondary" style={{flex:1,fontSize:10,padding:'6px 10px'}}>
              🔄 Ulangi
            </button>
            <button onClick={handleCancel} className="btn-secondary" style={{flex:1,fontSize:10,padding:'6px 10px'}}>
              ✕ Batal
            </button>
            <button onClick={handleSave} className="btn-primary" style={{flex:1,fontSize:10,padding:'6px 10px'}}>
              ✓ Simpan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
