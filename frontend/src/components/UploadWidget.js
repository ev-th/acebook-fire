import React, { useState, useEffect, useRef } from "react";
import jwtDecode from 'jwt-decode';

const UploadWidget = () => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const userId = jwtDecode(token).user_id;
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const imageUrl =
    "https://res.cloudinary.com/dzdwjdv7d/image/upload/v1686822446/ekcmrhibrlahw54ebw2g.png";

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dzdwjdv7d",
        uploadPreset: "cdnf3xhm",
      },
      async function (error, result) {
        if (!error && result && result.event === "success") {
          try {
            await fetch(`/user`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(
                {
                  userId: userId,
                  imageUrl: imageUrl,
                }
              ),
            });
            console.log("url saved in the database");
          } catch (error) {
            console.log("error saving url in the database");
          }
        }
      }
    );
  }, []);
 
  return <button onClick={() => widgetRef.current.open()}>Upload</button>;
};

export default UploadWidget;
