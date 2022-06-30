import { useEffect, useState } from "react";
import { Accordion, Container } from "react-bootstrap";
import { Image } from 'types/images';
import { UploadForm, ListaImgs } from "components";
import { useParams } from 'react-router-dom';
import axiosInstance from "utils/axios";

// pag q sera acessada ao clicar em algum paciente
function Upload() {

    const params = useParams();

    const [carregado, setCarregado] = useState<Boolean>(false);
    const [images, setImages] = useState<Image[]>([]);

    useEffect(() => {
        axiosInstance
            .get(`/${params.idPaciente}`)
            .then((res) => {
                const data = res.data as Image[];
                setImages(data);
                //console.table(data)
                setCarregado(true);
            })
            .catch((err) => alert("Erro ao carregar imagens" + err));
    }, [params.idPaciente]);

    return (
        <Container className="upload-container">
            <h1 style={{textAlign: 'center'}}>Paciente {params.idPaciente}</h1>
            {/* Formulario de upload de imagens */}
            <UploadForm idPaciente={`${params.idPaciente}`} />
            {carregado &&
                <section>
                    <h4>Imagens salvas</h4><hr/>
                    {/* Listagem de imagens n arquivadas */}
                    <ListaImgs images={images.filter(img => !img.arquivado)} arquivado={false} />

                    {/* Listagem de imagens arquivadas */}
                    <Accordion>
                        <Accordion.Header>Arquivados</Accordion.Header>
                        <Accordion.Body bsPrefix='accordion'>
                            <ListaImgs images={images.filter(img => img.arquivado)} arquivado={true} />
                        </Accordion.Body>
                    </Accordion >
                </section >
            }
        </Container>
    );
}

export default Upload;