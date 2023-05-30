import { useEffect, useState } from 'react';
import AppointmentList from '../components/AppointmentList';
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
        <div>
            <h1 className='text-5xl'>Appointments</h1>
            <AppointmentList appointments={appointments} />
        </div>
    );
}

export default AppointmentsPage;
