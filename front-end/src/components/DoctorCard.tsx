import React from 'react';

interface Doctor {
    name: string;
    specialty: string;
}

interface DoctorCardProps {
    doctor: Doctor;
    onBookAppointment: (doctor: Doctor) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBookAppointment }) => {
    return (
        <div className="doctor-card">
            <h2>{doctor.name}</h2>
            <p>{doctor.specialty}</p>
            <button onClick={() => onBookAppointment(doctor)}>Book Appointment</button>
        </div>
    );
};

export default DoctorCard;
