import { useRef, useState } from "react";
import { Alert, Button, Form, ProgressBar } from "react-bootstrap";
import axiosInstance from "utils/axios";
import './styles.css';

type Props = {
    idPaciente: string
}

// component q exibe form para upload
function UploadForm({ idPaciente }: Props) {

    // controller para cancelar requisição quando cliente desejar
    let abortControllerRef = useRef<AbortController>();

    const [image, setImage] = useState<Blob | string>('');
    const [aquisicao, setAquisicao] = useState<string>('');
    const [progress, setProgress] = useState<number>();
    const [message, setMessage] = useState<string>('');

    const submitHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setMessage('');
        let formData = new FormData();
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;   //sinal se deve continuar requisição
        formData.append("aquisicao", aquisicao as string);
        formData.append("idPaciente", idPaciente /* Math.floor(Math.random()* (10 - 1) + 1) as unknown as Blob*/);
        formData.append("idUser", 1 as unknown as Blob);
        formData.append("image", image);

        axiosInstance
            .post('/', formData, {
                signal,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (data) => {   //cria barra de progresso
                    setProgress(Math.round(100 * (data.loaded / data.total)));
                },
            })
            .then((res) => {
                //alert("File Upload success");
                setMessage('Enviado com sucesso');
            })
            .catch((error) => {
                const code = error?.response?.data?.code;
                switch (code) {
                    case "ERRO_ARQUIVO":
                        setMessage("ADICIONE UM ARQUIVO .nii OU .nii.gz!!");
                        break;
                    default:
                        setMessage("Ops. Algo deu errado");
                        break;
                }
                //console.log(signal)
                if (signal.aborted)
                    setMessage("Upload interrompido");
            });
    };

    return (
        <Form onSubmit={submitHandler} className="upload-form">
            <Form.Group controlId="formFile" className="mb-3">
                <h4>Upload de imagens</h4><hr/>
                <Form.Group className="form-inputs">
                    <Form.Control
                        type="file"
                        // types necessarios para obter somente uma imagem passada no forms
                        onChange={(e) => setImage(((e.target as HTMLInputElement).files as FileList)[0] as Blob)}
                    />
                    <Form.Control
                        type="date"
                        onChange={(e) => setAquisicao(e.target.value as string)}
                    />
                </Form.Group>
            </Form.Group>
            <Form.Group className="mb-3">
                <Button variant="primary"
                    type="submit"
                    className="upload-button"
                    disabled={!!progress && message === ''}>
                    {!!progress && message === '' ? 'Enviando...' : 'Upload'}
                </Button>
            </Form.Group>
            {message && //caso em q terminou o upload ou houve algum erro
                <Alert variant={message === 'Enviado com sucesso' ? 'success' : 'danger'}>
                    <span>{message + ' '}</span>
                    <span className="recarregar" onClick={() => document.location.reload()}>Recarregar página</span>
                </Alert>
            }
            {!message && progress &&    //caso em q upload esta sendo feito
                <div className="progress-data">
                    <ProgressBar animated now={progress} label={`${progress}%`} />
                    <Button variant="warning" onClick={() => abortControllerRef.current?.abort()}>Cancelar</Button>
                </div>
            }
        </Form>
    );
}

export default UploadForm;