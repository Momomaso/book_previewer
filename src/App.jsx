import { useState } from "react";

export default function BookPreviewer() {
  const [cover, setCover] = useState(null);
  const [pages, setPages] = useState([]);
  const [spreadIndex, setSpreadIndex] = useState(0);

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) setCover(URL.createObjectURL(file));
  };

  const handleContentUpload = (e) => {
    const files = Array.from(e.target.files);
    setPages(files.map((f) => URL.createObjectURL(f)));
  };

  const nextSpread = () => {
    if (spreadIndex < Math.ceil(pages.length / 2)) {
      setSpreadIndex(spreadIndex + 1);
    }
  };

  const prevSpread = () => {
    if (spreadIndex > 0) setSpreadIndex(spreadIndex - 1);
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* Upload buttons */}
      <div style={{ marginBottom: 20 }}>
        <label>
          Upload Cover:
          <input type="file" accept="image/*" onChange={handleCoverUpload} />
        </label>
        <label style={{ marginLeft: 20 }}>
          Upload Content (multiple images):
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleContentUpload}
          />
        </label>
      </div>

      {/* Book viewer */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          border: "1px solid #ccc",
          padding: 20,
          minHeight: 400,
        }}
      >
        {spreadIndex === 0 ? (
          // Show cover only
          cover && (
            <img
              src={cover}
              alt="Cover"
              style={{ maxWidth: "400px", maxHeight: "600px" }}
            />
          )
        ) : (
          <>
            {/* Left page */}
            {pages[(spreadIndex - 1) * 2] && (
              <img
                src={pages[(spreadIndex - 1) * 2]}
                alt="Left Page"
                style={{ maxWidth: "300px", maxHeight: "500px" }}
              />
            )}
            {/* Right page */}
            {pages[(spreadIndex - 1) * 2 + 1] && (
              <img
                src={pages[(spreadIndex - 1) * 2 + 1]}
                alt="Right Page"
                style={{ maxWidth: "300px", maxHeight: "500px" }}
              />
            )}
          </>
        )}
      </div>

      {/* Navigation */}
      <div style={{ marginTop: 20 }}>
        <button onClick={prevSpread} disabled={spreadIndex === 0}>
          ⬅ Prev
        </button>
        <button
          onClick={nextSpread}
          disabled={spreadIndex >= Math.ceil(pages.length / 2)}
          style={{ marginLeft: 20 }}
        >
          Next ⮕
        </button>
      </div>
    </div>
  );
}
