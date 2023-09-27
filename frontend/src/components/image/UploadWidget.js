import React, { useState, useRef } from "react";
import jwtDecode from "jwt-decode";
import "./UploadWidget.css";

const UploadWidget = ({image}) => {
  const token = window.localStorage.getItem("token");
  const userId = jwtDecode(token).user_id;
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [userImageUrl, setUserImageUrl] = useState("");

  cloudinaryRef.current = window.cloudinary;
  widgetRef.current = cloudinaryRef.current.createUploadWidget(
    {
      cloudName: "dzdwjdv7d",
      uploadPreset: "cdnf3xhm",
    },
    async function (error, result) {
      if (!error && result && result.event === "success") {
        const imageUrl = await result.info.secure_url;
        setUserImageUrl(imageUrl)
        saveImageUrl(imageUrl)
      }
    }
  );

  const openWidget = () => {
    widgetRef.current.open();
  };

  const saveImageUrl = async (url) => {
    if (token) {
      try {
        await fetch(`/user`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: userId,
            imageUrl: url,
          }),
        });
        
        console.log("URL saved in the database");
      } catch (error) {
        console.log("Error saving URL in the database", error);
      }
    }
    
  };

  return (
    <div id="container">
      <div className="profile-image">
       <img
          src={userImageUrl || image}
          alt=""
          style={{ maxWidth: "600px", maxHeight: "400px" }}
        />
      </div>
      <div id="image-upload-button">
          <button onClick={openWidget}>Upload Image</button>
      </div>
    </div>
  );
};

export default UploadWidget;
