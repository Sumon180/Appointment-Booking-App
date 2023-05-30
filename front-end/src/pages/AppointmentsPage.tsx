import { useEffect, useState } from 'react';
import AppointmentList from '../components/AppointmentList';
import AppointmentForm from '../components/AppointmentForm';
import { getAppointments } from '../services/api';

const AppointmentsPage = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const appointmentsData = await getAppointments();
            setAppointments(appointmentsData);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center gap-16 w-screen h-screen'>
            <h1 className='text-5xl'>Appointments</h1>
            <AppointmentList appointments={appointments} />
            <AppointmentForm fetchAppointments={fetchAppointments} />
        </div>
    );
}

export default AppointmentsPage;
