import React from "react";
import {Box, Modal,  Typography} from "@mui/material";
import {Group} from "../../entities/Group";

type ManageGroupModalProps = {
    isModalOpen: boolean;
    onClose: CallableFunction;
    group: Group;
}

const ManageGroupModal: React.FC = ({isModalOpen, onClose, group}: ManageGroupModalProps) => {
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 700,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4
    };
    return (
        <Modal
            open={isModalOpen}
            onClose={onClose}>
            <Box sx={style} className={'flex flex-col gap-4'}>
                <div className={'overflow-scroll h-full'}>
                    <Typography variant={"h6"} component={"h2"}>
                        {group.name}
                    </Typography>

                    Words: {group.words}
                </div>

            </Box>
        </Modal>
    )
}

export default ManageGroupModal;