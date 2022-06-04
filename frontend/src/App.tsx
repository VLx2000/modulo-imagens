import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [image, setImage] = useState<string>('');

  const [selectedFile, setSelectedFile] = useState<Blob | string>('undefined');

  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (!fileList) return;

    setSelectedFile(fileList[0]);
  };

  const uploadFile = function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    const formData = new FormData();
    formData.append("image", selectedFile);

    axios
      .post('http://localhost:4000/api/v1/images', formData)
      .then((res) => {
        alert("File Upload success");
        setImage(`http://localhost:4000${res.data.payload.url}`);
        console.log(image)
      })
      .catch((err) => alert("File Upload Error"));
  };

  return (
    <div className="App">
      <form>
        <input
          accept='.nii.gz'
          type="file"
          multiple={false}
          onChange={handleImageChange}
        />
        <button onClick={uploadFile}>Upload</button>
        <img id="avatar" src={image} alt='' />
      </form>
    </div>
  );
}

export default App;
