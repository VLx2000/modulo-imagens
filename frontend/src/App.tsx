import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image } from 'types/images';
import { BASE_URL } from 'utils/requests';
import './App.css';

function App() {

  const [selectedFile, setSelectedFile] = useState<Blob | string>('undefined');
  const [carregado, setCarregado] = useState<Boolean>(false);
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    axios
      .get(BASE_URL + '/api/v1/images/')
      .then((res) => {
        const data = res.data as Image[];
        setImages(data);
        console.table(data)
        setCarregado(true);
      })
      .catch((err) => alert("Images Load Error" + err));
  }, []);

  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (!fileList) return;

    setSelectedFile(fileList[0]);
  };

  const uploadFile = function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    const formData = new FormData();
    formData.append("image", selectedFile);

    axios
      .post(BASE_URL + '/api/v1/images/', formData)
      .then((res) => {
        alert("File Upload success");
      })
      .catch((err) => alert("File Upload Error " + err));
  };

  function deleteFile(id: Number) {
    axios
      .delete(BASE_URL + '/api/v1/images/' + id)
      .then((res) => {
        alert("File Delete success");
        document.location.reload();
      })
      .catch((err) => alert("File Delete Error " + err));
  }

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
      </form>
      <div>
        { carregado && images.map(image => (
          <div key={image.id}>
            <img src={BASE_URL + image.caminho} alt="" />
            <p>Caminho: {image.caminho}</p>
            <p>Id: {image.id}</p>
            <p>Auisição: {image.aquisicao}</p>
            <p>Tipo: {image.tipo}</p>
            <button onClick={() => deleteFile(image.id)}>X</button>
          </div>
        ))}
        { images.length === 0 && <div>Sem imagens!</div>}
      </div>
    </div>
  );
}

export default App;
