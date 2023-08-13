import React, {useEffect, useState} from 'react';

import {
    Button, IconButton, Input,
    List, ListItem,
    ListItemButton, ListItemText, TextField, Typography,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import useGroups from "../../hooks/useGroups";
import {Group} from "../../entities/Group";
import ManageGroupModal from "./ManageGroupModal";
import DeleteIcon from '@mui/icons-material/Delete';


const ManageWordGroups: React.FC = () => {
    const groups = useSelector((state) => state.groups.groups);
    const isLoading = useSelector((state) => state.groups.isLoading);
    const dispatch = useDispatch();
    const [groupInModal, setGroupInModal] = useState<Group | undefined>(undefined);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [newGroupName, setNewGroupName] = useState<string>('');
    const {getGroups, createGroup, deleteGroup} = useGroups();

    useEffect(() => {
        getGroups();
    }, [])

    const openModal = async (group: Group) => {
        await setGroupInModal(group);
        await setIsModalOpen(true);
    }

    const closeModal = async () => {
        await setIsModalOpen(false);
        await setGroupInModal(undefined);
    }

    const onCreateNewGroup = async (e) => {
        e.preventDefault();
        await createGroup(newGroupName);
        await setNewGroupName('');
        await getGroups();
    }

    const onDeleteGroup = async (groupId: number) => {
        await deleteGroup(groupId);
        await getGroups();
    }

    return (
        <div className={'flex flex-col gap-2'}>
            <Typography variant={"h6"} component={"h2"}>
                Groups Management Page
            </Typography>
            <Typography variant={"h6"} component={"h3"}>
                Create new group
            </Typography>
            <div>
                <TextField label={"Group name"} variant={"standard"} value={newGroupName}
                           onChange={async (e) => {
                               await setNewGroupName(e.target.value);
                           }}/>
                <Button
                    disabled={!newGroupName}
                    onClick={onCreateNewGroup}>Create
                </Button>
            </div>
            <Typography variant={"h6"} component={"h3"}>
                Groups
            </Typography>
            {
                isLoading && <p>Loading...</p>
            }
            {
                !isLoading && groups.length === 0 && <p>No groups available.</p>
            }
            {
                !isLoading && (
                    <List sx={{width: '100%', maxWidth: 360}}>
                        {groups.map((group, index) => (
                            <ListItem secondaryAction={
                                <IconButton edge="end" aria-label="delete"
                                            onClick={() => onDeleteGroup(group.id)}>
                                    <DeleteIcon/>
                                </IconButton>
                            }>
                                <ListItemButton key={index} onClick={() => openModal(group)}>
                                    <ListItemText primary={group.name}/>
                                </ListItemButton>
                            </ListItem>

                        ))}
                    </List>
                )
            }
            {
                groupInModal && (
                    <ManageGroupModal
                        isModalOpen={isModalOpen}
                        onClose={closeModal}
                        group={groupInModal}/>
                )
            }
        </div>

    );
};

export default ManageWordGroups;
