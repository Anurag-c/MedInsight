import theme1 from '../themes/default';
import theme2 from '../themes/theme1';
import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const sidebarOptions = [
    { id: 1, name: 'Home', path: '/app', isPatient: true, isDoctor: true, isInsurance: true },
    { id: 2, name: 'Appointments', path: '/app/appointments', isPatient: true, isDoctor: true, isInsurance: false },
    { id: 3, name: 'Doctors', path: '/app/doctors', isPatient: true, isDoctor: false, isInsurance: false },
    { id: 4, name: 'Patients', path: '/app/patients', isPatient: false, isDoctor: false, isInsurance: false },
    { id: 5, name: 'Plans', path: '/app/plans', isPatient: false, isDoctor: false, isInsurance: true },
    { id: 6, name: 'Insurers', path: '/app/insurers', isPatient: true, isDoctor: false, isInsurance: false },
    { id: 7, name: 'Messages', path: '/app/messenger', isPatient: true, isDoctor: true, isInsurance: true },
    { id: 8, name: 'Settings', path: '/app/settings', isPatient: true, isDoctor: true, isInsurance: true },
]

const topBarCards = [
    { id: 1, label: 'Plans', value: 20, key: 'plans', isPatient: true, isDoctor: true, isInsurance: true },
    { id: 2, label: 'Patients', value: 200, key: 'patients', isPatient: false, isDoctor: true, isInsurance: true },
    { id: 3, label: 'Doctors', value: 50, key: 'doctors', isPatient: true, isDoctor: false, isInsurance: true },
    { id: 4, label: 'Appointments', value: 8, key: 'appointments', isPatient: true, isDoctor: true, isInsurance: false }
]

const themeMappings = [
    { id: 1, label: 'theme1', value: theme1 },
    { id: 2, label: 'theme2', value: theme2 }
]

const tabs = [
    { id: 1, label: 'Personal Information', value: 'personal', isPatient: true, isDoctor: true, isInsurance: true },
    { id: 2, label: 'Medical Information', value: 'medical', isPatient: true, isDoctor: false, isInsurance: false },
    { id: 3, label: 'Professional Information', value: 'professional', isPatient: false, isDoctor: true, isInsurance: false }
]

const conditions = [
    { id: 1, label: 'Fever' },
    { id: 2, label: 'Cough' },
    { id: 3, label: 'Fracture' },
    { id: 4, label: 'Covid' }
]

const patients = [
    {
        id: 1,
        name: 'John Doe',
        email: 'abc@example.com',
        medicalInformation: {
            id: "1",
            medicalHistory: "Medical history 1",
            covid19Symptoms: {
                fever: true,
                cough: false
            }
        },
        planId: 1
    },
    {
        id: 4,
        name: 'Alex Doe',
        email: 'abc4@example.com',
        medicalInformation: {
            id: "2",
            medicalHistory: "Medical history 2",
            covid19Symptoms: {
                fever: false,
                cough: false
            }
        },
        planId: 3
    },
    {
        id: 3,
        name: 'Max Doe',
        email: 'abc5@example.com',
        medicalInformation: {
            id: "3",
            medicalHistory: "Medical history 3",
            covid19Symptoms: {
                fever: false,
                cough: true
            }
        },
        planId: 4
    },
    {
        id: 2,
        name: 'Kate Doe',
        email: 'abc6@example.com',
        medicalInformation: {
            id: "4",
            medicalHistory: "Medical history 4",
            covid19Symptoms: {
                fever: true,
                cough: false
            }
        },
        planId: 2
    },
    {
        id: 5,
        name: 'Jonathan Doe',
        email: 'abc7@example.com',
        medicalInformation: {
            id: "5",
            medicalHistory: "Medical history 5",
            covid19Symptoms: {
                fever: false,
                cough: false
            }
        },
        planId: 5
    }
]

const days = [
    { label: 'Sunday', value: 'sunday', isExpanded: false, startTime: "", endTime: "" },
    { label: 'Monday', value: 'monday', isExpanded: false, startTime: "", endTime: "" },
    { label: 'Tuesday', value: 'tuesday', isExpanded: false, startTime: "", endTime: "" },
    { label: 'Wednesday', value: 'wednesday', isExpanded: false, startTime: "", endTime: "" },
    { label: 'Thursday', value: 'thursday', isExpanded: false, startTime: "", endTime: "" },
    { label: 'Friday', value: 'friday', isExpanded: false, startTime: "", endTime: "" },
    { label: 'Saturday', value: 'saturday', isExpanded: false, startTime: "", endTime: "" }
]

const getUser = async (): Promise<any> => {
    const user = await axios.get(`${REACT_APP_API_URL}/api/v1/users/me`, {
        withCredentials: true
    });

    if (user.data.status !== 'success') return null; // TODO - Handle error (route to login screen?)

    return user.data.data.user;
}

const getUserByRole = async (role: string) => {
    const res = await axios.get(`${REACT_APP_API_URL}/api/v1/users/${role}/me`, {
        withCredentials: true
    });

    if (res.data.status !== 'success') return null;
    
    return res.data.data.data;
}

