import React, {useEffect, useState} from "react";
import {
    Autocomplete,
    Box, Button,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Menu,
    Modal,
    NativeSelect, TextField, Tooltip,
    Typography
} from "@mui/material";
import {Group} from "../../entities/Group";
import DeleteIcon from '@mui/icons-material/Delete';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import useGroups from "../../hooks/useGroups";
import useWords from "../../hooks/useWords";
import {WordPosition} from "../../entities/Song";

type SeeWordReferencesModalProps = {
    isModalOpen: boolean;
    onClose: CallableFunction;
    word: string;
}

const SeeWordReferencesModal: React.FC = ({isModalOpen, onClose, word}: SeeWordReferencesModalProps) => {
    const [wordPositions, setWordPositions] = useState<WordPosition[]>([]);
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4
    };
    const {getWordPositions} = useWords();
    useEffect(() => {
        getWordPositions(word).then(result => {
            setWordPositions(result);
        })
    }, [])

    return (
        <Modal
            open={isModalOpen}
            onClose={onClose}>
            <Box sx={style} className={'flex flex-col gap-4'}>
                <div className={'flex flex-col gap-2 overflow-scroll h-full'}>
                    <Typography variant={"h6"} component={"h2"}>
                        References for {word}
                    </Typography>

                    {
                        wordPositions && (
                            <div className={'flex flex-col gap-4'}>
                                {wordPositions.map((wordPosition, index) => (
                                    <ListItemText
                                        key={index}
                                        primary={
                                            `${wordPosition.song_name} by ${wordPosition.artist_name}`
                                        }
                                        secondary={
                                            `Written as "${wordPosition.appearance}" verse ${wordPosition.verse_index}, line: ${wordPosition.line_index}, word: ${wordPosition.word_index}`
                                        }
                                    />
                                ))}
                            </div>
                        )
                    }
                </div>
            </Box>
        </Modal>
    )
}

export default SeeWordReferencesModal;