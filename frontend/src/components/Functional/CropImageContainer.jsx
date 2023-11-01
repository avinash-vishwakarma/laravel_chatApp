import React, { useEffect, useRef, useState } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

const CropImageContainer = ({ imageFile, setCropper }) => {
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef) {
      const cropper = new Cropper(imageRef.current, {
        aspectRatio: 1 / 1,
        zoomable: false,
      });
      setCropper(cropper);
    }
  }, [imageRef]);

  return (
    <img
      className="w-100"
      ref={imageRef}
      src={URL.createObjectURL(imageFile)}
    />
  );
};

export default CropImageContainer;
