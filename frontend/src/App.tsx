import { useEffect, useState } from "react";
import { Accordion, Container } from "react-bootstrap";
import { Image } from 'types/images';
import { UploadForm, ListaImgs } from "components";
import axiosInstance from "./utils/axios";
import './App.css';

function App() {

  const [carregado, setCarregado] = useState<Boolean>(false);
  const [images, setImages] = useState<Image[]>([]);

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

  return (
    <div className="App">
      <Container>

        {/* Formulario de upload de imagens */}
        <UploadForm />
        {carregado &&
          <div>
            {/* Listagem de imagens n arquivadas */}
            <ListaImgs images={images.filter(img => !img.arquivado)} abaArquivo={false} />

            {/* Listagem de imagens arquivadas */}
            <Accordion>
              <Accordion.Header>Arquivados</Accordion.Header>
              <Accordion.Body bsPrefix='accordion'>
                <ListaImgs images={images.filter(img => img.arquivado)} abaArquivo={true} />
              </Accordion.Body>
            </Accordion >
          </div >
        }
      </Container >
    </div >
  );
}

export default App;
