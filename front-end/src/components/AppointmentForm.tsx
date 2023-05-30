import React, { useState, FC } from 'react';
import { createAppointment } from '../services/api';

interface Doctor {
    id: number;
    name: string;
    specialty: string;
}

interface Appointment {
    doctor: Doctor;
    name: string;
    date: string;
}

interface AppointmentFormProps {
    doctor: Doctor;
    onSubmit: (data: Appointment) => void;
    fetchAppointments: () => void;
}

const AppointmentForm: FC<AppointmentFormProps> = ({
    doctor,
    fetchAppointments,
    onSubmit,
}) => {
    const [name, setName] = useState<string>('');
    const [date, setDate] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await createAppointment({
                doctor,
                name,
                date,
            });
            onSubmit({ doctor, name, date });
            setName('');
            setDate('');
            fetchAppointments();
            alert('Booked Successfully');
        } catch (error) {
            console.error('Error creating appointment:', error);
            alert('Failed to book appointment');
        }
    };

    return (
        <div>
            <h2 className="text-2xl">Book Appointment with {doctor.name}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label>
                    Your Name:<br />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                </label>
                <label>
                    Preferred Date:<br />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                </label>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-5"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AppointmentForm;
