function TaskItem({ tarea, onClose }) {
    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full'>
                <h2 className='text-2xl font-bold mb-4'>{tarea.titulo}</h2>
                <p className='mb-2'><strong>Descripción:</strong> {tarea.desc}</p>
                <p className='mb-2'><strong>Fecha de creación:</strong> {tarea.creada}</p>
                <p className='mb-4'><strong>Completada:</strong> {tarea.completed ? 'Sí' : 'No'}</p>
                <div className='flex justify-end'>
                    <button
                        onClick={onClose}
                        className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded'
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskItem;
