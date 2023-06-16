import React, { useState, useEffect, useRef } from "react";
import jwtDecode from 'jwt-decode';

const UploadWidget = ({ username }) => {

  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const userId = jwtDecode(token).user_id;
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [imageUrl, setImageURL] = useState("https://res.cloudinary.com/dzdwjdv7d/image/upload/v1686822446/ekcmrhibrlahw54ebw2g.png");
  // const [imageSaved, setImageSaved] = useState(false);
  const [savedImageUrl, setSavedImageUrl] = useState("");


  useEffect(() => {
    // console.log({username})
    if (token) {
     fetch(`/user?username=${username}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then((response) => response.json())
            .then((data) => {
              window.localStorage.setItem("token", data.token);
              setToken(window.localStorage.getItem("token"));
              setSavedImageUrl(data.user.imageUrl);
              // console.log(data.user.imageUrl)
            })
        }

  }, []);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dzdwjdv7d",
        uploadPreset: "cdnf3xhm",
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          // console.log(result.info.secure_url);
          setSavedImageUrl(result.info.secure_url);
          saveImageUrl();
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
          imageUrl: savedImageUrl,
        }),
      });
      if (response.ok) {
        console.log("URL saved in the database");
        // setImageSaved(true);
      } else {
        console.log("Error saving URL in the database");
      }
    } catch (error) {
      console.log("Error saving URL in the database", error);
    }
  };



  // console.log(imageUrl);

  

  return (
    <div>
      <button onClick={openWidget}>Upload Image</button>
      {savedImageUrl !== imageUrl && savedImageUrl !== null  ? <img src={savedImageUrl} alt="" /> : <img src={imageUrl} alt="" />}
    </div>
  );
};

export default UploadWidget;

