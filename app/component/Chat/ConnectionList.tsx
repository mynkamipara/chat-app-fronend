import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

const ConnectionList = ({ connectionUsers, activeUsersIds, setSelectChatUser, selectChatUser }: any) => {

    const handleSelectUser = (selectedUser: any) => {
        setSelectChatUser(selectedUser);
    }

    const activeStyle = {
        backgroundColor: '#a49f9f66',
    }
    return (
        <div>
            <List>
                {connectionUsers.map((item: any, index: any) => (<>
                    <ListItem button key={index} onClick={() => handleSelectUser(item)}
                        style={item._id == selectChatUser?._id ? activeStyle : {}}
                    >
                        <ListItemIcon>
                            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary={`${item.firstName} ${item.lastName}`}>{`${item.firstName} ${item.lastName}`}</ListItemText>
                        {activeUsersIds.includes(item._id) && <ListItemText primary="online" style={{ alignItems: 'right', color: 'green' }}></ListItemText>}
                    </ListItem>
                </>))}
            </List>
        </div>
    );
}

export default ConnectionList;