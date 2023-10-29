'use client';
import React, { useEffect, useRef, useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { io } from 'socket.io-client';

import ConnectionList from '../component/Chat/ConnectionList';
import SessionUser from '../component/Chat/SessionUser';
import MessageList from '../component/Chat/MessageList';
import ProtectedRoute from '../ProtectedRoute';
import { useSession } from '../component/SessionProvider';
import { userConnectionAPI } from '../api/user';
import { ISelectedUser } from '../Interfaces/user.interface';

const Chat = () => {
    const session: any = useSession();

    const socket:any = useRef();

    const [connectionUsers, setConnectionUsers] = useState<Array<ISelectedUser>>([]);
    const [selectChatUser, setSelectChatUser] = useState<ISelectedUser | undefined>();
    const [activeUsersIds, setActiveUsersIds] = useState<Array<String>>([]);

    const [search, setSearch] = useState('');

    const { data, isLoading, error, refetch } = userConnectionAPI(search, { enabled: true });

    useEffect(() => {
        if (data) {
            setConnectionUsers(data);
        }
    }, [data, error])

    useEffect(() => {
        if (session) {
            if (typeof window !== 'undefined') {
                const token = localStorage.getItem('token');
                const socketConnection = io(process.env.NEXT_PUBLIC_SOCKET_URL || '', {
                    auth: {
                        token: token
                    }
                });
                socket.io = socketConnection;
                socket.io.emit('chatRoomAddUser', session.user_id);
                socket.io.on('chatRoomGetUsers', (users: Array<Array<String>>) => {
                    const AllActiveUsersIds = users.map((u: Array<String>) => u[0]);
                    setActiveUsersIds(AllActiveUsersIds);
                })
            }
        }
    }, [session])

    const handleSeach = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearch(e.target.value);
        refetch();
    }

    return (
        <ProtectedRoute>
            {session && !isLoading &&
                <div>
                    <Grid container>
                        <Grid item xs={12} >
                            <Typography variant="h5" className="header-message">Chat</Typography>
                        </Grid>
                    </Grid>
                    <Grid container component={Paper} style={{
                        width: '100%'
                    }}>
                        <Grid item xs={3} style={{ borderRight: '1px solid #e0e0e0' }}>
                            <SessionUser user={session} />
                            <Divider />
                            <Grid item xs={12} style={{ padding: '10px' }}>
                                <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth value={search} onChange={handleSeach} />
                            </Grid>
                            <Divider />
                            <ConnectionList
                                activeUsersIds={activeUsersIds}
                                connectionUsers={connectionUsers}
                                setSelectChatUser={setSelectChatUser}
                                selectChatUser={selectChatUser}
                            />
                        </Grid>
                        <Grid item xs={9}>
                            {selectChatUser ?
                                <>
                                    <MessageList selectChatUser={selectChatUser} sessionUser={session} socket={socket} activeUsersIds={activeUsersIds} />
                                </> :
                                <Grid>
                                    <p>No Chat</p>
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                </div>
            }
        </ProtectedRoute>
    );
}

export default Chat;