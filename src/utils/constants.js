const serverUrl =
  // process.env.REACT_APP_SERVER_URL ||
  'http://localhost:4848';
const ConnectServerUrl =
  // process.env.REACT_APP_CONNECT_SERVER_URL || 
  'http://localhost:4848';
const CloudName = process.env.REACT_APP_CLOUDINARY_CLOUDNAME;
const UploadPreset = process.env.REACT_APP_UPLOAD_PRESET;
const GoogleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export { serverUrl, CloudName, UploadPreset, ConnectServerUrl, GoogleClientId };
