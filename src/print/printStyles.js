/* Compact Professional Print Styles - Optimized for 1-2 Pages */
export const PRINT_CSS = `
/* ===== PAGE SETUP ===== */
@page { 
  size: A4 portrait; 
  margin: 1cm 1cm;
}

* {
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
  color-adjust: exact !important;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
  font-family: Arial, 'Helvetica Neue', sans-serif;
  font-size: 9pt;
  line-height: 1.2;
  color: #000;
  background: #fff;
}

/* ===== PAGE CONTAINER ===== */
.page { 
  page-break-after: always;
  page-break-inside: avoid;
  font-family: Arial, 'Helvetica Neue', sans-serif;
  font-size: 9pt; 
  color: #000; 
  background: #fff !important;
  width: 100%;
  max-width: 210mm;
  margin: 0 auto;
  padding: 0;
  position: relative;
}

.page:last-child { 
  page-break-after: avoid; 
}

.page * { 
  background-color: transparent !important;
}

/* ===== TABLE DEFAULTS ===== */
table { 
  border-collapse: collapse; 
  width: 100%;
  margin: 0;
  page-break-inside: auto;
}

tr {
  page-break-inside: avoid;
  page-break-after: auto;
}

td, th { 
  border: 1px solid #000; 
  padding: 2px 4px;
  vertical-align: top;
  font-size: 8.5pt;
  line-height: 1.2;
}

.nb td, .nb th { 
  border: none; 
}

/* ===== HEADER SECTION ===== */
.doc-kop { 
  width: 100%; 
  margin: 0 0 4px 0;
  text-align: center;
  page-break-inside: avoid;
}

.doc-kop img { 
  width: 100%; 
  max-width: 100%;
  height: auto; 
  display: block;
  margin: 0 auto;
}

.doc-title { 
  text-align: center; 
  font-weight: bold; 
  font-size: 10pt; 
  margin: 4px 0 2px;
  line-height: 1.2;
  page-break-after: avoid;
}

.doc-subtitle { 
  text-align: center; 
  font-weight: bold; 
  font-style: italic; 
  font-size: 9pt; 
  margin: 0 0 4px;
  page-break-after: avoid;
}

/* ===== DATA UMUM SECTION - 2 COLUMN LAYOUT ===== */
.du-wrap { 
  font-size: 8.5pt; 
  margin: 6px 0 8px;
  page-break-inside: avoid;
}

.du-wrap strong {
  font-size: 9pt;
  display: block;
  margin-bottom: 4px;
}

.du-wrap table {
  width: 100%;
  border: none;
}

.du-wrap td {
  border: none;
  font-size: 8.5pt;
  line-height: 1.6;
  vertical-align: top;
}

/* ===== TINDAKAN SECTION - COMPACT ===== */
.ti-wrap { 
  font-size: 8.5pt; 
  margin: 4px 0 6px;
  page-break-inside: avoid;
}

.ti-wrap strong {
  font-size: 9pt;
  display: block;
  margin-bottom: 2px;
}

.ti-wrap table {
  border: none;
}

.ti-wrap td { 
  border: none; 
  padding: 1px 4px;
  font-size: 8.5pt;
  line-height: 1.3;
}

/* ===== CHECKLIST TABLE - COMPACT ===== */
.ck { 
  width: 100%;
  margin: 6px 0;
  border: 1.5px solid #000;
  font-size: 8pt;
}

.ck thead {
  background: #fff !important;
}

.ck th { 
  text-align: center; 
  font-weight: bold; 
  background: #fff !important; 
  padding: 3px 3px;
  font-size: 8.5pt;
  border: 1px solid #000;
  line-height: 1.2;
}

.ck tbody tr {
  page-break-inside: avoid;
}

.ck td { 
  padding: 2px 3px;
  font-size: 8pt; 
  background: #fff !important; 
  vertical-align: middle;
  border: 1px solid #000;
  line-height: 1.2;
}

.ck .cn { 
  width: 25px; 
  text-align: center;
  font-weight: 500;
}

.ck .c1 { 
  width: 60px; 
  text-align: center;
  font-weight: 500;
}

.ck .c2 { 
  width: 70px; 
  text-align: center;
  font-weight: 500;
}

.ck .cr { 
  width: 120px;
  font-size: 7.5pt;
  word-wrap: break-word;
  word-break: break-word;
}

/* ===== JENIS PEMERIKSAAN ===== */
.jp { 
  font-size: 9pt; 
  margin: 4px 0;
  line-height: 1.3;
  page-break-after: avoid;
}

.jp strong {
  font-weight: bold;
}

/* ===== WARNING TEXT - COMPACT ===== */
.iw { 
  font-style: italic; 
  font-weight: bold; 
  font-size: 7.5pt; 
  margin: 6px 0 4px;
  text-align: center;
  line-height: 1.2;
  page-break-inside: avoid;
}

/* ===== SIGNATURE SECTION - COMPACT ===== */
.ts { 
  margin-top: 8px;
  width: 100%;
  page-break-inside: avoid;
}

.ts table {
  border: none;
}

.ts td { 
  border: none; 
  vertical-align: top; 
  padding: 2px 4px;
  font-size: 8.5pt;
  line-height: 1.2;
}

.tl { 
  width: 40%;
  padding-right: 8px;
}

.ti { 
  min-height: 40px;
  height: auto;
  display: flex; 
  align-items: flex-end;
  margin: 4px 0;
}

.ti img { 
  max-height: 38px;
  max-width: 100px;
  object-fit: contain;
}

.tln { 
  border-top: 1px solid #000;
  width: 140px;
  margin: 2px 0 1px;
}

/* ===== LAPORAN TABLES - COMPACT ===== */
.ldt { 
  width: 100%;
  margin: 4px 0 6px;
  font-size: 8.5pt;
  border: none;
}

.ldt td { 
  padding: 1px 3px;
  vertical-align: top;
  border: none;
  line-height: 1.3;
}

.lk { 
  font-size: 8.5pt; 
  margin: 4px 0 6px;
}

.lk table { 
  width: 100%;
  border: 1px solid #000;
}

.lk td { 
  border: 1px solid #000;
  padding: 2px 4px;
  font-size: 8.5pt;
  line-height: 1.3;
}

/* ===== CATATAN SECTION - COMPACT ===== */
.ca { 
  font-size: 8.5pt;
  margin: 6px 0;
  line-height: 1.2;
}

/* ===== REKOMENDASI CHECKBOX ===== */
.rkc { 
  display: inline-block;
  width: 13px;
  height: 13px;
  border: 1.5px solid #000;
  vertical-align: middle;
  text-align: center;
  line-height: 11px;
  font-size: 10pt;
  font-weight: bold;
  margin-right: 4px;
}

/* ===== KEPALA SECTION - COMPACT ===== */
.ks { 
  text-align: center;
  font-size: 8.5pt;
  margin: 10px 0 0;
  page-break-inside: avoid;
  line-height: 1.2;
}

/* ===== PRINT MEDIA QUERIES ===== */
@media print {
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
  
  body {
    margin: 0 !important;
    padding: 0 !important;
    background: #fff !important;
  }
  
  .page {
    margin: 0 !important;
    padding: 0 !important;
    box-shadow: none !important;
  }
  
  /* Prevent orphans and widows */
  p, h1, h2, h3, h4, h5, h6 {
    orphans: 2;
    widows: 2;
  }
  
  /* Keep tables together */
  table, tr, td, th {
    page-break-inside: avoid;
  }
  
  /* Signature sections should stay together */
  .ts, .ks {
    page-break-inside: avoid;
  }
}

/* ===== MOBILE/WEB PREVIEW ===== */
@media screen {
  .page {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    margin: 20px auto;
    padding: 1cm 1cm;
  }
}
`;
