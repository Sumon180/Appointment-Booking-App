import { useState, FC, useEffect } from 'react';
import { motion } from "framer-motion"
import { createAppointment, deleteAppointment, editAppointments, getAppointments, updateAppointment } from '../services/api';
import DoctorCard from '../components/DoctorCard';
import AppointmentForm from '../components/AppointmentForm';
import AppointmentList from '../components/AppointmentList';
import { Appointment, Doctor } from '../types';

const SelectDoctor: FC = () => {
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

    const handleBookAppointment = (doctor: Doctor) => {
        setSelectedDoctor(doctor);
    };

    const handleAppointmentSubmit = async (appointment: Appointment) => {
        try {
            await createAppointment(appointment);
            setAppointments([...appointments, appointment]);
            setSelectedDoctor(null);
            fetchAppointments();
            alert('Booked Successfully');
        } catch (error) {
            console.error('Error creating appointment:', error);
            alert('Failed to book appointment');
        }
    };

    const fetchAppointments = async () => {
        try {
            const appointmentsData = await getAppointments();
            setAppointments(appointmentsData);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const doctors: Doctor[] = [
        { id: 1, name: 'Dr. John Doe', specialty: 'Cardiology' },
        { id: 2, name: 'Dr. Jane Smith', specialty: 'Dermatology' },
        { id: 3, name: 'Dr. Alex Johnson', specialty: 'Pediatrics' },
        { id: 4, name: 'Dr. Salman dd', specialty: 'Medicin' },
    ];




    const handleEditAppointmentSubmit = async (appointment: Appointment) => {
        try {
            await updateAppointment(appointment);
            fetchAppointments();
            alert('Appointment updated successfully FFF');
        } catch (error) {
            console.error('Error updating appointment:', error);
            alert('Failed to update appointment FFF');
        }
        console.log(appointment);

    };

    const handleEditAppointment = async (appointment: Appointment) => {
        try {
            const editedAppointment = await fetchAppointment(appointment.id);
            console.log(editedAppointment);
            setEditingAppointment(editedAppointment);
            // You can navigate to the edit route here if needed
        } catch (error) {
            console.error('Error editing appointment:', error);
            alert('Failed to edit appointment');
        }
    };

    // useEffect(() => {
    //     const urlParams = new URLSearchParams(window.location.search);
    //     const appointmentId = urlParams.get('id');
    //     if (appointmentId) {
    //         fetchAppointment(appointmentId)
    //             .then((appointment) => setEditingAppointment(appointment))
    //             .catch((error) => console.error('Error fetching appointment:', error));
    //     }
    //     console.log(appointmentId);
    // }, []);

    const fetchAppointment = async (id: string) => {
        try {
            const response = await editAppointments(id);
            return response;
        } catch (error) {
            console.error('Error fetching appointment:', error);
            throw new Error('Failed to fetch appointment');
        }
    };

    const handleDeleteAppointment = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this appointment?')) {
            try {
                await deleteAppointment(id);
                const updatedAppointments = appointments.filter((appt) => appt.id !== id);
                setAppointments(updatedAppointments);
                alert('Appointment deleted successfully');
            } catch (error) {
                console.error('Error deleting appointment:', error);
                alert('Failed to delete appointment');
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="container mx-auto flex flex-col items-center justify-center h-screen gap-16 w-screen">
            <h1 className="text-5xl font-bold text-slate-800">Doctor Booking Appointment</h1>
            {selectedDoctor ? (
                <AppointmentForm
                    doctor={selectedDoctor}
                    onSubmit={editingAppointment ? handleEditAppointmentSubmit : handleAppointmentSubmit}
                    fetchAppointments={fetchAppointments}
                    editingAppointment={editingAppointment}
                />
            ) : (
                <div className="doctor-list p-10 bg-white border drop-shadow-lg">
                    <h2 className="text-2xl font-semi-bold mb-3 text-slate-700">{editingAppointment ? (<span className="text-animate" >Now, Select a doctor at first</span>) : "Choose a doctor:"}</h2>
                    <div className='flex flex-wrap items-center gap-3'>
                        {doctors.map((doctor) => (
                            <DoctorCard
                                key={doctor.id}
                                doctor={doctor}
                                onBookAppointment={handleBookAppointment}
                            />
                        ))}
                    </div>
                </div>
            )}
            <AppointmentList
                appointments={appointments}
                onEditAppointment={handleEditAppointment}
                onDeleteAppointment={handleDeleteAppointment}
            />
        </motion.div>
    );
};

export default SelectDoctor;
