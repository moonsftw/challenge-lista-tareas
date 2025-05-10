import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskItem from "./TaskItem";

function TaskList() {
    const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
    const [tareas, setTareas] = useState([]); // Tareas activas
    const [tareaCompletada, setTareaCompletada] = useState([]); // Tareas completadas
    const [mostrarTareasCompletadas, setMostrarTareasCompletadas] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/tasks`)
            .then(response => response.json())
            .then(data => {
                // Separar tareas activas y completadas
                const activas = data.filter(tarea => !tarea.completed);
                const completadas = data.filter(tarea => tarea.completed);

                setTareas(activas);
                setTareaCompletada(completadas);
            })
            .catch(error => console.error('Error al obtener las tareas:', error));
    }, []);

    const eliminarTarea = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
                    method: "DELETE"
                });
                if (!response.ok) {
                    throw new Error("Error al eliminar la tarea");
                }

                // Eliminar de la lista correspondiente
                setTareas(tareas.filter(tarea => tarea.id !== id));
                setTareaCompletada(tareaCompletada.filter(tarea => tarea.id !== id));
            } catch (error) {
                console.error(error);
            }
        }
    };

    const completarTarea = async (id) => {
        try {
            const tarea = tareas.find(t => t.id === id);
            if (!tarea) return;

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ completed: true }) // Actualizar el estado a 'completed: true'
            });

            if (!response.ok) {
                throw new Error("Error al completar la tarea");
            }

            // Mover la tarea de 'tareas' a 'tareaCompletada'
            setTareas(tareas.filter(t => t.id !== id));
            setTareaCompletada([...tareaCompletada, { ...tarea, completed: true }]);
        } catch (error) {
            console.error(error);
        }
    };

    const listaAMostrar = mostrarTareasCompletadas ? tareaCompletada : tareas;

    return (
        <>
            <h1 className="text-center text-xl">{mostrarTareasCompletadas ? "Lista de tareas completadas" : "Lista de tareas pendientes"}</h1>
            <div className="mx-auto p-8">
                <div className="flex justify-between items-center mb-4">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        onClick={() => navigate('/new')}
                    >
                        Nueva Tarea
                    </button>
                    <button
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                        onClick={() => setMostrarTareasCompletadas(!mostrarTareasCompletadas)}
                    >
                        {mostrarTareasCompletadas ? "Ver Activas" : "Ver Completadas"}
                    </button>
                </div>

                {listaAMostrar.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No hay tareas {mostrarTareasCompletadas ? 'completadas' : 'activas'}.
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="p-4">ID</th>
                                    <th className="p-4">Título</th>
                                    <th className="p-4">Descripción</th>
                                    <th className="p-4">Creada</th>
                                    <th className="p-4">Completada</th>
                                    <th className="p-4">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaAMostrar.map(tarea => (
                                    <tr
                                        key={tarea.id}
                                        className="border-t hover:bg-gray-100 cursor-pointer"
                                        onClick={() => setTareaSeleccionada(tarea)}
                                    >
                                        <td className="p-4">{tarea.id}</td>
                                        <td className="p-4">{tarea.titulo}</td>
                                        <td className="p-4">{tarea.desc}</td>
                                        <td className="p-4">{tarea.creada}</td>
                                        <td className="p-4">{tarea.completed ? 'Sí' : 'No'}</td>
                                        <td className="p-4 space-x-2">
                                            {!mostrarTareasCompletadas ? (
                                                <>
                                                    <button
                                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            completarTarea(tarea.id);
                                                        }}
                                                    >
                                                        Completar
                                                    </button>
                                                    <button
                                                        className="bg-emerald-400 hover:bg-emerald-500 text-white hover:text-black px-3 py-1 rounded tracking-widest"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigate(`/edit/${tarea.id}`);
                                                        }}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="bg-red-700 hover:bg-red-500 text-white hover:text-black px-3 py-1 rounded tracking-widest"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            eliminarTarea(tarea.id);
                                                        }}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    className="bg-red-700 hover:bg-red-500 text-white hover:text-black px-3 py-1 rounded tracking-widest"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        eliminarTarea(tarea.id);
                                                    }}
                                                >
                                                    Eliminar
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {tareaSeleccionada && (
                    <TaskItem tarea={tareaSeleccionada} onClose={() => setTareaSeleccionada(null)} />
                )}
            </div>
        </>
    );
}

export default TaskList;