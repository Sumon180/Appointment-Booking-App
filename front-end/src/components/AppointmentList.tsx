import React from 'react';

interface Appointment {
    id: string;
    title: string;
}

interface Props {
    appointments: Appointment[];
}

const AppointmentList: React.FC<Props> = ({ appointments }) => {
    return (
        <div>
            <h2 className='text-2xl'>Appointment List</h2>
            {appointments.length > 0 ? (
                <ul>
                    {appointments.map((appointment) => (
                        <li key={appointment.id}>{appointment.title}</li>
                    ))}
                </ul>
            ) : (
                <p>No appointments available.</p>
            )}
        </div>
    );
}

export default AppointmentList;
