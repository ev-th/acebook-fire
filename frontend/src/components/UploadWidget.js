import { useEffect, useRef, useState } from 'react';

const UploadWidget = () => {
 const cloudinaryRef = useRef();
 const widgetRef = useRef();
 const [imageURL, setImageURL] = useState("");

 useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
        cloudName: 'dzdwjdv7d',
        uploadPreset: 'cdnf3xhm'
    }, function(error, result) {
        if (result && result.event === 'success') {
            setImageURL(result.info.secure_url);
        }
    })
 }, [])

 const openWidget = () => {
    widgetRef.current.open();
  };

  console.log(imageURL)

return (
    <div>
    <button onClick={openWidget}>Upload Image</button>
          {imageURL && <img src={imageURL} alt="" />}
    </div>
)
}

export default UploadWidget;
