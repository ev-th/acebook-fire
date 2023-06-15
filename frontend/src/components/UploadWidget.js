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
        setImageURL(result.info.secure_url);
        console.log(result.info)
    })
 }, [])

 const openWidget = () => {
    widgetRef.current.open();
  };

return (
    <div>
    <button onClick={openWidget}>Upload Image</button>
          {imageURL && <img src={imageURL} alt="" />}
    </div>
)
}

export default UploadWidget;
