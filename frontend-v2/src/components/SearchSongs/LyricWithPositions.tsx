import React, {useState} from "react";
import {Tooltip} from "@mui/material";
import {useSelector} from "react-redux";
import {SongWord} from "../../entities/Song";
import SeeWordReferencesModal from "../ManageWordGroups/SeeWordReferencesModal";

interface LyricsWithPositionsProps {
    songWords: SongWord[][];
}

const TooltipContent: React.FC = ({word}) => (
    <div>
        <div>
            Verse {word.verse_index}, Line {word.line_index}, Word {word.word_index}
        </div>
        <div>
            Click to see references
        </div>
    </div>
)

const LyricsWithPositions: React.FC = ({songWords}: LyricsWithPositionsProps) => {
    const searchPositions = useSelector((state) => state.songs.searchPosition);
    const [wordToSeeReferences, setWordToSeeReferences] = useState<string | undefined>(undefined);
    const [isReferencesModalOpen, setIsReferencesModalOpen] = useState<boolean>(false);

    const getBackground = (line: number, word: number) => {
        if (!searchPositions) return '';
        const shouldColour = line === searchPositions.lineIndex && word === searchPositions.wordIndex;
        if (shouldColour) return 'bg-orange-400';
        return '';
    }

    const closeModal = async () => {
        await setIsReferencesModalOpen(false);
        await setWordToSeeReferences(undefined);
    }
    const _onClickSeeReferences = async (word: string) => {
        setWordToSeeReferences(word);
        setIsReferencesModalOpen(true);
    }
    return (
        <div className={'flex flex-col gap-2'}>
            {songWords.map((verse, index) => (
                <div key={`verse-${index}`} className={'flex flex-col gap-0'}>
                    {
                        verse.map((line, index) => (
                            <div key={`line-${index}`} className={'flex flex-row flex-wrap gap-1'}>
                                {
                                    line.map(word => (
                                        <span
                                            key={`Verse ${word.verse_index}, Line ${word.line_index}, Word ${word.word_index}`}>
                                            <Tooltip
                                                classes={
                                                    {'popper': 'select-none'}
                                                }
                                                title={<React.Fragment><TooltipContent word={word} /></React.Fragment>}>
                                            <span
                                                onClick={() => _onClickSeeReferences(word.bare_word)}
                                                className={`cursor-pointer hover:text-slate-400 ${getBackground(word.line_index, word.word_index)}`}>
                                                {word.appearance}
                                            </span>
                                        </Tooltip>
                                        </span>

                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            ))}
            {
                wordToSeeReferences && <SeeWordReferencesModal
                    isModalOpen={isReferencesModalOpen}
                    onClose={closeModal}
                    word={wordToSeeReferences}/>
            }
        </div>
    )
};

export default LyricsWithPositions;