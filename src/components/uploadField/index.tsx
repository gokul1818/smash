import React, { useState } from "react";
import "./styles.css";
import close from "../../assets/images/close.svg";
import gallery from "../../assets/images/gallery.png";

interface UploadDocumentFieldProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
}

const UploadDocumentField: React.FC<UploadDocumentFieldProps> = ({
  onFileSelect,
  selectedFile,
  setSelectedFile,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setIsLoading(true);
      await onFileSelect(file);
      setIsLoading(false);
    }
  };

  const handleFileDelete = (e: any) => {
    e.stopPropagation();
    setSelectedFile(null);
  };

  return (
    <div className="upload-document-field">
      <div className="upload-document-field-row">
        <label className="upload-label">
          {!selectedFile ? (
            <>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                onChange={!selectedFile ? handleFileChange : undefined}
                disabled={isLoading}
              />
              <img src={gallery} alt="gallery" className="camera" />
            </>
          ) : (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="preview"
              className="preview"
            />
          )}
          {!selectedFile && <span>Gallery</span>}
          {selectedFile && (
            <img
              src={close}
              alt="close"
              className="close"
              onClick={(e) => handleFileDelete(e)}
            />
          )}
        </label>
      </div>
    </div>
  );
};

export default UploadDocumentField;
