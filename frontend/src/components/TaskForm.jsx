import { useState, useEffect } from "react";
import { useNavigate, useParams} from "react-router-dom";

function TaskForm() {
    const { id } = useParams();
    const [titulo, setTitulo] = useState("");
    const [desc, setDesc] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        console.log("ID recibido:", id);
        if (id) {
            fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`)
                .then(response => response.json())
                .then(data => {
                    setTitulo(data.titulo);
                    setDesc(data.desc);
                })
                .catch(error => console.error('Error al obtener la tarea:', error));
        }
    }, [id]);

    const handleSubmit = async e => {
        e.preventDefault();

        if (!titulo || !desc) {
            setError("Es necesario ingresar el título y la descripción");
            return;
        }

        try {
            const url = id ? `${import.meta.env.VITE_API_URL}/api/tasks/${id}` : `${import.meta.env.VITE_API_URL}/api/tasks`;
            const method = id ? "PUT" : "POST";
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ titulo, desc })
            });

            if (!response.ok) {
                throw new Error(id ? "Error al actualizar la tarea" : "Error al crear la tarea");
            }

            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
            <h1 className="text-2xl font-bold mb-4">{id ? "Editar Tarea" : "Nueva Tarea"}</h1>
            <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-4">
                    <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título</label>
                    <input 
                        autoFocus 
                        type="text" 
                        id="titulo" 
                        value={titulo} 
                        onChange={e => setTitulo(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }} 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="desc" className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea 
                        id="desc" 
                        value={desc} 
                        onChange={e => setDesc(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                        required
                    ></textarea>
                </div>
                <button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    {id ? "Actualizar" : "Crear"}
                </button>
            </form>
        </div>
    );
 
}

export default TaskForm;