const updateUser = async (payload: any): Promise<any> => {
    const user = await axios.patch(`${REACT_APP_API_URL}/api/v1/users/updateMe`, payload, {
        withCredentials: true
    });

    if (user.data.status !== 'success') {
        throw new Error(user.data.message);
    }

    return user.data.data.user;
}

const updateUserByRole = async (payload: any, role: string) => {
    const res = await axios.patch(`${REACT_APP_API_URL}/api/v1/users/${role}/updateMe`, payload, {
        withCredentials: true
    });
    if (res.data.status !== 'success') {
        throw new Error(res.data.message);
    }

    return res.data.data.data;
}

const userLogin = async (payload: any): Promise<any> => {
    const user = await axios.post(`${REACT_APP_API_URL}/api/v1/users/login`, {
        email: payload.email,
        password: payload.password,
        totp: payload.totp
    }, {
        withCredentials: true
    })
    // .then((res) => {
    //     return res;
    // }).catch(() => {
    //     return null;
    // });

    if (user?.status !== 200) return null; // TODO - Handle error (route to login screen?)

    return {
        token: user.data.token,
        user: user.data.data.user
    };
}

const userRegister = async (payload: any): Promise<any> => {
    const user = await axios.post(`${REACT_APP_API_URL}/api/v1/users/signup`, {
        email: payload.email,
        password: payload.password,
        passwordConfirm: payload.passwordConfirm,
        name: payload.name,
        phone: payload.phone,
        address: payload.address,
        role: payload.role,
        theme: payload.theme
    }, {
        withCredentials: true
    });

    if (user.status !== 200) {
        return null; // TODO - Handle error (route to register screen?)
    }

    return user.data;
}

const getKeyByRole = (role: String) => {
    return role === 'patient' ? 'isPatient' : role === 'doctor' ? 'isDoctor' : 'isInsurance';
}

const getSidebarOptionsByRole = (role: String) => {
    const key = getKeyByRole(role);
    return sidebarOptions.filter(opt => opt[key]);
}

const getTopBarCardsByRole = (role: String) => {
    const key = getKeyByRole(role);
    return topBarCards.filter(obj => obj[key]);
}

const getTopCardsByEmail = async () => {
    const user = await getUser();

    return user?.dashboardMetadata || [];
}

const getNotificationsByEmail = async () => {
    const user = await getUser();

    return user?.recents || [];
}

const getTheme = (theme: String) => {
    return themeMappings.find(opt => opt.label === theme)?.value || theme1;
}

const getTabsByRole = (role: String) => {
    const key = getKeyByRole(role);
    return tabs.filter(obj => obj[key]);
}

const getAllConditions = () => {
    return conditions;
}

const getAllSpecialities = async () => {
    const specialitiesData = await axios.get(`${REACT_APP_API_URL}/api/v1/users/doctor/specs`, {
        withCredentials: true
    });
    return specialitiesData.data.data.data;
}

const getAllDays = () => {
    return days;
}

const getAllTimes = () => {
    let times = [];
    for (let i = 0; i < 24; i++) {
        let timeObj = {
            label: `${i}:00`,
            value: `${i}:00`
        }
        times.push(timeObj)
    }
    return times;
}

const getAllTimesAfter = (time: any) => {
    let times = [], startingIndex = time.split(':')[0];
    for (let i = startingIndex; i < 24; i++) {
        let timeObj = {
            label: `${i}:00`,
            value: `${i}:00`
        }
        times.push(timeObj)
    }
    return times;
}

const getAllPlans = async () => {
    const plansCall = await axios.get(`${REACT_APP_API_URL}/api/v1/plans`, {
        withCredentials: true, 
    });

    if (plansCall.status !== 200) return [];

    const tempPlans = plansCall.data.data.data;

    return tempPlans;
}

const subscribeToPlan = async (plan: any) => {
    await axios.post(`${REACT_APP_API_URL}/api/v1/purchasePlans`, {
        planId: plan.id,
        price: plan.premiumCost,
    }, {
        withCredentials: true,
    });
}

const getAllPatients = () => {
    return patients;
}

// Need to create a 'get all doctors' endpoint on the API
const getDoctors = async (name : string | null, treatsCovid : boolean | null, specializations : [] | null) => {
    const doctors = await axios.get(`${REACT_APP_API_URL}/api/v1/search?name=${name == '' ? null : name}&treatsCovid=${treatsCovid}&specialization=${JSON.stringify(specializations != null ? specializations : [])}`, {
        withCredentials: true
    });

    if (doctors.status !== 200) return [];

    const doctorsList = doctors.data.data;

    return doctorsList.filter((doc: any) => doc.name.toLowerCase());
}

const getAllAppointments = async () => {
    const res = await axios.get(`${REACT_APP_API_URL}/api/v1/slots`, {
        withCredentials: true
    });

    return res;
}

const getPlanByUser = async (userId: any) => {
    const plansCall = await axios.get(`${REACT_APP_API_URL}/api/v1/plans/patient/${userId}`, {
        withCredentials: true,
    });

    if (plansCall.status !== 200) return null;

    const tempPlans = plansCall?.data?.data?.data?.plans;

    return tempPlans;
}

