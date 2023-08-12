import React, {useContext} from "react";
import Song from "../entities/Song";
import {SearchContext, SearchEventContext} from "react-ctrl-f";

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
        p: 4,
        overflow: 'scroll'
    };
    return (
        <Modal
            open={isModalOpen}
            onClose={onClose}>
            <Box sx={style}>
                <SearchProvider>
                    <input
                        style={{width: 200, marginRight: '12px', height: '24px'}}
                        value={searchValue}
                        onChange={onSearchChange}
                    />
                    <button
                        style={{height: '28px'}}
                        title='Up'
                        onClick={() => onPrev(100)}
                    >
                        Prev
                    </button>
                    <span style={{padding: '0px 12px'}}>
          {activeCount}/{totalCount}
        </span>
                    <button
                        style={{height: '28px'}}
                        title='Down'
                        onClick={() => onNext(100)}
                    >
                        Next
                    </button>
                </SearchProvider>
                <Typography variant={"h6"} component={"h2"}>
                    {song.name}
                </Typography>
                <Typography className={'whitespace-pre-line'} id="modal-modal-description" sx={{mt: 2}}>
                    <MatchText id={'match-1'}>{song.content}</MatchText>
                </Typography>
            </Box>
        </Modal>
    )
}

export default SongLyricsModal;