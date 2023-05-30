import { useState, FC } from 'react';
import { createAppointment } from '../services/api';

interface AppointmentFormProps {
    fetchAppointments: () => void;
}

const AppointmentForm: FC<AppointmentFormProps> = ({ fetchAppointments }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await createAppointment({ title });
            setTitle('');
            fetchAppointments();
        } catch (error) {
            console.error('Error creating appointment:', error);
        }
    };

    return (
        <div>
            <h2 className='text-2xl'>Add Appointment</h2>
            <form onSubmit={handleSubmit} className=' '>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='border border-gray-500 w-96 h-10 rounded-md pl-5 my-5'
                />
            </form>
        </div>
    );
};

export default AppointmentForm;
