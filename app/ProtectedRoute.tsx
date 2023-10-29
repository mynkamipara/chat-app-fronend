
'use client';
import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from './component/SessionProvider'
import { ISession } from './Interfaces/user.interface';

interface MyProps {
    children?: ReactNode;
 }

const ProtectedRoute = ({ children }:MyProps) => {
    const router = useRouter();
    const session = useSession();

   useEffect(() => {
        // Check if the user is authenticated, redirect to login if not.
        if (!session) {
            router.push('/login'); // Redirect to the login page.
        }
    }, [session]);

    return <>{children}</>;
};

export default ProtectedRoute;