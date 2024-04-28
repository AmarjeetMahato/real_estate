
import React, { createContext, useEffect, useState } from "react";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext<{ loaded: boolean }>({ loaded: false });


declare global {
  interface Window {
    cloudinary: any; // Adjust the type if you have specific typings for Cloudinary
  }
}

interface UploadConfig {
  cloudName: string;
  uploadPreset: string;
  multiple: boolean;
  maxImageFileSize: number;
  folder: string;
}

interface UploadWidgetProps {
  uwConfig: UploadConfig;
  setPublicId?: (publicId: string) => void;
  setAvatar: React.Dispatch<string[]>;
}



function UploadWidget({ uwConfig, setPublicId, setAvatar}:UploadWidgetProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      const myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error: unknown, result: any) => { // Adjust the types based on Cloudinary's documentation
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setAvatar(result.info.secure_url);
          }
        }
      );

      const uploadWidgetButton = document.getElementById("upload_widget");
if (uploadWidgetButton) {
  uploadWidgetButton.addEventListener(
    "click",
    function () {
      myWidget.open();
    },
    false
  );
}
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        className="cloudinary-button"
        onClick={initializeCloudinaryWidget}
      >
        Upload
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default UploadWidget;
export { CloudinaryScriptContext };
