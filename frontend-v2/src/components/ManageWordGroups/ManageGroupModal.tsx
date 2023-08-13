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
import SeeWordReferencesModal from "./SeeWordReferencesModal";

type ManageGroupModalProps = {
    isModalOpen: boolean;
    onClose: CallableFunction;
    group: Group;
}

const ManageGroupModal: React.FC = ({isModalOpen, onClose, group}: ManageGroupModalProps) => {
    const [words, setWords] = useState<string[]>([]);
    const [wordsToAdd, setWordsToAdd] = useState<string[]>([]);
    const [isLoadingWords, setIsLoadingWords] = useState<boolean>(true);
    const [isLoadingWordsToAdd, setIsLoadingWordsToAdd] = useState<boolean>(true);
    const [newWordToAdd, setNewWordToAdd] = useState<string>('');

    const [wordToSeeReferences, setWordToSeeReferences] = useState<string | undefined>(undefined);
    const [isReferencesModalOpen, setIsReferencesModalOpen] = useState<boolean>(false);

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
    const {removeWordFromGroup, getGroupWords, getWordsNotInGroup, addWordToGroup} = useGroups();

    const _reloadPage = async () => {
        const groupWords = await getGroupWords(group.id);
        const wordsNotInGroup = await getWordsNotInGroup(group.id);
        setWords(groupWords);
        setWordsToAdd(wordsNotInGroup);
        setIsLoadingWords(false);
        setIsLoadingWordsToAdd(false);
        setNewWordToAdd(undefined);
    }
    useEffect(() => {
        _reloadPage();
    }, [])

    const _onDeletePressed = async (deletedWord: string) => {
        await removeWordFromGroup(group.id, deletedWord);
        await _reloadPage();
    }

    const _onClickSeeReferences = async (word: string) => {
        setWordToSeeReferences(word);
        setIsReferencesModalOpen(true);
    }

    const _onAddPressed = async () => {
        await addWordToGroup(group.id, newWordToAdd);
        await _reloadPage();
    }

    const closeModal = async () => {
        await setIsReferencesModalOpen(false);
        await setWordToSeeReferences(undefined);
    }
    return (
        <Modal
            open={isModalOpen}
            onClose={onClose}>
            <Box sx={style} className={'flex flex-col gap-4'}>
                <div className={'flex flex-col gap-2 overflow-scroll h-full'}>
                    <Typography variant={"h6"} component={"h2"}>
                        {group.name}
                    </Typography>
                    <Typography variant={"h6"} component={"h3"}>
                        Add new word
                    </Typography>
                    {
                        isLoadingWordsToAdd && <div>Loading...</div>
                    }
                    {
                        wordsToAdd && (
                            <div className={'flex flex-row gap-4'}>
                                <Autocomplete options={wordsToAdd}
                                              className={'grow'}
                                              autoHighlight={false}
                                              onChange={(e, value) => setNewWordToAdd(value)}
                                              renderInput={(params) => <TextField {...params} label={'Word'}/>}/>
                                <Button disabled={!Boolean(newWordToAdd)}
                                        onClick={_onAddPressed}>
                                    Add
                                </Button>
                            </div>
                        )
                    }
                    <Typography variant={"h6"} component={"h3"}>
                        Words List
                    </Typography>
                    {
                        isLoadingWords && <div>Loading...</div>
                    }
                    {!isLoadingWords && (
                        <List sx={{width: '100%', maxWidth: 360}}>
                            {words.map((word, index) => (
                                <ListItem key={index} secondaryAction={
                                    <div className={'flex flex-row gap-1'}>
                                        <Tooltip title="See references">
                                            <IconButton edge="end" aria-label="delete"
                                                        onClick={() => _onClickSeeReferences(word)}>
                                                <UnfoldMoreIcon/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete word from group">
                                            <IconButton edge="end" aria-label="delete"
                                                        onClick={() => _onDeletePressed(word)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                }>
                                    <ListItemText primary={word}/>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </div>
                {
                    wordToSeeReferences && <SeeWordReferencesModal
                        isModalOpen={isReferencesModalOpen}
                        onClose={closeModal}
                        word={wordToSeeReferences}/>
                }
            </Box>
        </Modal>
    )
}

export default ManageGroupModal;