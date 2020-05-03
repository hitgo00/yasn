const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:4848";
const ConnectServerUrl =
  process.env.CONNECT_SERVER_URL || "http://localhost:4848";
const CloudName = process.env.CLOUDINARY_CLOUDNAME;
const UploadPreset = process.env.UPLOAD_PRESET;

export { serverUrl, CloudName, UploadPreset, ConnectServerUrl };
