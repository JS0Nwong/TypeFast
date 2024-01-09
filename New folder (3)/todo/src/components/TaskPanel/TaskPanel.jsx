import { useEffect, useState } from 'react'
import {
    Drawer,
    Box,
    Typography,
    Divider,
    IconButton,
    Button,
    Chip,
    Stack,
    TextField
} from "@mui/material"
import { Cross1Icon } from '@radix-ui/react-icons'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSearchParams, useParams } from 'react-router-dom';

import {
    doc,
    onSnapshot
} from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import sanitizeHtml from "sanitize-html";


import Editor from '../RichTextEditor/Editor';
import useFirebaseHooks from "../../utils/firebaseHooks"

export default function TaskPanel({
    open,
    onClose,
    task,
    labels,
    description,
    dateAdded,
    taskId,
    taskColumn,
    handleTaskUpdate
}) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [loadTask, setTask] = useState(null)
    const [comment, setComment] = useState('')
    const [descriptionUpdate, setDescriptionUpdate] = useState('')
    const [openEditDescription, setOpenEditDescription] = useState(false)
    const [openRich, setOpenRich] = useState(false)
    const { id } = useParams();
    const {
        currentUser: { uid },
    } = getAuth();

    const setPostContent = (e) => {
        setComment(e)
    }
    const { updateBoard } = useFirebaseHooks()

    const handleDescriptionUpdate = () => {
        descriptionUpdate.trim() !== "" ? handleTaskUpdate(task, task, descriptionUpdate, searchParams.get('column')) : <></>
    }

    const handleOpenDescription = () => {
        setOpenEditDescription(!openEditDescription)
    }

    const sanitize = sanitizeHtml(description, {
        allowedTags: [
            "footer", "header", "h1", "h2", "h3", "h4",
            "h5", "h6", "blockquote", "dd",
            "hr", "li", "main", "ol", "p", "pre",
            "ul", "a", "abbr", "b", "br", "cite", "code", "data", "dfn",
            "em", "i", "mark", "q", "s", "samp",
            "small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr", "caption",
            "col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr"
        ],
    })

    useEffect(() => {
        if (taskId && taskColumn) {
            const docRef = doc(db, `users/${uid}/boardsData/${id}`)
            onSnapshot(docRef, (doc) => {
                const { columns } = doc.data()
                setTask(columns[searchParams.get('column')].tasks.find((task) => task.id == searchParams.get('task')))
            })
        }
    }, [])

    return (
        <>
            <Drawer
                anchor='right'
                open={searchParams.has('task') || searchParams.has('column') === true ? true : open}
                onClose={onClose}
                sx={{
                    ".MuiDrawer-paper": {
                        background: 'rgb(23 23 23)',
                        borderTopLeftRadius: '10px',
                        borderBottomLeftRadius: "10px",
                        width: { xs: "100%", sm: "100%", md: "1200px" },
                        maxWidth: "100%",
                        borderLeft: "1px solid rgb(64 64 64)",
                        height: "100%",
                    }
                }}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: "column",
                    pl: 5,
                    pr: 5,
                    pt: 5,
                    pb: 3,
                        backgroundColor: "rgb(18 18 18)"
                }}>               
                
                 {/* TASK PANEL HEADER */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Box sx={{
                            color: ' rgb(245 245 245)',
                            maxWidth: "100%",
                            display: "flex",
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: "flex-end",
                            
                        }}>
                            <Typography
                                variant='h6'
                                fontWeight="600"
                                fontFamily="Raleway"
                                sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "5",
                                    WebkitBoxOrient: "vertical",
                                    width: "700px",
                                    fontSize: '16px'
                                }}
                            >{task !== undefined ? task : loadTask.task}</Typography>
                            <Button variant='text'
                                size="small"
                                sx={{
                                    m: 0,
                                    p: 0,
                                    color: "rgb(115 115 115)",
                                    fontFamily: "Raleway",
                                    fontWeight: "600",
                                    "&:hover": {
                                        background: "rgba(82, 82, 82, 0.2)",
                                    }
                                }}>
                                Edit Title
                            </Button>
                            <IconButton
                                aria-label="close"
                                onClick={onClose}
                                sx={{
                                    position: 'absolute',
                                    right: 10,
                                    top: 10,
                                    color: 'rgb(229 229 229)',
                                }}
                            >
                                <Cross1Icon />
                            </IconButton>
                        </Box>
                        <Typography
                            fontFamily="Raleway"
                            fontWeight="600"
                            sx={{
                                color: "rgba(115, 115, 115, 1)",
                                mt: 1
                            }}
                        >Added on: {dateAdded}</Typography>
                    </Box>

                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            mt: 1
                        }}
                    >
                        {labels.map((label, index) => (
                            <Chip
                                key={index}
                                label={label.label}
                                size='small'
                                sx={{
                                    fontSize: "12px",
                                    border: `1px solid rgb(${label.color})`,
                                    backgroundColor: `rgba(${label.color.replace(/['"]+/g, '')}, 1)`,
                                    width: "min-content",
                                    position: "relative",
                                    "&:hover": {
                                        backgroundColor: `rgba(${label.color.replace(/['"]+/g, '')}, 1)`,
                                    },
                                }}
                            />
                        ))}
                    </Stack>
                </Box>

                <Divider sx={{ background: "rgb(82 82 82)" }} />

                {/* TASK PANEL DESCRIPTION AND COMMENTS */}
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    position: 'relative',
                    height: "100%",
                }}>
                    <Box sx={{
                        p: 5,
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        maxHeight: "100%",
                        height: "100%",
                    }}>
                        <Box>
                            {openEditDescription === false ?
                                //check if the description is an HTML string if it is, set inner HTML 
                                //else display the contents normally
                                description[0] === "<" ?
                                    <Typography
                                        fontFamily="Raleway"
                                        fontWeight="500"
                                        dangerouslySetInnerHTML={{
                                            __html: sanitize
                                        }}
                                        sx={{
                                            color: "rgba(163, 163, 163, 1)"
                                        }}>
                                    </Typography>
                                    :
                                    <Typography
                                        fontFamily="Raleway"
                                        fontWeight="500"
                                        sx={{
                                            color: "rgba(163, 163, 163, 1)"
                                        }}>
                                        {description === "" ? "No description provided" : description}
                                    </Typography>

                                :

                                <Box>
                                    <Editor
                                        placeholder={'Edit your description'}
                                        editorHtmlChange={(e) => setDescriptionUpdate(e)}
                                        styles={"snow"}
                                    />
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        width: '100%',
                                        justifyContent: "flex-end",
                                        mt: 2,
                                    }}>
                                        <Button 
                                            variant='contained' 
                                            sx={{ mr: 1 }} 
                                            onClick={() => setOpenEditDescription(!openEditDescription)}
                                        >Cancel</Button>
                                        <Button
                                            variant='contained'
                                            disabled={descriptionUpdate.trim() !== "" ? false : true}
                                            sx={{
                                                color: 'rgb(220 220 220)',
                                                background: "rgba(56, 142, 60, 1)",
                                                width: "max-content",
                                                justifyContent: "flex-start",
                                                "&.MuiButton-outlined": {
                                                    border: "1px solid rgb(64 64 64)",
                                                },
                                                "&:hover": {
                                                    backgroundColor: "rgba(56, 142, 60, 1)"
                                                },
                                                "&.Mui-disabled": {
                                                    backgroundColor: "rgba(56, 142, 60, 0.5)",
                                                    cursor: "not-allowed"
                                                }
                                            }}
                                            onClick={() => handleDescriptionUpdate()}
                                        >Update</Button>
                                    </Box>
                                </Box>}
                        </Box>
                        {/* Comments Editor */}
                        <Box sx={{ 
                            mt: 5,
                            width: "100%",                   
                            maxWidth: "889px",
                            maxHeight: "100%",
                            position: "relative"
                        }}>
                            {openRich === true ? <Editor
                                placeholder={'Add a comment'}
                                editorHtmlChange={(e) => setPostContent(e)}
                                styles={"snow"}
                            /> :
                                <TextField
                                    inputProps={{
                                        style: {
                                            fontFamily: "Poppins",
                                            color: "#DDD"
                                        }
                                    }}
                                    placeholder='Add a comment'
                                    multiline
                                    rows={9}
                                    sx={{
                                        border: '1px solid rgb(82 82 82)',
                                        backgroundColor: 'rgb(30 30 30)',
                                        width: '100%',
                                        borderRadius: "5px",
                                        resize: 'vertical',
                                        maxHeight: ' 530px',
                                        maxWidth: '100%',
                                        color: "white",
                                        "& .MuiInputBase-root.MuiOutlinedInput-root ::placeholder": {
                                            color: 'rgb(182, 182, 182)',
                                            fontStyle: "italic"
                                        },
                                        "&.MuiTextField-root": {
                                            '&:hover fieldset': {
                                                borderColor: 'rgb(163 163 163)',
                                            },
                                            ".Mui-focused fieldset": {
                                                borderColor: 'rgb(212 212 212)',
                                            },
                                        },
                                
                                    }}
                                />}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: "flex-start",
                                mt: 2,
                            }}>
                            <Button 
                                variant='contained' 
                                sx={{ width: '25%', m: 0, p: 0, } } 
                                onClick={() => setOpenRich(!openRich)}
                            >{openRich ? "Quick Comment" : 'Advance Comment'}</Button>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: "flex-end",
                            }}>
                                <Button variant='contained' sx={{ mr: 1 }}>Cancel</Button>
                                <Button
                                    variant='contained'
                                    disabled={comment.trim() !== "" ? false : true}
                                    sx={{
                                        color: 'rgb(220 220 220)',
                                        background: "rgba(56, 142, 60, 1)",
                                        width: "max-content",
                                        justifyContent: "flex-start",
                                        "&.MuiButton-outlined": {
                                            border: "1px solid rgb(64 64 64)",
                                        },
                                        "&:hover": {
                                            backgroundColor: "rgba(56, 142, 60, 1)"
                                        },
                                        "&.Mui-disabled": {
                                            backgroundColor: "rgba(56, 142, 60, 0.5)",
                                            cursor: "not-allowed"
                                        }
                                    }}>Comment</Button>
                            </Box>
                        </Box>
                    </Box>

                    <Divider orientation='vertical' sx={{ background: "rgb(82 82 82)" }} />
                    <Box sx={{ p: 5, display: 'flex', flexDirection: 'column' }}>
                        <Button
                            disableRipple
                            variant='text'
                            startIcon={<EditIcon />}
                            sx={{
                                textTransform: 'none',
                                color: 'rgba(255, 255, 255, 0.4)',
                                "&.MuiButton-outlined": {
                                    border: "1px solid rgb(64 64 64)",
                                },
                                width: "max-content",
                                justifyContent: "flex-start",
                                "&:hover": {
                                    backgroundColor: "rgb(34 34 34)"
                                }
                            }}
                            onClick={() => handleOpenDescription()}
                        >
                            Edit Description
                        </Button>
                        <Button
                            disableRipple
                            variant='text'
                            startIcon={<DeleteIcon />}
                            sx={{
                                textTransform: 'none',
                                color: 'rgb(220 38 38)',
                                width: "max-content",
                                justifyContent: "flex-start",
                                "&.MuiButton-outlined": {
                                    border: "1px solid rgb(64 64 64)",
                                },
                                "&:hover": {
                                    backgroundColor: "rgba(220, 38, 38, 0.3)"
                                }
                            }}
                        >
                            Delete Item
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </>
    )
}
