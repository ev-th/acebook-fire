import React, { useState, useEffect, useRef } from "react";
import jwtDecode from "jwt-decode";
import "./UploadWidget.css";

const UploadWidget = ({ username }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const userId = jwtDecode(token).user_id;
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const defaultImage =
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?s=100&d=mp";
  const [userImageUrl, setUserImageUrl] = useState("");

  useEffect(() => {
    // console.log({username})
    if (token) {
      fetch(`/user?username=${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setUserImageUrl(data.user.imageUrl || defaultImage);
          // console.log(data.user.imageUrl)
        });
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
          const databaseImage = result.info.secure_url;
          if (databaseImage !== "" || databaseImage !== undefined) {
            setUserImageUrl(databaseImage);
          } else {
            setUserImageUrl(defaultImage);
          }
        }
      }
    );
  }, []);

  useEffect(() => {
    if (userImageUrl) {
      saveImageUrl();
    }
  }, [userImageUrl]);

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
          imageUrl: userImageUrl,
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

  return (
    <div id="container">
      <div id="image">
        <img
          src={userImageUrl}
          alt=""
          style={{ maxWidth: "600px", maxHeight: "400px" }}
        />

        <div id="button">
          <button onClick={openWidget}>Upload Image</button>
        </div>
      </div>
    </div>
  );
};

export default UploadWidget;
