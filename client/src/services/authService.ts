import { Helper } from './helper';

const register = (payload: any) => {
    return new Promise<any>(async (resolve, reject) => {
        const userData = await Helper.userRegister(payload);
        const data = {
            qrCode: userData.qrCode,
            data: {
                user: userData
            }
        }
        setTimeout(() => {
            resolve(data);
        }, 800);
    })
}

const login = (payload: any) => {
    return new Promise<any>(async (resolve, reject) => {
        const userData = await Helper.userLogin(payload);

        if (!userData) {
            return resolve(null);
        } else {
            const data = {
                token: userData.token,
                user: userData.user
            }
            setTimeout(() => {
                resolve(data);
            }, 800);
        }
    })
}

export const AuthService = {
    register,
    login
}
