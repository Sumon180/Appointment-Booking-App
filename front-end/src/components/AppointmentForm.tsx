import React, { useState, FC, useEffect } from 'react';
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';
import { Appointment, AppointmentFormProps } from '../types';
import { updateAppointment } from '../services/api';

const AppointmentForm: FC<AppointmentFormProps> = ({
    doctor,
    onSubmit,
    fetchAppointments,
    editingAppointment,
}) => {
    const [name, setName] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        if (editingAppointment) {
            setName(editingAppointment.name);
            setDate(editingAppointment.date);
            setTime(editingAppointment.time); // Add time dependency
        }
    }, [editingAppointment]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (editingAppointment) {
                await updateAppointment({
                    ...editingAppointment,
                    doctor,
                    name,
                    date,
                    time
                });
                alert('Appointment updated successfully');
            }
            const appointment: Appointment = {
                id: '',
                doctor,
                name,
                date,
                time
            };
            onSubmit(appointment);
            setName('');
            setDate('');
            setTime('');
            fetchAppointments();
        } catch (error) {
            console.error('Error creating appointment:', error);
            alert('Failed to book appointment');
        }
    };

    const BackToHome = () => navigate('/');


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className='p-10 bg-white border drop-shadow-lg'
        >
            <h2 className="text-2xl mb-5">
                {editingAppointment ? 'Edit Appointment' : 'Book Appointment with'}{' '}
                <span className='text-blue-600 font-bold'>{doctor.name}</span></h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label className="text-lg font-medium text-slate-600">
                    Your Name:
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />

                <label className="text-lg font-medium text-slate-600">
                    Preferred Date:
                </label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />

                <label htmlFor="time" className="text-lg font-medium text-slate-600">
                    Time
                </label>
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    className="py-2 px-3 border border-gray-300 rounded-md"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-5"
                >
                    {editingAppointment ? 'Update' : 'Book Appointment'}
                </button>
                <button
                    onClick={BackToHome}
                    className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-5'
                >
                    Back to Home Page
                </button>
            </form>
        </motion.div>
    );
};

export default AppointmentForm;