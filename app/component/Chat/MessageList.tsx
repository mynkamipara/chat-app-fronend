import React, { useEffect, useRef, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { userConversationAPI } from '@/app/api/user';
import moment from 'moment';
import MessageBox from './MessageBox';
import { Avatar, Divider, ListItemIcon, Paper } from '@mui/material';

const MessageList = ({ selectChatUser, sessionUser, socket, activeUsersIds }: any) => {

    const scrollRef: any = useRef(null);
    const [messsageList, setMessageList]: any = useState([]);
    const [message, setMessage] = useState('');

    const { data, isLoading, error } = userConversationAPI(selectChatUser._id);
    useEffect(() => {
        if (data) {
            setMessageList(data);
        }
    }, [data])



    const handleSubmitMessage = (e: any) => {
        e.preventDefault();
        if (message && message !== '') {
            socket.io.emit('sendPrivateMessage', {
                sender: sessionUser.user_id,
                receiver: selectChatUser._id,
                text: message,
            });


            const messageBody = {
                sender: sessionUser.user_id,
                receiver: selectChatUser._id,
                text: message,
                createdAt: moment().toDate()
            }
            setMessageList([...messsageList, messageBody])
            setMessage('');
        }
    }

    useEffect(() => {
        const handler = (data: any) => {
            if (selectChatUser._id == data.sender) {
                const messageBody = {
                    sender: sessionUser.sender,
                    receiver: data.receiver,
                    text: data.message,
                    createdAt: moment().toDate()
                }
                setMessageList([...messsageList, messageBody])
            }
        };
        socket.io.on('getPrivateMessage', handler);
        // Otherwise you'll start getting errors when the component is unloaded
        return () => socket.io.off('getPrivateMessage', handler);
    }, [socket, selectChatUser, messsageList])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [messsageList])

    return (
        <div>
            {!isLoading &&
                <>
                    <List>
                        <ListItem button >
                            <ListItemIcon>
                                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                            </ListItemIcon>
                            <Grid>
                                <p style={{ padding: 0, margin: 0 }}>{`${selectChatUser.firstName} ${selectChatUser.lastName}`}</p>
                                {activeUsersIds.includes(selectChatUser._id) && <p style={{ alignItems: 'right', color: 'green', padding: 0, margin: 0 }}>{'Online'}</p>}

                            </Grid>
                        </ListItem>
                    </List>
                    <Paper style={{ overflow: 'auto' }}>
                        <List style={{ minHeight: 400, maxHeight: 400 }}>
                            {messsageList.map((item: any, index: number) => (<>
                                {item.sender == sessionUser.user_id ? <>
                                    <ListItem key={index}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <ListItemText style={{ justifyContent: 'flex-end', display: 'flex', padding: 0, margin: 0 }} primary={item.text}></ListItemText>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <p style={{ justifyContent: 'flex-end', display: 'flex', fontSize: 12, padding: 0, margin: 0 }}>{moment(item.createdAt).format('HH:mm')}</p>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                </> : <>

                                    <ListItem key={index}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <ListItemText style={{ justifyContent: 'flex-start', display: 'flex', color: 'blue', padding: 0, margin: 0 }} primary={item.text}></ListItemText>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <p style={{ justifyContent: 'flex-start', display: 'flex', fontSize: 12, color: 'blue', padding: 0, margin: 0 }}>{moment(item.createdAt).format('HH:mm')}</p>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                </>}
                                <div ref={scrollRef}></div>

                            </>))}
                        </List>
                    </Paper>



                    <Divider />
                    <MessageBox handleSubmitMessage={handleSubmitMessage} setMessage={setMessage} message={message} />
                </>

            }

        </div>
    );
}

export default MessageList;