import {useState, useRef, useEffect} from "react";
import {Button, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions} from "@mui/material";

const pages = {
    0: {
        title: 'Welcome!',
        content: `Hi! Nice to see you here!
                If you would like a quick guide about this game - follow this tutorial. 
                The <a href="https://github.com/illymarev/maze-game" target="_blank" style="color: blue">source code</a> 
                is available in the 
                <a href="https://github.com/illymarev" target="_blank" style="color: blue">author's github</a>.`,
    },
    1: {
        title: 'Starting the game',
        content: `Click the green "generate" button on top of the screen to start the generation process. 
        Once the generation is finished - you can either start solving the maze or let it be solved automatically`,
    },
    2: {
        title: 'Solving the maze by yourself',
        content: `To solve the maze by yourself, click on the maze cell. 
        You can also press & hold your left mouse button and drag over maze cells. Remember to always start from the 
        cell that is marked as "start"!`,
    },
    3: {
        title: 'Solving the maze automatically',
        content: `Click the blue "solve" button on top of the screen to start the automatic solving process. Once the 
        solving algorithm is finished, the selected path will be highlighted with the yellow color.`,
    },
    4: {
        title: 'Customizing algorithms',
        content: `There are multiple generation & solving algorithms available. You can also select the preferred 
        visualization speed. If you start the visualization and realize that it's too slow for you - feel free to
        stop it and select a higher speed.`,
    },
    5: {
        title: "That's it! You are ready!",
        content: `This is the end of the tutorial, thank you for reading the rules, hope they help! Thanks again for 
        visiting and have fun!!`,
    }
}

const WelcomeModal = () => {
    const [open, setOpen] = useState(true);
    const [pageNumber, setPageNumber] = useState(0)

    const isNextPageAvailable = pageNumber < 5
    const isPreviousPageAvailable = pageNumber > 0

    const handleClose = () => {
        setOpen(false);
    };

    const changePage = addend => {
        setPageNumber(oldPageNumber => oldPageNumber + addend)
    }

    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (open) {
            const {current: descriptionElement} = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title" dangerouslySetInnerHTML={{__html: pages[pageNumber].title}}>
                </DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                        height={'75px'}
                    >
                        <div dangerouslySetInnerHTML={{__html: pages[pageNumber].content}}/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        isPreviousPageAvailable ?
                            <Button onClick={() => changePage(-1)}>Previous</Button> :
                            null
                    }
                    {
                        isNextPageAvailable ?
                            <Button onClick={() => changePage(1)}>Next</Button> :
                            <Button onClick={handleClose}>Got It!</Button>
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default WelcomeModal;