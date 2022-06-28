import { Button } from "react-bootstrap";
import { Image } from "types/images";
import axiosInstance from "utils/axios";
import './styles.css';

type Props = {
    images: Image[];
    arquivado: boolean;
}

function ListaImgs({ images, arquivado }: Props) {

    function changeFileVisibility(id: Number) {
        axiosInstance
            .put('/api/v1/images/archive/' + id)
            .then((res) => {
                //alert("File Hide success");
                document.location.reload();
            })
            .catch((err) => alert("Erro ao modificar imagem" + err));
    }
    
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
        <div>
            {images.map(image => (
                <div className='dados' key={image.id}>
                    <div>
                        <p>Caminho: {image.caminho}</p>
                        <p>Id: {image.id}/Paciente: {image.idPaciente}</p>
                        <p>Aquisição: {image.aquisicao}</p>
                        <p>Tipo: {image.tipo}</p>
                    </div>
                    <div className="divBotao">
                        <Button variant="secondary"
                            onClick={() => changeFileVisibility(image.id)}>
                            {image.arquivado ? 'Desarquivar' : 'Arquivar'}
                        </Button>
                        <Button variant="outline-danger"
                            onClick={() => deleteFile(image.id)}>
                            Remover
                        </Button>
                    </div>
                </div>
            ))}
            <div className='divMsg'><p>{images.length} imagem(ns) {arquivado && 'arquivadas'}</p></div>
        </div>
    );
}

export default ListaImgs;