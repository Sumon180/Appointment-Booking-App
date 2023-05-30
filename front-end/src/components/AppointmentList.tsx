import React from 'react';

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

interface Props {
    appointments: Appointment[];
}

const AppointmentList: React.FC<Props> = ({ appointments }) => {
    return (
        <div>
            <h2 className="text-2xl">Appointment List</h2>
            {appointments.length > 0 ? (
                <ul>
                    {appointments.map((appointment) => (
                        <li key={appointment.date}>
                            {appointment.doctor.name} - {appointment.name} on {appointment.date}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No appointments available.</p>
            )}
        </div>
    );
};

export default AppointmentList;
