/* Print-only styles injected into #print-area */
export const PRINT_CSS = `
.page { page-break-after: always; font-family: 'Times New Roman', Times, serif; font-size: 10pt; color: #000; background: #fff !important; }
.page:last-child { page-break-after: avoid; }
.page * { background-color: transparent; }
table { border-collapse: collapse; }
td, th { border: 1px solid #000; padding: 3px 5px; }
.nb td, .nb th { border: none; }

.doc-kop { width: 100%; margin-bottom: 4px; }
.doc-kop img { width: 100%; height: auto; }
.doc-title { text-align: center; font-weight: bold; font-size: 11pt; margin: 8px 0 2px; }
.doc-subtitle { text-align: center; font-weight: bold; font-style: italic; font-size: 10pt; margin-bottom: 8px; }

.du-wrap { font-size: 9pt; margin-bottom: 6px; }
.du-wrap table { width: 100%; }
.du-wrap td { border: none; padding: 1px 0; font-size: 9pt; line-height: 1.5; vertical-align: top; }
.du-left { width: 50%; padding-right: 8px; }
.du-right { width: 50%; padding-left: 8px; }

.ti-wrap { font-size: 9.5pt; margin-bottom: 8px; }
.ti-wrap td { border: none; padding: 1px 4px; font-size: 9.5pt; }

.ck th { text-align: center; font-weight: bold; background: #fff !important; padding: 4px 5px; font-size: 9pt; }
.ck td { padding: 3px 5px; font-size: 9pt; background: #fff !important; vertical-align: top; }
.ck .cn { width: 28px; text-align: center; }
.ck .c1 { width: 70px; text-align: center; }
.ck .c2 { width: 80px; text-align: center; }
.ck .cr { width: 140px; font-size: 8.5pt; word-wrap: break-word; }

.jp { font-size: 9.5pt; margin: 6px 0; }
.iw { font-style: italic; font-weight: bold; font-size: 8.5pt; margin: 8px 0 6px; }

.ts { margin-top: 12px; width: 100%; }
.ts td { border: none; vertical-align: top; padding: 0; font-size: 9pt; }
.tl { width: 45%; }
.ti { height: 50px; display: flex; align-items: flex-end; }
.ti img { max-height: 48px; max-width: 120px; object-fit: contain; }
.tln { border-top: 1px solid #000; width: 160px; margin-top: 2px; }

.ldt { width: 100%; margin-bottom: 8px; font-size: 9.5pt; }
.ldt td { padding: 2px 4px; vertical-align: top; }
.lk { font-size: 9.5pt; margin-bottom: 6px; }
.lk table { width: 100%; }
.lk td { border: 1px solid #000; padding: 3px 6px; font-size: 9.5pt; }

.ca { font-size: 9.5pt; }
.rkc { display: inline-block; width: 14px; height: 14px; border: 1.5px solid #000; vertical-align: middle; text-align: center; line-height: 12px; font-size: 10pt; margin-right: 4px; }
.ks { text-align: center; font-size: 9pt; margin-top: 10px; page-break-inside: avoid; }
`;
