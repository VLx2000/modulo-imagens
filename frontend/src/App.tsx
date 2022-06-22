import { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  ProgressBar,
  Alert,
} from "react-bootstrap";
import axiosInstance from "./utils/axios";
import { Image } from 'types/images';
import './App.css';

function App() {
  const [image, setImage] = useState<Blob|string>('');
  const [aquisicao, setAquisicao] = useState<string>('');
  const [progress, setProgress] = useState<number>();
  const [error, setError] = useState<string>('');
  const [carregado, setCarregado] = useState<Boolean>(false);
  const [images, setImages] = useState<Image[]>([]);

  const submitHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("aquisicao", aquisicao as string);
    formData.append("idPaciente", 111 as unknown as Blob);
    formData.append("idUser", 1 as unknown as Blob);
    formData.append("image", image);

    axiosInstance
      .post("/api/v1/images/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (data) => {
          setProgress(Math.round(100 * (data.loaded / data.total)));
        },
      })
      .then((res) => {
        //alert("File Upload success");
        document.location.reload();
      })
      .catch((error) => {
        const code = error?.response?.data?.code;
        switch (code) {
          case "ERRO_ARQUIVO":
            setError("ADICIONE UM ARQUIVO .nii OU .nii.gz!!");
            break;
          default:
            setError("Ops. Algo deu errado");
            break;
        }
      });
  };

  useEffect(() => {
    axiosInstance
      .get('/api/v1/images/')
      .then((res) => {
        const data = res.data as Image[];
        setImages(data);
        //console.table(data)
        setCarregado(true);
      })
      .catch((err) => alert("Erro ao carregar imagens" + err));
  }, []);

  function deleteFile(id: Number) {
    axiosInstance
      .delete('/api/v1/images/' + id)
      .then((res) => {
        //alert("File Hide success");
        document.location.reload();
      })
      .catch((err) => alert("Erro ao deletar imagem" + err));
  }

  return (
    <div className="App">
      <Container>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload de imagens</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(((e.target as HTMLInputElement).files as FileList)[0] as Blob)}
            />
            <Form.Control
              type="date"
              onChange={(e) => setAquisicao(e.target.value as string)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Button variant="primary" type="submit" disabled={!!progress && error === ''}>
              {!!progress && error === '' ? 'Enviando...' : 'Upload'}
            </Button>
          </Form.Group>
          {error && <Alert variant="danger">{error}</Alert>}
          {!error && progress && (
            <ProgressBar animated now={progress} label={`${progress}%`} />
          )}
        </Form>

        <div>
          {carregado && images.map(image => (
            <div key={image.id} className='dados'>
              <div>
                <p>Caminho: {image.caminho}</p>
                <p>Id: {image.id}</p>
                <p>Aquisição: {image.aquisicao}</p>
                <p>Tipo: {image.tipo}</p>
              </div>
              <div className='divBotao'>
                <Button variant="secondary" onClick={() => deleteFile(image.id)}>Ocultar</Button>
              </div>
            </div>
          ))}
          {images.length === 0 && <div className='divMsg'><p>Sem imagens!</p></div>}
        </div>
      </Container>
    </div>
  );
}

export default App;
