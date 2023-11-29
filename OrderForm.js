// OrderForm.js
import React, { useState } from 'react';
import Webcam from 'react-webcam';

const OrderForm = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadButtonActive, setUploadButtonActive] = useState(false);
  const [orderId, setOrderId] = useState('');

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setUploadButtonActive(true); // Activate upload button after capturing an image
  }, [webcamRef, setCapturedImage, setUploadButtonActive]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUploadButtonActive(true); // Activate upload button after selecting a file
  };

  const handleOrderIdChange = (e) => {
    setOrderId(e.target.value);
  };

  const handleUpload = () => {
    // Implement your image upload logic here
    // You can use a cloud storage service or a backend API for this purpose
    // For example, if using a cloud storage service, you might generate a unique filename and upload the file
    // Here, we're just resetting the state to simulate the upload
    setCapturedImage(null);
    setSelectedFile(null);
    setUploadButtonActive(false);
    setOrderId('');
  };

  return (
    <div style={{ textAlign: 'center', margin: 'auto' }}>
      <h1>Restaurant Order Form</h1>

      <div>
        <Webcam
          audio={false}
          height={200}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={300}
        />
        <button onClick={capture}>Capture Image</button>
      </div>

      {capturedImage && (
        <div>
          <p>Image captured:</p>
          <img src={capturedImage} alt="Captured" />
        </div>
      )}

      <div>
        <p>Or choose a file to upload:</p>
        <input type="file" onChange={handleFileChange} />
      </div>

      {selectedFile && (
        <div>
          <p>Selected file:</p>
          <img src={URL.createObjectURL(selectedFile)} alt="Selected" />
        </div>
      )}

      <div>
        <p>Enter ORDER-ID:</p>
        <input type="text" value={orderId} onChange={handleOrderIdChange} />
      </div>

      {uploadButtonActive && (
        <div>
          <button onClick={handleUpload}>Upload Image</button>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
