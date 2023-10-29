import React from 'react';
import Grid from '@mui/material/Grid';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface MessageBoxProps {
    handleSubmitMessage: any
    setMessage: (value: string) => void,
    message: string
}

const MessageBox = ({ handleSubmitMessage, setMessage, message }: MessageBoxProps) => {

    return (
        <div>
            <Grid container style={{ padding: '20px' }}>
                <form onSubmit={handleSubmitMessage} style={{ width: '80%' }}>
                    <Grid item xs={11} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />
                        <Button type='submit'>
                            <Grid xs={1} alignItems="right">
                                <SendIcon color="primary" fontSize='large' />
                            </Grid>
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </div>
    );
}

export default MessageBox;