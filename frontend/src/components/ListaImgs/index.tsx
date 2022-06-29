import { Button } from "react-bootstrap";
import { Image } from "types/images";
import axiosInstance from "utils/axios";
import './styles.css';

type Props = {
    images: Image[];
    arquivado: boolean;
}

// component q exibe a lista de imagens de determinado paciente
function ListaImgs({ images, arquivado }: Props) {

    // para arquivar/desarquivar img
    function changeFileVisibility(id: Number) {
        axiosInstance
            .put('/archive/' + id)
            .then((res) => {
                //alert("File Hide success");
                document.location.reload();
            })
            .catch((err) => alert("Erro ao modificar imagem" + err));
    }
    
    // apaga imagem
    function deleteFile(id: Number) {
        axiosInstance
            .delete('/' + id)
            .then((res) => {
                //alert("File Hide success");
                document.location.reload();
            })
            .catch((err) => alert("Erro ao deletar imagem" + err));
    }

    // atualiza aquisicao da imagem
    function atualizarAquisicao(aquisicao: string, id: Number)  {
        //console.log(aquisicao)
        axiosInstance
            .put('/update/' + id, { aquisicao: aquisicao })
            .then((res) => {
                document.location.reload();
            })
            .catch((err) => alert("Erro ao atualizar aquisicao" + err));
    }

    return (
        <div>
            {images.map(image => (
                <div className='dados' key={image.id}>
                    <div>
                        <p>Caminho: {image.caminho}</p>
                        <p>Id: {image.id}/Paciente: {image.idPaciente}</p>
                        <input type="date" value={image.aquisicao} className="aquisicao"
                                onChange={(e) => atualizarAquisicao(e.target.value, image.id)} />
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