const updateMedicalInformation = async (payload: any) => {
    const medicalInformation = await axios.patch(`${REACT_APP_API_URL}/api/v1/users/patient/updateMe`, payload, {
        withCredentials: true,
    });

    if (medicalInformation.data.status !== 'success') {
        throw new Error(medicalInformation.data.message);
    }

    return medicalInformation.data.data.user;
}

const getDoctorById = async (id: any) => {
    const specialitiesData = await axios.get(`${REACT_APP_API_URL}/api/v1/users/doctor/${id}`, {
        withCredentials: true
    });
    return specialitiesData.data.data.data;
}

const getPatientById = async (id: any) => {
    const res = await axios.get(`${REACT_APP_API_URL}/api/v1/users/patient/${id}`, {
        withCredentials: true
    });
    return res.data.data.data;
}

const getTimeSlots = (day: any) => {
    const slots = [];
    for (let i = 0; i < 24; i += 2) {
        const obj = {
            label: `${i}:00`
        }
        slots.push(obj);
    }
    return slots;
}

const bookAppointment = async (id: any) => {
    const res = await axios.patch(`${REACT_APP_API_URL}/api/v1/slots/${id}/book`, {}, {
        withCredentials: true
    });
    if (res.status !== 200) return null;
    
    return res;
}

const cancelAppointment = async (id: any) => {
    const res = await axios.patch(`${REACT_APP_API_URL}/api/v1/slots/${id}/cancel`, {}, {
        withCredentials: true
    });

    if (res.status !== 200) return null;
    
    return res;
}

const createFeedback = async (payload: any) => {
    const res = await axios.post(`${REACT_APP_API_URL}/api/v1/feedbacks/`, payload, {
        withCredentials: true
    });
    if (res.status !== 200) return null;

    return res.data.data.data;
}

const editFeedback = async (payload: any) => {
    const res = await axios.patch(`${REACT_APP_API_URL}/api/v1/feedbacks/${payload.id}`, payload, {
        withCredentials: true
    });

    if (res.status !== 200) return null;

    return res.data.data.data;
}

const getAllInsurers = async () => {
    const res = await axios.get(`${REACT_APP_API_URL}/api/v1/users/providers/prisma`, {
        withCredentials: true
    })

    if (res.status !== 200) return null;

    return res.data.data.data;
}

const subscribeProvider = async (providerId: any) => {
    const res = await axios.post(`${REACT_APP_API_URL}/api/v1/subscribe`, { providerId: providerId }, {
        withCredentials: true
    })
    if (res.status !== 200) return null;

    return res.data.data.data;
}

const createPlan = async (payload: any) => {
    const res = await axios.post(`${REACT_APP_API_URL}/api/v1/plans`, {
        planName: payload.planName,
        premiumCost: payload.premiumCost,
        planDescription: payload.planDescription ?? "",
    }, {
        withCredentials: true
    });

    if (res.status !== 200) return null;

    return res.data.data.data;
}

const getProviderById = async (providerId: any) => {
    const res = await axios.get(`${REACT_APP_API_URL}/api/v1/users/providers/${providerId}`, {
        withCredentials: true
    })

    if (res.status !== 200) return null;

    return res.data.data.data;
}

const editPlan = async (payload: any) => {
    const res = await axios.patch(`${REACT_APP_API_URL}/api/v1/plans/${payload.id}`, {
        planName: payload.planName,
        premiumCost: payload.premiumCost,
        planDescription: payload.planDescription ?? "",
    }, {
        withCredentials: true
    });

    if (res.status !== 200) return null;

    return res.data.data.data;
}

const deletePlan = async (id: any) => {
    await axios.delete(`${REACT_APP_API_URL}/api/v1/plans/${id}`, {
        withCredentials: true
    });
}

const buyPlan = async (id: any) => {
    const res = await axios.post(`${REACT_APP_API_URL}/api/v1/plans/purchase/${id}`, {}, {
        withCredentials: true
    });

    if (res.status !== 200) return null;

    return res.data.data.data;
}

export const Helper = {
    getUser,
    getUserByRole,
    getSidebarOptionsByRole,
    getTopBarCardsByRole,
    getTopCardsByEmail,
    getNotificationsByEmail,
    getTheme,
    getTabsByRole,
    getAllConditions,
    getAllSpecialities,
    getAllDays,
    getAllTimes,
    getAllTimesAfter,
    getAllPlans,
    getDoctors,
    getPlanByUser,
    getDoctorById,
    getPatientById,
    getTimeSlots,
    getAllAppointments,
    getAllPatients,
    userLogin,
    userRegister,
    updateUser,
    updateUserByRole,
    bookAppointment,
    cancelAppointment,
    createFeedback,
    editFeedback,
    getAllInsurers,
    subscribeProvider,
    getProviderById,
    subscribeToPlan,
    createPlan,
    editPlan,
    deletePlan,
    buyPlan
}
