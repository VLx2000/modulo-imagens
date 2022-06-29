import { useRef, useState } from "react";
import { Alert, Button, Form, ProgressBar } from "react-bootstrap";
import axiosInstance from "utils/axios";
import './styles.css';

type Props = {
    idPaciente: string
}

function UploadForm({ idPaciente }: Props) {

    const abortControllerRef = useRef<AbortController>(
        new AbortController()
    );

    const [image, setImage] = useState<Blob | string>('');
    const [aquisicao, setAquisicao] = useState<string>('');
    const [progress, setProgress] = useState<number>();
    const [message, setMessage] = useState<string>('');

    const submitHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setMessage('');
        let formData = new FormData();
        const signal = abortControllerRef.current.signal;
        formData.append("aquisicao", aquisicao as string);
        formData.append("idPaciente", idPaciente /* Math.floor(Math.random()* (10 - 1) + 1) as unknown as Blob*/);
        formData.append("idUser", 1 as unknown as Blob);
        formData.append("image", image);

        axiosInstance
            .post("/api/v1/images/", formData, {
                signal,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (data) => {
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
                <Button variant="primary"
                    type="submit"
                    className="upload-button"
                    disabled={!!progress && message === ''}>
                    {!!progress && message === '' ? 'Enviando...' : 'Upload'}
                </Button>
            </Form.Group>
            {message &&
                <Alert variant={message === 'Enviado com sucesso' ? 'success' : 'danger'}>
                    <span>{message + ' '}</span>
                    <span className="recarregar" onClick={() => document.location.reload()}>Recarregar página</span>
                </Alert>
            }
            {!message && progress &&
                <div className="progress-data">
                    <ProgressBar animated now={progress} label={`${progress}%`} />
                    <Button variant="warning" onClick={() => abortControllerRef.current.abort()}>Cancelar</Button>
                </div>
            }
        </Form>
    );
}

export default UploadForm;