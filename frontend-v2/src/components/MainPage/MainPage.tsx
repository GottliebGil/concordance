import React from "react";
import {useDispatch} from "react-redux";
import {setCurrentPage} from "../../store/appSlice";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";

const MainPage: React.FC = () => {
    const dispatch = useDispatch();

    const _onPageSelected = async (pageNumber: number) => await dispatch(setCurrentPage(pageNumber));

    const pages = [
        {
            title: 'Upload Song',
            overhead: 'Bring it on!',
            action: 'GO'
        },
        {
            title: 'Search for songs',
            overhead: 'Seek and you shall find',
            action: 'GO'
        },
        {
            title: 'Manage groups',
            overhead: 'Come together, right now',
            action: 'GO'
        },
        {
            title: 'Word Statistics',
            overhead: 'Every word counts',
            action: 'GO'
        },
    ]
    return (
        <div>
            <div>Select which action you'd like to take:</div>
            <div className={'grid grid-cols-2 grid-rows-2 gap-4'}>
                {
                    pages.map((page, index) => (
                        <Card variant={'outlined'} sx={{width: 275}}>
                            <CardContent>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    {page.overhead}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {page.title}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => _onPageSelected(index)}>Go</Button>
                            </CardActions>
                        </Card>
                    ))
                }
            </div>

        </div>
    )
}
export default MainPage;
