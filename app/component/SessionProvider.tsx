'use client';
import { createContext, useContext, useEffect, useState } from "react";

const SessionContext: any = createContext({});
export default function SessionProvider({ children }: any) {

    const [loading, setLoading] = useState(true);
    const [sessionInfo, setSessionInfo]: any = useState(undefined);

    useEffect(() => {
        setLoading(true);
        if (typeof window !== 'undefined') {
            const userInfo:any = localStorage.getItem('userInfo');
            const token = localStorage.getItem('token');
            if (token) {
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