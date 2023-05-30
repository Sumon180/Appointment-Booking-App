import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    return (
        <div className='flex flex-col items-center justify-center gap-16 w-screen h-screen'>
            <h1 className='text-5xl'>Welcome to the Appointment Booking App!</h1>
            <Link to="/appointments" className='text-2xl bg-rose-500 hover:bg-rose-600 transition-all duration-300 px-10 py-5'>Go to Appointments</Link>
        </div>
    );
}

export default HomePage;
