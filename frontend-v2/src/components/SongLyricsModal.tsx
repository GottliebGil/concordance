import React, {useContext} from "react";
import Song from "../entities/Song";
import {SearchContext, SearchEventContext, MatchText} from "react-ctrl-f";
import {Box, Button, Modal, TextField, Typography} from "@mui/material";

type SongLyricsModalProps = {
    isModalOpen: boolean;
    onClose: CallableFunction;
    song: Song;
}

const SongLyricsModal: React.FC = ({isModalOpen, onClose, song}: SongLyricsModalProps) => {
    const {searchValue, activeCount, totalCount} = useContext(SearchContext);
    const {onSearchChange, onPrev, onNext} = useContext(SearchEventContext);

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
                <div className={'flex flex-row items-baseline gap-2'}>
                    <TextField label={"Search in song"} variant={"standard"} value={searchValue}
                               onChange={onSearchChange}/>
                    <Button
                        title='Up'
                        disabled={!searchValue}
                        onClick={() => onPrev(100)}>Prev
                    </Button>
                    <span className={!searchValue ? 'opacity-50' : ''}>
                      {activeCount}/{totalCount}
                    </span>
                    <Button
                        title='Down'
                        disabled={!searchValue}
                        onClick={() => onNext(100)}>Next
                    </Button>
                </div>
                <div className={'overflow-scroll h-full'}>
                    <Typography variant={"h6"} component={"h2"}>
                        {song.name}
                    </Typography>
                    <Typography className={'whitespace-pre-line'} id="modal-modal-description" sx={{mt: 2}}>
                        <MatchText id={'match-song-content'}>{song.content}</MatchText>
                    </Typography>
                </div>

            </Box>
        </Modal>
    )
}

export default SongLyricsModal;