import React, { useState} from 'react';

import {
    Button,
    List,
    ListItemButton, ListItemText, Typography,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import useGroups from "../../hooks/useGroups";
import {Group} from "../../entities/Group";
import ManageGroupModal from "./ManageGroupModal";


const ManageWordGroups: React.FC = () => {
    const groups = useSelector((state) => state.groups.groups);
    const isLoading = useSelector((state) => state.groups.isLoading);
    const dispatch = useDispatch();
    const [groupInModal, setGroupInModal] = useState<Group | undefined>(undefined);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const {getGroups} = useGroups()

    const _onClickGetGroups = async () => {
        await getGroups();
    }

    const openModal = async (group: Group) => {
        await setGroupInModal(group);
        await setIsModalOpen(true);
    }

    const closeModal = async () => {
        await setIsModalOpen(false);
        await setGroupInModal(undefined);
    }

    return (
        <div className={'flex flex-col gap-2'}>
            <Typography variant={"h6"} component={"h2"}>
                Groups Management Page
            </Typography>
            <Button variant={"contained"} type={"submit"} onClick={_onClickGetGroups}
                    disabled={isLoading}>
                Get Groups
            </Button>
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
                            <ListItemButton key={index} onClick={() => openModal(group)}>
                                <ListItemText primary={group.name}/>
                            </ListItemButton>
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
