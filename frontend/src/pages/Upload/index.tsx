import { useEffect, useState } from "react";
import { Accordion, Container } from "react-bootstrap";
import { Image } from 'types/images';
import { UploadForm, ListaImgs } from "components";
import { useParams } from 'react-router-dom';
import axiosInstance from "utils/axios";

function Upload() {

    const params = useParams();

    const [carregado, setCarregado] = useState<Boolean>(false);
    const [images, setImages] = useState<Image[]>([]);

    useEffect(() => {
        axiosInstance
            .get(`/api/v1/images/${params.idPaciente}`)
            .then((res) => {
                const data = res.data as Image[];
                setImages(data);
                //console.table(data)
                setCarregado(true);
            })
            .catch((err) => alert("Erro ao carregar imagens" + err));
    }, [params.idPaciente]);

    return (
        <Container>

            {/* Formulario de upload de imagens */}
            <UploadForm idPaciente={`${params.idPaciente}`} />
            {carregado &&
                <div>
                    {/* Listagem de imagens n arquivadas */}
                    <ListaImgs images={images.filter(img => !img.arquivado)} arquivado={false} />

                    {/* Listagem de imagens arquivadas */}
                    <Accordion>
                        <Accordion.Header>Arquivados</Accordion.Header>
                        <Accordion.Body bsPrefix='accordion'>
                            <ListaImgs images={images.filter(img => img.arquivado)} arquivado={true} />
                        </Accordion.Body>
                    </Accordion >
                </div >
            }
        </Container>
    );
}

export default Upload;