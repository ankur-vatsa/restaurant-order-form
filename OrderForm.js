// OrderForm.js
import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import './OrderForm.css'; // Import the CSS file for styling

const OrderForm = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadButtonActive, setUploadButtonActive] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const webcamRef = React.useRef(null);

  useEffect(() => {
    // Fetch the list of available video devices
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const cameras = devices.filter((device) => device.kind === 'videoinput');
      setVideoDevices(cameras);
      setSelectedDevice(cameras[0]?.deviceId); // Select the first available camera by default
    });
  }, []);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setUploadButtonActive(true);
  }, [webcamRef, setCapturedImage, setUploadButtonActive]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUploadButtonActive(true);
  };

  const handleOrderIdChange = (e) => {
    setOrderId(e.target.value);
  };

  const handleRemoveCapture = () => {
    setCapturedImage(null);
    setUploadButtonActive(false);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadButtonActive(false);
  };

  const handleUpload = () => {
    // Implement your image upload logic here
    setCapturedImage(null);
    setSelectedFile(null);
    setUploadButtonActive(false);
    setOrderId('');
  };

  const handleDeviceChange = (e) => {
    setSelectedDevice(e.target.value);
  };

  return (
    <div className="order-form-container">
      <h1>Restaurant Order Form</h1>

      <div className="webcam-container">
        <label>Select Camera:</label>
        <select onChange={handleDeviceChange} value={selectedDevice}>
          {videoDevices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Camera ${videoDevices.indexOf(device) + 1}`}
            </option>
          ))}
        </select>

        <Webcam
          audio={false}
          height={200}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={300}
          videoConstraints={{ deviceId: selectedDevice }}
        />
        <button onClick={capture}>Capture Image</button>
        {capturedImage && (
          <div className="image-preview">
            <p>Image captured:</p>
            <img src={capturedImage} alt="Captured" />
            <button onClick={handleRemoveCapture}>Remove Capture</button>
          </div>
        )}
      </div>

      <div className="file-upload-container">
        <p>Or choose a file to upload:</p>
        <input type="file" onChange={handleFileChange} />
        {selectedFile && (
          <div className="image-preview">
            <p>Selected file:</p>
            <img src={URL.createObjectURL(selectedFile)} alt="Selected" />
            <button onClick={handleRemoveFile}>Remove File</button>
          </div>
        )}
      </div>

      <div className="order-id-container">
        <p>Enter ORDER-ID:</p>
        <input type="text" value={orderId} onChange={handleOrderIdChange} />
      </div>

      {uploadButtonActive && (
        <div className="upload-button-container">
          <button onClick={handleUpload}>Upload Image</button>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
