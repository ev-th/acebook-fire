import React, { useState, useEffect, useRef } from "react";
import jwtDecode from 'jwt-decode';

const UploadWidget = ({ username }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const userId = jwtDecode(token).user_id;
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [imageUrl, setImageURL] = useState("https://res.cloudinary.com/dzdwjdv7d/image/upload/v1686822446/ekcmrhibrlahw54ebw2g.png");
  const [imageSaved, setImageSaved] = useState(false);
  const [savedImageUrl, setSavedImageUrl] = useState("");

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dzdwjdv7d",
        uploadPreset: "cdnf3xhm",
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          console.log(result.info.secure_url);
          setImageURL(result.info.secure_url);
        }
      }
    );
  }, []);

  useEffect(() => {
    if (imageUrl !== "https://res.cloudinary.com/dzdwjdv7d/image/upload/v1686822446/ekcmrhibrlahw54ebw2g.png") {
      saveImageUrl();
    }
  }, [imageUrl]);

  const openWidget = () => {
    widgetRef.current.open();
  };

  const saveImageUrl = async () => {
    try {
      const response = await fetch(`/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userId,
          imageUrl: imageUrl,
        }),
      });
      if (response.ok) {
        console.log("URL saved in the database");
        setImageSaved(true);
      } else {
        console.log("Error saving URL in the database");
      }
    } catch (error) {
      console.log("Error saving URL in the database", error);
    }
  };

  const displaySavedImage = async () => {
    try {
      const response = await fetch(`/user?username=${username}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setSavedImageUrl(data.imageUrl);
      console.log(data.imageUrl);
    } catch (error) {
      console.log("Error fetching saved image URL", error);
    }
  };

  console.log(imageUrl);

  useEffect(() => {
    displaySavedImage();
  }, []);

  return (
    <div>
      <button onClick={openWidget}>Upload Image</button>
      {imageSaved ? <img src={savedImageUrl} alt="" /> : <img src={imageUrl} alt="" />}
    </div>
  );
};

export default UploadWidget;

