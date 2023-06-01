export interface Doctor {
  id: number;
  name: string;
  specialty: string;
}

export interface Appointment {
  id: string;
  doctor: Doctor;
  name: string;
  date: string;
  time: string;
}

export interface AppointmentFormProps {
  doctor: Doctor;
  onSubmit: (data: Appointment) => void;
  fetchAppointments: () => void;
  editingAppointment: Appointment | null;
}

export interface AppointmentListProps {
  appointments: Appointment[];
  onEditAppointment: (appointment: Appointment) => void;
  onDeleteAppointment: (id: string) => void;
}

export interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctor: Doctor) => void;
}
