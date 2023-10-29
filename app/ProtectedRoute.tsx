
'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from './component/SessionProvider'

const ProtectedRoute = ({ children }:any) => {
    const router = useRouter();
    const session:any = useSession();

   useEffect(() => {
        // Check if the user is authenticated, redirect to login if not.
        if (!session) {
            router.push('/login'); // Redirect to the login page.
        }
    }, [session]);

    return <>{children}</>;
};

export default ProtectedRoute;