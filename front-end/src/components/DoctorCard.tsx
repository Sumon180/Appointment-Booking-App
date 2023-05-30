import React from 'react';

interface Doctor {
    id: number;
    name: string;
    specialty: string;
}

interface DoctorCardProps {
    doctor: Doctor;
    onBookAppointment: (doctor: Doctor) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBookAppointment }) => {
    return (
        <div className="doctor-card bg-blue-500 p-4">
            <h2 className="text-2xl text-white font-bold">{doctor.name}</h2>
            <p className="text-white mb-5">{doctor.specialty}</p>
            <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => onBookAppointment(doctor)}
            >
                Book Appointment
            </button>
        </div>
    );
};


export default DoctorCard;
