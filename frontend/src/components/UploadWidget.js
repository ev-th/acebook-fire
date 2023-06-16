import React, { useState, useEffect, useRef } from "react";
import jwtDecode from 'jwt-decode';

const UploadWidget = ({ username }) => {

  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const userId = jwtDecode(token).user_id;
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const defaultImage = "https://res.cloudinary.com/dzdwjdv7d/image/upload/v1686822446/ekcmrhibrlahw54ebw2g.png"
  const [userImageUrl, setUserImageUrl] = useState("");

  useEffect(() => {
    // console.log({username})
    if (token) {
     fetch(`/user?username=${username}`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
            .then((response) => response.json())
            .then((data) => {
              window.localStorage.setItem("token", data.token);
              setToken(window.localStorage.getItem("token"));
              setUserImageUrl(data.user.imageUrl);
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
          setUserImageUrl(result.info.secure_url);
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
          "Authorization": `Bearer ${token}`,
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



  // console.log(imageUrl);

  

  // return (
  //   <div>
  //     <button onClick={openWidget}>Upload Image</button>
  //     {userImageUrl !== "" && userImageUrl !== null  ? <img src={userImageUrl} alt="" /> : <img src={defaultImage} alt="" />}
  //   </div>
  // );

  return (
    <div>
      <button onClick={openWidget}>Upload Image</button>
      {userImageUrl !== "" && userImageUrl !== null ? (
        <img src={userImageUrl} alt="" />
      ) : (
        <img src={defaultImage} alt="" />
      )}
    </div>
  );
};

export default UploadWidget;

