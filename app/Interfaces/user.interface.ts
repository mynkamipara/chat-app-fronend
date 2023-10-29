export interface ISession {
    userId: string,
    firstName: string;
    lastName: string,
    email: string,
}

export interface ILoginParams {
    email: string,
    password: string
}

export interface ISignupParams {
    firstName: string;
    lastName: string,
    email: string,
    password: string
}

export interface ISignupParams {
    firstName: string;
    lastName: string,
    email: string,
    password: string
}

export interface ISelectedUser {
    _id:string,
    firstName: string;
    lastName: string,
    email: string,
}