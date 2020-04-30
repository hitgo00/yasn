import React from "react";

export default function Upload(props) {
  let widget = window.cloudinary.createUploadWidget(
    {
      cloudName: "hitgo",
      uploadPreset: "fmysidde",
      multiple: false,
      cropping: true,
      showSkipCropButton: false,
      croppingAspectRatio: 1,
      folder: "daconnect",
      clientAllowedFormats: ["png", "jpeg", "gif", "mp4", "mov", "heic"],
      maxFileSize: 7000000,
      maxImageFileSize: 3500000,
      maxVideoFileSize: 30000000,
      maxImageWidth: 2000,
      maxImageHeight: 2000,
      sources: ["local", "instagram", "facebook"],
    },
    (err, res) => console.log(err ? err : res)
  );
  const showWidget = () => {
    widget.open();
  };

  return (
    <div>
      <button onClick={showWidget}>
        {props.element} <br />
        {props.text}
      </button>
    </div>
  );
}
