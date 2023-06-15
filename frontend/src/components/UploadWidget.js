import { useEffect, useRef } from "react";

const UploadWidget = () => {
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
            await fetch("/user/${userName}", {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ imageUrl }),
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
