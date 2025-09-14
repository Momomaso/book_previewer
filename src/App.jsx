import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./index.css";

// إعداد مكتبة PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function BookPreviewer() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [spreadIndex, setSpreadIndex] = useState(0);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setSpreadIndex(0);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const nextSpread = () => {
    if (spreadIndex < Math.ceil(numPages / 2)) {
      setSpreadIndex(spreadIndex + 1);
    }
  };

  const prevSpread = () => {
    if (spreadIndex > 0) setSpreadIndex(spreadIndex - 1);
  };

  return (
    <div className="container">
      {/* رفع الملف */}
      <div className="upload-box">
        <label className="upload-btn">
          Upload PDF (Cover + Content)
          <input type="file" accept="application/pdf" onChange={onFileChange} />
        </label>
      </div>

      {/* المشاهد */}
      <div className="book-viewer">
        {file && (
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            {/* أول صفحة = الغلاف */}
            {spreadIndex === 0 ? (
              <div className="page-wrapper cover">
                <Page
                  pageNumber={1}
                  width={400}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
                <div className="trim-lines"></div>
              </div>
            ) : (
              <>
                {/* صفحة يسار */}
                <div className="page-wrapper">
                  {spreadIndex * 2 - 1 <= numPages && (
                    <>
                      <Page
                        pageNumber={spreadIndex * 2}
                        width={350}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                      />
                      <div className="trim-lines"></div>
                    </>
                  )}
                </div>
                {/* صفحة يمين */}
                <div className="page-wrapper">
                  {spreadIndex * 2 + 1 <= numPages && (
                    <>
                      <Page
                        pageNumber={spreadIndex * 2 + 1}
                        width={350}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                      />
                      <div className="trim-lines"></div>
                    </>
                  )}
                </div>
              </>
            )}
          </Document>
        )}
      </div>

      {/* أزرار التنقل */}
      <div className="nav-btns">
        <button onClick={prevSpread} disabled={spreadIndex === 0}>
          ⬅ Prev
        </button>
        <button
          onClick={nextSpread}
          disabled={spreadIndex >= Math.ceil(numPages / 2)}
        >
          Next ⮕
        </button>
      </div>
    </div>
  );
}
