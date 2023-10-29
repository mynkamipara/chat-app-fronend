'use client';
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { ISession } from "../Interfaces/user.interface";

interface SessionContextType {
    value: ISession
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);
interface Props {
    children: ReactNode;
}
export default function SessionProvider({ children }: Props) {

    const [loading, setLoading] = useState(true);
    const [sessionInfo, setSessionInfo] = useState(undefined);

    useEffect(() => {
        setLoading(true);
        if (typeof window !== 'undefined') {
            const userInfo: string|null = localStorage.getItem('userInfo');
            const token: string|null = localStorage.getItem('token');
            if (token && userInfo) {
                setSessionInfo(JSON.parse(userInfo))
            }
            setLoading(false);
        }
    }, [])
    return (
        <>
            <SessionContext.Provider value={sessionInfo}>
                {!loading && <>{children}</>}
            </SessionContext.Provider>
        </>
    )
}

export const useSession = () => useContext(SessionContext);