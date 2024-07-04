import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/Landing/LandingPage";
import Login from "../pages/Auth/Login";
import DashboardLayout from "../pages/DashboardLayout/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../pages/Auth/AuthLayout";
import Register from "../pages/Auth/Register";
import TwoFactorAuth from "../components/common/TwoFactorAuth";
import DashboardHome from "../pages/DashboardHome/DashboardHome";
import Settings from "../pages/Settings/Settings";
import Doctors from "../pages/Doctors/Doctors";
import Plans from "../pages/Plans/Plans";
import Insurances from "../pages/Insurances/Insurances";
import DoctorDetail from "../pages/Doctors/DoctorDetail";
import Appointments from "../pages/Appointments/Appointments";
import Patients from "../pages/Patients/Patients";
// import LandingPage from "./pages/Landing/LandingPage";
import Messenger from "../pages/Message/Messenger";
import Insurers from "../pages/Insurers/Insurers";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <LandingPage />
            },
            {
                path: '/auth',
                element: <AuthLayout />,
                children: [
                    {
                        path: 'login',
                        element: <Login />
                    },
                    {
                        path: 'register',
                        element: <Register />
                    },
                    {
                        path: '2fa',
                        element: <TwoFactorAuth />
                    }
                ]
            },
            {
                path: '/app',
                element: <DashboardLayout />,
                children: [
                    {
                        index: true,
                        element: <DashboardHome />
                    },
                    {
                        path: 'appointments',
                        element: <Appointments />
                    },
                    {
                        path: 'doctors',
                        element: <Doctors />
                    },
                    {
                        path: 'doctors/:doctorId',
                        element: <DoctorDetail />
                    },
                    {
                        path: 'insurers',
                        element: <Insurers />
                    },
                    {
                        path: 'insurers/:insurerId',
                        element: <Insurances />
                    },
                    {
                        path: 'patients',
                        element: <Patients />
                    },
                    {
                        path: 'plans',
                        element: <Plans />
                    },
                    {
                        path: 'settings',
                        element: <Settings />,
                    },
                    {
                        path: 'messenger',
                        element: <Messenger />
                    }
                ]
            }
        ]
    }
]);

export default router;