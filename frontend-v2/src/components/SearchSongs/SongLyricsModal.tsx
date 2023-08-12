import React, {useContext, useMemo, useState} from "react";
import {Song, Word} from "../../entities/Song";
import {SearchContext, SearchEventContext, MatchText} from "react-ctrl-f";
import {Box, Button, Modal, TextField, Tooltip, Typography} from "@mui/material";
import useSongs from "../../hooks/useSongs";
import LyricsWithPositions from "./LyricWithPositions";

type SongLyricsModalProps = {
    isModalOpen: boolean;
    onClose: CallableFunction;
    song: Song;
}

const SongLyricsModal: React.FC = ({isModalOpen, onClose, song}: SongLyricsModalProps) => {
    const {searchValue, activeCount, totalCount} = useContext(SearchContext);
    const {onSearchChange, onPrev, onNext} = useContext(SearchEventContext);
    const [songWords, setSongWords] = useState<Word[][]>([]);
    const {getSongWords} = useSongs()
    useMemo(async () => {
        const words = await getSongWords(song.id);
        await setSongWords(words);
    }, [song.id]);

    const enableTooltips = async () => {
        onSearchChange({target: {value: ''}});
    }

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
                        disabled={!searchValue}
                        onClick={() => onPrev(100)}>Prev
                    </Button>
                    <span className={!searchValue ? 'opacity-50' : ''}>
                      {activeCount}/{totalCount}
                    </span>
                    <Button
                        disabled={!searchValue}
                        onClick={() => onNext(100)}>Next
                    </Button>
                </div>
                <div>
                    <Tooltip title={'Word position tooltips are only enabled when search is turned off'}>
                        <span>
                            <Button onClick={enableTooltips} disabled={!searchValue}>
                                Display word position tooltips
                            </Button>
                        </span>
                    </Tooltip>
                </div>
                <div className={'overflow-scroll h-full'}>
                    <Typography variant={"h6"} component={"h2"}>
                        {song.name}
                    </Typography>

                    <div className={'whitespace-pre-line'}>
                        {
                            searchValue && (
                                <MatchText id={'match-song-content'}>
                                    {song.content}
                                </MatchText>
                            )
                        }
                        {
                            !searchValue && (
                                <LyricsWithPositions songWords={songWords}/>
                            )
                        }
                    </div>
                </div>

            </Box>
        </Modal>
    )
}

export default SongLyricsModal;