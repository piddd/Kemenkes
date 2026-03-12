import { FORMS, FORM_KEYS } from '../data/forms';
import { PRINT_CSS } from './printStyles';

function fmtTgl(s, withDay = false) {
  if (!s) return '..............................';
  const d = new Date(s + 'T00:00:00');
  const b = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  const hari = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  if (withDay) {
    return `${hari[d.getDay()]}, ${d.getDate()} ${b[d.getMonth()]} ${d.getFullYear()}`;
  }
  return `${d.getDate()} ${b[d.getMonth()]} ${d.getFullYear()}`;
}
function fmtJam(s) { return s || '......'; }
function dot(v, n=30) { return v || '.'.repeat(n); }
function dotLine(t) { return `<div style="min-height:14px;border-bottom:1px dotted #555;margin:1px 0;font-size:9.5pt">${t||''}</div>`; }

export function buildPrintHTML({ kapal: raw, petugas: P, ttd, checklist, rekomendasi, catatan, rekAkhir, fotoDokumentasi }) {
  const K = {
    ...raw,
    tglTiba: fmtTgl(raw.tanggalTiba), jamTiba: fmtJam(raw.jamTiba),
    tglPeriksa: fmtTgl(raw.tanggalPeriksa), jamPeriksa: fmtJam(raw.jamPeriksa),
    tglPeriksaDenganHari: fmtTgl(raw.tanggalPeriksa, true),
    tglBerangkat: fmtTgl(raw.tanggalBerangkat), jamBerangkat: fmtJam(raw.jamBerangkat),
  };

  const ttdImg = (src) => src ? `<img src="${src}" style="max-height:48px;max-width:120px;object-fit:contain">` : '';

  function kop() {
    return `<div class="doc-kop"><img src="/kop-header.png" alt="Kop"></div>`;
  }

  function dataUmum() {
    return `<div class="du-wrap"><strong>A.&nbsp; Data Umum / <em>General Data</em></strong>
    <table class="nb" style="margin-top:4px;font-size:9pt"><tr><td class="du-left"><div style="line-height:1.5">
    1. Nama Kapal <em>(Name Ship)</em> : ${dot(K.namaKapal,20)}<br>
    2. Jenis Kapal <em>(Type of Ship)</em> : ${dot(K.jenisKapal,15)}<br>
    3. Besar Kapal/ <em>Weight (GRT)</em> : ${dot(K.grt,10)}<br>
    4. Datang Dari <em>(Last Port)</em> : ${dot(K.lastPort,15)}<br>
    5. Tanggal/Jam Tiba : ${dot(K.tglTiba,15)} / ${dot(K.jamTiba,5)}<br>
    <em style="margin-left:10px;font-size:8.5pt">(Date/Time of Arrival)</em><br>
    6. Diperiksa Tanggal/Jam : ${dot(K.tglPeriksa,15)} / ${dot(K.jamPeriksa,5)}<br>
    <em style="margin-left:10px;font-size:8.5pt">(Inspected date/Time)</em><br>
    7. Jumlah Awak Kapal : ${dot(K.jumlahABK,8)}<br><em style="margin-left:10px;font-size:8.5pt">(Total Crew)</em><br>
    8. Bendera <em>(Flag)</em> : ${dot(K.bendera,15)}
    </div></td><td class="du-right"><div style="line-height:1.5">
    9. Nomor IMO <em>(IMO Number)</em> : ${dot(K.nomorIMO,10)}<br><br>
    10. Nama Pemilik/Agen : ${dot(K.pemilikAgen,18)}<br><em style="margin-left:14px;font-size:8.5pt">(Agent/Owner)</em><br>
    11. Tujuan <em>(Next Port/ Bound For)</em> : ${dot(K.nextPort,12)}<br>
    12. Tanggal/Jam Berangkat : ${dot(K.tglBerangkat,12)} / ${dot(K.jamBerangkat,5)}<br>
    <em style="margin-left:14px;font-size:8.5pt">(Date/Time of Departure)</em><br>
    13. Lokasi Sandar : ${dot(K.lokasiSandar,18)}<br><em style="margin-left:14px;font-size:8.5pt">(Berthing location)</em><br>
    14. Jumlah penumpang : ${dot(K.jumlahPenumpang,8)}<br><em style="margin-left:14px;font-size:8.5pt">(Total Passanger)</em>
    </div></td></tr></table></div>`;
  }

  function tindakan(k) {
    const f = FORMS[k]; if (!f.tindakan) return '';
    return `<div class="ti-wrap"><strong>A.&nbsp; Tindakan ${f.tindakanType}</strong>
    <table class="nb" style="margin-top:4px">
    <tr><td style="width:160px">Tindakan ${f.tindakanType}</td><td>: <strong><em>${f.tindakan}</em></strong></td></tr>
    <tr><td>Pada hari/tanggal</td><td>: ${K.tglPeriksaDenganHari}</td></tr>
    <tr><td>Pemeriksa</td><td>: ${P.nama1}</td></tr></table></div>`;
  }

  function ckTable(k) {
    const f = FORMS[k]; let rows = '';
    f.items.forEach(item => {
      const v = (checklist[k] || {})[item.id] || '';
      const r = (rekomendasi[k] || {})[item.id] || '';
      const px = item.level ? item.level*14 : (item.indent ? 16 : 0);
      const isH = (item.level===0&&item.no!=='')||(item.no!==''&&!item.indent&&item.level===undefined);
      const lbl = item.en ? `${item.label} <em>(${item.en})</em>` : item.label;
      rows += `<tr><td class="cn">${item.no}</td><td style="padding-left:${4+px}px${isH?';font-weight:bold':''}">${lbl}</td>
      <td class="c1">${v==='col1'?'✓':''}</td><td class="c2">${v==='col2'?'✓':''}</td><td class="cr">${r}</td></tr>`;
    });
    const isL = f.isLaporan;
    return `<table class="ck" style="width:100%"><thead>
    <tr><th class="cn" rowspan="2">No</th><th rowspan="2">${isL?'Jenis Pemeriksaan<br><em>Examinations item</em>':f.colHeader||''}</th>
    <th colspan="2">Kondisi *)</th><th class="cr" rowspan="2">${isL?'Keterangan<br><em>Remark</em>':'Rekomendasi'}</th></tr>
    <tr><th class="c1">${f.col1}${isL?'<br><em>Available</em>':''}</th><th class="c2">${f.col2}${isL?'<br><em>Not Available</em>':''}</th></tr>
    </thead><tbody>${rows}</tbody></table>`;
  }

  function warning() {
    return `<p class="iw"><em>Tidak diperkenankan meminta, menerima suap dan/atau gratifikasi dalam bentuk apapun<br>(It is not permitted to ask for, receive and/or give gratuities ot bribes in any form)</em></p>`;
  }

  function ttdSanitasi() {
    return `<table class="ts nb"><tr><td class="tl" style="vertical-align:top">
    Mengetahui <em>(Knowledge by)</em><br>Nakhoda/Perwira Jaga<br><em>Master / Officer on charge</em>
    <div style="min-height:70px;margin:8px 0;position:relative;width:120px">
    ${ttdImg(ttd.capKapal) ? `<img src="${ttd.capKapal}" style="position:absolute;top:0;left:0;max-height:70px;max-width:60px;object-fit:contain;z-index:1">` : ''}
    ${ttdImg(ttd.nakhoda) ? `<img src="${ttd.nakhoda}" style="position:absolute;top:0;left:40px;max-height:70px;max-width:80px;object-fit:contain;z-index:2">` : ''}
    </div>
    <div class="tln"></div>
    ${dot(K.namaKapten,25)}
    </td><td style="vertical-align:top">${dot(P.pelabuhan||'Tanjung Priok',20)}, ${K.tglPeriksa}<br>Petugas / <em>Officer</em><br><br>
    <div style="min-height:55px;margin-bottom:4px;display:flex;align-items:center;justify-content:flex-start">
    ${ttdImg(ttd.p1) ? `<div style="width:100px;height:55px;display:flex;align-items:center;justify-content:center"><img src="${ttd.p1}" style="max-height:50px;max-width:100px;object-fit:contain"></div>` : '<div style="width:100px;height:55px"></div>'}
    </div>
    1. ${P.nama1}<br>NIP. ${P.nip1}<br><br>
    <div style="min-height:55px;margin-bottom:4px;display:flex;align-items:center;justify-content:flex-start">
    ${ttdImg(ttd.p2) ? `<div style="width:100px;height:55px;display:flex;align-items:center;justify-content:center"><img src="${ttd.p2}" style="max-height:50px;max-width:100px;object-fit:contain"></div>` : '<div style="width:100px;height:55px"></div>'}
    </div>
    2. ${P.nama2}<br>NIP. ${P.nip2}<br><br>
    <div style="min-height:55px;margin-bottom:4px;display:flex;align-items:center;justify-content:flex-start">
    ${ttdImg(ttd.p3) ? `<div style="width:100px;height:55px;display:flex;align-items:center;justify-content:center"><img src="${ttd.p3}" style="max-height:50px;max-width:100px;object-fit:contain"></div>` : '<div style="width:100px;height:55px"></div>'}
    </div>
    3. ${dot(P.nama3,25)}<br>NIP. ${dot(P.nip3,20)}
    </td></tr></table>`;
  }

  function ttdSingle() {
    return `<table class="ts nb"><tr><td class="tl" style="vertical-align:top">
    Mengetahui <em>(Knowledge by)</em><br>Nakhoda/Perwira Jaga<br><em>Master / Officer on charge</em>
    <div style="min-height:70px;margin:8px 0;position:relative;width:120px">
    ${ttdImg(ttd.capKapal) ? `<img src="${ttd.capKapal}" style="position:absolute;top:0;left:0;max-height:70px;max-width:60px;object-fit:contain;z-index:1">` : ''}
    ${ttdImg(ttd.nakhoda) ? `<img src="${ttd.nakhoda}" style="position:absolute;top:0;left:40px;max-height:70px;max-width:80px;object-fit:contain;z-index:2">` : ''}
    </div>
    <div class="tln"></div>
    ${dot(K.namaKapten,25)}
    </td><td style="vertical-align:top">${dot(P.pelabuhan||'Tanjung Priok',20)}, ${K.tglPeriksa}<br>Petugas pemeriksa/ <em>Officer</em><br>
    <div style="min-height:60px;margin:8px 0;display:flex;align-items:center;justify-content:flex-start">
    ${ttdImg(ttd.p1) ? `<div style="width:100px;height:60px;display:flex;align-items:center;justify-content:center"><img src="${ttd.p1}" style="max-height:50px;max-width:100px;object-fit:contain"></div>` : '<div style="width:100px;height:60px"></div>'}
    </div>
    <div class="tln"></div>
    ${P.nama1}<br>NIP. ${P.nip1}</td></tr></table>`;
  }

  function ttdLaporan() {
    return `<table class="ts nb" style="margin-top:8px"><tr>
    <td style="width:40%;vertical-align:top;padding-right:10px">
      <div style="font-size:9pt">Mengetahui <em>(Knowledge by)</em><br>Nakhoda/Perwira Jaga<br><em>Master / Officer on charge</em></div>
      <div style="min-height:70px;margin:8px 0;display:flex;align-items:center;justify-content:flex-start;gap:8px">
        ${ttdImg(ttd.capKapal) ? `<div style="width:70px;height:70px;display:flex;align-items:center;justify-content:center"><img src="${ttd.capKapal}" style="max-height:70px;max-width:70px;object-fit:contain"></div>` : '<div style="width:70px;height:70px"></div>'}
        ${ttdImg(ttd.nakhoda) ? `<div style="width:90px;height:70px;display:flex;align-items:center;justify-content:center"><img src="${ttd.nakhoda}" style="max-height:50px;max-width:90px;object-fit:contain"></div>` : '<div style="width:90px;height:70px"></div>'}
      </div>
      <div class="tln"></div>
      <div style="font-size:9pt">${dot(K.namaKapten,25)}</div>
    </td>
    <td style="width:60%;vertical-align:top;padding-left:10px">
      <div style="font-size:9pt;margin-bottom:6px">${dot(P.pelabuhan||'Tanjung Priok',20)}, ${K.tglPeriksa}<br>Petugas / <em>Officer</em></div>
      <div style="margin-bottom:10px">
        <div style="min-height:50px;margin-bottom:2px;display:flex;align-items:center;justify-content:flex-start">
          ${ttdImg(ttd.p1) ? `<div style="width:100px;height:50px;display:flex;align-items:center;justify-content:center"><img src="${ttd.p1}" style="max-height:45px;max-width:95px;object-fit:contain"></div>` : '<div style="width:100px;height:50px"></div>'}
        </div>
        <div style="font-size:9pt">1. ${P.nama1}<br>NIP. ${P.nip1}</div>
      </div>
      <div style="margin-bottom:10px">
        <div style="min-height:50px;margin-bottom:2px;display:flex;align-items:center;justify-content:flex-start">
          ${ttdImg(ttd.p2) ? `<div style="width:100px;height:50px;display:flex;align-items:center;justify-content:center"><img src="${ttd.p2}" style="max-height:45px;max-width:95px;object-fit:contain"></div>` : '<div style="width:100px;height:50px"></div>'}
        </div>
        <div style="font-size:9pt">2. ${P.nama2}<br>NIP. ${P.nip2}</div>
      </div>
      <div style="margin-bottom:10px">
        <div style="min-height:50px;margin-bottom:2px;display:flex;align-items:center;justify-content:flex-start">
          ${ttdImg(ttd.p3) ? `<div style="width:100px;height:50px;display:flex;align-items:center;justify-content:center"><img src="${ttd.p3}" style="max-height:45px;max-width:95px;object-fit:contain"></div>` : '<div style="width:100px;height:50px"></div>'}
        </div>
        <div style="font-size:9pt">3. ${dot(P.nama3,25)}<br>NIP. ${dot(P.nip3,20)}</div>
      </div>
      <div style="font-size:9pt;margin-top:12px">Kepala Wilker/ Penanggung Jawab<br>Pelabuhan ${dot(P.pelabuhan,20)}</div>
      <div style="min-height:50px;margin:6px 0 2px;display:flex;align-items:center;justify-content:flex-start">
        ${ttdImg(ttd.wilker) ? `<div style="width:100px;height:50px;display:flex;align-items:center;justify-content:center"><img src="${ttd.wilker}" style="max-height:45px;max-width:95px;object-fit:contain"></div>` : '<div style="width:100px;height:50px"></div>'}
      </div>
      <div style="font-size:9pt">${dot(P.namaWilker,25)}<br>NIP. ${dot(P.nipWilker,20)}</div>
    </td>
    </tr></table>
    <div style="text-align:center;margin-top:16px;font-size:9pt;page-break-inside:avoid">
      <div>Mengetahui, <em>(Knowledge by)</em><br>Ketua Tim Kerja Pengawasan Alat Angkut dan Barang</div>
      <div style="min-height:50px;margin:10px 0 2px;display:flex;align-items:center;justify-content:center">
        ${ttdImg(ttd.ketuaTim) ? `<div style="width:100px;height:50px;display:flex;align-items:center;justify-content:center"><img src="${ttd.ketuaTim}" style="max-height:45px;max-width:95px;object-fit:contain"></div>` : '<div style="width:100px;height:50px"></div>'}
      </div>
      <div><strong>${dot(P.namaKetuaTim,30)}</strong><br>NIP. ${dot(P.nipKetuaTim,20)}</div>
    </div>`;
  }

  function ttdVektor() {
    return `<table class="ts nb"><tr><td class="tl" style="vertical-align:top">
    Mengetahui <em>(Knowledge by)</em><br>Nahkoda/Perwira Jaga<br><em>Master / Officer on charge</em>
    <div style="min-height:70px;margin:8px 0;position:relative;width:120px">
    ${ttdImg(ttd.capKapal) ? `<img src="${ttd.capKapal}" style="position:absolute;top:0;left:0;max-height:70px;max-width:60px;object-fit:contain;z-index:1">` : ''}
    ${ttdImg(ttd.nakhoda) ? `<img src="${ttd.nakhoda}" style="position:absolute;top:0;left:40px;max-height:70px;max-width:80px;object-fit:contain;z-index:2">` : ''}
    </div>
    <div class="tln"></div>
    ${dot(K.namaKapten,25)}<br>NIP.
    </td><td style="vertical-align:top">Pemeriksa/<em>Inspector</em><br>
    <div style="min-height:60px;margin:8px 0;display:flex;align-items:center;justify-content:flex-start">
    ${ttdImg(ttd.p1) ? `<div style="width:100px;height:60px;display:flex;align-items:center;justify-content:center"><img src="${ttd.p1}" style="max-height:50px;max-width:100px;object-fit:contain"></div>` : '<div style="width:100px;height:60px"></div>'}
    </div>
    ${P.nama1}<br>NIP. ${P.nip1}
    </td></tr></table>
    <div style="text-align:center;margin-top:20px;font-size:9pt;page-break-inside:avoid">
    Mengetahui, <em>(Knowledge by)</em><br>Ketua Tim Kerja Pengawasan Alat Angkut dan Barang
    <div style="min-height:55px;margin:12px 0;display:flex;align-items:center;justify-content:center">
    ${ttdImg(ttd.ketuaTim) ? `<div style="width:100px;height:55px;display:flex;align-items:center;justify-content:center"><img src="${ttd.ketuaTim}" style="max-height:50px;max-width:100px;object-fit:contain"></div>` : '<div style="width:100px;height:55px"></div>'}
    </div>
    <strong>${dot(P.namaKetuaTim,30)}</strong><br>NIP. ${dot(P.nipKetuaTim,20)}
    </div>`;
  }

  function getTtd(style) {
    if (style==='sanitasi') return ttdSanitasi();
    if (style==='single') return ttdSingle();
    if (style==='laporan') return ttdLaporan();
    if (style==='vektor') return ttdVektor();
    return ttdSingle();
  }

  // === PAGES ===

  function pgSanitasi() {
    return `<div class="page">${kop()}
    <div class="doc-title">SUPERVISI CHECKLIST PEMERIKSAAN SANITASI KAPAL</div>
    <div class="doc-subtitle"><em>(INSPECTION OF SHIP SANITATION)</em></div>
    ${dataUmum()}
    <p class="jp"><strong>B.&nbsp; Jenis Pemeriksaan/<em>Type Inspection</em></strong>&nbsp;&nbsp;: Sanitasi Kapal/<em>Ship Sanitation</em></p>
    ${ckTable('sanitasi')}${warning()}${ttdSanitasi()}</div>`;
  }

  function pgChecklist(k) {
    const f = FORMS[k];
    return `<div class="page">${kop()}
    <div class="doc-title">${f.title}</div>
    ${tindakan(k)}${ckTable(k)}${f.hasWarning?warning():''}${getTtd(f.ttdStyle)}</div>`;
  }

  function pgLaporan() {
    const cs=catatan.sanitasi||'', ca=catatan.airMinum||'', cp=catatan.pangan||'', cl=catatan.limbah||'', cr=catatan.radiasi||'';
    return `<div class="page">${kop()}
    <div class="doc-title">LAPORAN HASIL PEMERIKSAAN SANITASI KAPAL</div>
    <div class="doc-subtitle"><em>(Examination Report of Ship Sanitation Certificate)</em></div>
    <div style="font-size:9.5pt;font-weight:bold;margin-bottom:4px">A.&nbsp; Data Umum /<em>General Data</em></div>
    <table class="ldt nb">
    <tr><td>- Nama Kapal <em>Ship's Name</em></td><td style="width:10px">:</td><td>${dot(K.namaKapal)}</td>
    <td>- Nama Kapten <em>Master' Name</em></td><td style="width:10px">:</td><td>${dot(K.namaKapten)}</td></tr>
    <tr><td>- Bendera/<em>Flag</em></td><td>:</td><td>${dot(K.bendera)}</td>
    <td>- Pemilik /<em>Owner</em></td><td>:</td><td>${dot(K.pemilikAgen)}</td></tr>
    <tr><td>- Besar Kapal /<em>GRT</em></td><td>:</td><td>${dot(K.grt)}</td>
    <td>- No. IMO /<em>IMO No.</em></td><td>:</td><td>${dot(K.nomorIMO,12)}</td></tr>
    <tr><td>- Pelabuhan Asal <em>Last Port</em></td><td>:</td><td>${dot(K.lastPort)}</td>
    <td>- Pelabuhan Tujuan <em>Next Port</em></td><td>:</td><td>${dot(K.nextPort)}</td></tr>
    <tr><td>- Jumlah ABK</td><td>:</td><td>${dot(K.jumlahABK,12)}</td><td></td><td></td><td></td></tr></table>
    <div style="font-size:9.5pt;font-weight:bold;margin:6px 0 4px">B.&nbsp; Data Khusus /<em>Specific Data</em></div>
    <div class="lk"><table>
    <tr><td>- Tanggal Tiba : ${dot(K.tglTiba)} Jam <em>(Hours)</em> : ${dot(K.jamTiba,6)} Lokasi <em>(Location)</em> : ${dot(K.lokasiTiba)}<br><em>(Date of arrival)</em></td></tr>
    <tr><td>- Tanggal Diperiksa : ${dot(K.tglPeriksa)} Jam <em>(Hours)</em> : ${dot(K.jamPeriksa,6)} Lokasi <em>(Location)</em> : ${dot(K.lokasiPeriksa)}<br><em>(Date of Examination)</em></td></tr>
    <tr><td>- Tempat &amp; Tanggal Penerbitan <em>(Port and Date of Issued)</em> SSCEC/SSCC Lama <em>(Latest)</em>:<br>${dot(K.sscecLama,50)}</td></tr></table></div>
    <div style="font-size:9.5pt;font-weight:bold;margin:6px 0 4px">C.&nbsp; Hasil Pemeriksaan /<em>Examination Results</em></div>
    ${ckTable('laporan')}
    <div class="ca" style="margin-top:6px">
    <div style="font-weight:bold;font-size:9pt">Catatan Pemeriksa : <em>(Note Inspector)</em></div>
    <div style="font-weight:bold;margin-top:4px;font-size:9pt">1. Sanitasi Kapal <em>(Ship Sanitation)</em></div>${dotLine(cs)}
    <div style="font-weight:bold;margin-top:3px;font-size:9pt">2. Air Minum <em>(Portable Water)</em></div>${dotLine(ca)}
    <div style="font-weight:bold;margin-top:3px;font-size:9pt">3. Pangan <em>(Foods)</em></div>${dotLine(cp)}
    <div style="font-weight:bold;margin-top:3px;font-size:9pt">4. Pengolahan Limbah <em>(Waste Treatment)</em></div>${dotLine(cl)}
    <div style="font-weight:bold;margin-top:3px;font-size:9pt">5. Radiasi <em>(Radiation)</em></div>${dotLine(cr)}
    </div>
    <div style="margin-top:8px;font-size:9.5pt">
    <strong>D.&nbsp; Rekomendasi / <em>Recommendation</em></strong><br><br>
    <span class="rkc">${rekAkhir==='SSCEC'?'✓':''}</span> Diterbitkan SSCEC <em>(issued SSCEC)</em><br>
    <span class="rkc">${rekAkhir==='SSCC'?'✓':''}</span> Diterbitkan SSCC <em>(issued SSCC)</em><br>
    Keterangan :<br>*) Beri tanda (V) pada kolom sesuai dengan kondisi</div>
    ${warning()}${ttdLaporan()}</div>`;
  }

  function pgVektor() {
    return `<div class="page">${kop()}
    <div class="doc-title" style="font-size:10.5pt">SUPERVISI CHECKLIST PEMERIKSAAN VEKTOR & BINATANG PENULAR PENYAKIT</div>
    ${dataUmum()}
    <p class="jp"><strong>B.&nbsp; Jenis Pemeriksaan / <em>Type Inspection</em></strong>&nbsp;&nbsp;: Vektor dan Binatang Penular Penyakit<br>
    <span style="margin-left:225px"><em>(Vector and Animal Borne Diseases)</em></span></p>
    ${ckTable('vektor')}
    <div style="font-size:8.5pt;margin:4px 0">Keterangan :<br>*) Beri tanda (V) pada kolom sesuai dengan kondisi</div>
    <div style="font-size:9pt;margin-bottom:4px">Catatan Pemeriksa : <em>(Note Inspector)</em></div>
    ${dotLine('')}${dotLine('')}
    ${warning()}${ttdVektor()}</div>`;
  }

  function pgDokumentasi() {
    if (!fotoDokumentasi || fotoDokumentasi.length === 0) return '';
    
    return `<div class="page">${kop()}
    <div class="doc-title">DOKUMENTASI PEMERIKSAAN KAPAL</div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:16px">
    ${fotoDokumentasi.map(foto => `<div style="border:2px solid #000;padding:4px"><img src="${foto}" style="width:100%;height:auto;display:block"></div>`).join('')}
    </div></div>`;
  }

  // Combine all pages
  const pages = pgSanitasi() +
    pgChecklist('airMinum') + pgChecklist('pangan') +
    pgChecklist('limbah') + pgChecklist('radiasi') +
    pgLaporan() + pgVektor() + pgDokumentasi();

  return `<style>${PRINT_CSS}</style>${pages}`;
}
