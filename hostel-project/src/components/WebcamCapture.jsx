// src/components/WebcamCapture.jsx
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const WebcamCapture = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [rollNo, setRollNo] = useState("");

  const capture = async () => {
    if (!rollNo) {
      alert("Please enter your Roll Number.");
      return;
    }

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      alert("Webcam not ready.");
      return;
    }

    const blob = await fetch(imageSrc).then((res) => res.blob());
    const file = new File([blob], `${rollNo}-${Date.now()}.png`, {
      type: "image/png",
    });

    const formData = new FormData();
    formData.append("rollNo", rollNo);
    formData.append("image", file);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/attendance",
        formData
      );
      if (res.data.success) {
        onCapture(res.data.record);
        alert("Check-in successful!");
      } else {
        alert("Check-in failed.");
      }
    } catch (error) {
      console.error("Error marking attendance", error);
      alert("Server error while marking attendance.");
    }

    setRollNo("");
  };

  return (
    <div className="text-center">
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/png" />
      <input
        type="text"
        placeholder="Enter Roll No"
        className="border p-2 mt-4"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
      />
      <button
        onClick={capture}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Check In
      </button>
    </div>
  );
};

export default WebcamCapture;
