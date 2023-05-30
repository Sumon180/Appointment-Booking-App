import { Link } from 'react-router-dom';
import { motion } from "framer-motion"

const HomePage: React.FC = () => {
    return (
        <div className='flex flex-col items-center justify-center gap-16 w-screen h-screen'>
            <motion.h1
                initial={{ y: -450 }}
                animate={{ y: 0 }}
                transition={{
                    duration: "0.5",
                }}
                className='text-5xl'>Welcome to the Appointment Booking App!
            </motion.h1>
            <motion.div
                initial={{ y: 450 }}
                animate={{ y: 0 }}
                transition={{
                    duration: "0.5",
                }}
            >
                <Link
                    to="/appointments"

                    className='text-2xl bg-rose-500 hover:bg-rose-600 transition-all duration-300 px-10 py-5'
                >
                    Go to Appointments
                </Link>
            </motion.div>
        </div>
    );
}

export default HomePage;
