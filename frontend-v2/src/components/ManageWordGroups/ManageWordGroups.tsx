import React, {useMemo} from 'react';

import {
    List,
    ListItemButton, ListItemText,
} from "@mui/material";
import {useSelector} from "react-redux";
import useGroups from "../../hooks/useGroups";


const ManageWordGroups: React.FC = () => {
    const groups = useSelector((state) => state.groups.groups);
    const isLoading = useSelector((state) => state.groups.isLoading);
    const {getGroups} = useGroups()
    useMemo(async () => {
        await getGroups()
    }, [])
    return (
        <div>
            {
                isLoading && <p>Loading...</p>
            }
            {
                !isLoading && groups.length === 0 && <p>No groups available.</p>
            }
            <List
                sx={{width: '100%', maxWidth: 360}}
            >
                {groups.map((group, index) => (
                    <ListItemButton key={index}>
                        <ListItemText primary={group.name}/>
                    </ListItemButton>
                ))}
            </List>
        </div>

    );
};

export default ManageWordGroups;
