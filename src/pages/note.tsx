'use client'

import {
    Badge,
    Box,
    Button,
    HStack,
    IconButton,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Textarea,
    useColorModeValue
} from "@chakra-ui/react";
import React, {useEffect} from "react";
import {DeleteIcon, RepeatIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";
import constants from "../constants/constants.ts";
import axios from "axios";

interface Note {
    modified_at: string,
    id: string,
    title: string,
    content: string,
    type: string
}

const NotePage = () => {
    // const dummyNote: Note[] = [
    //     {
    //         modified_at: '29 February 2024',
    //         id: '1',
    //         title: 'Text Title 1',
    //         content: 'This is the text content',
    //         type: 'Study'
    //     },
    //     {
    //         modified_at: '29 February 2024',
    //         id: '2',
    //         title: 'Text Title 2',
    //         content: 'This is the text content',
    //         type: 'Journal'
    //     },
    //     {
    //         modified_at: '29 February 2024',
    //         id: '3',
    //         title: 'Text Title 3',
    //         content: 'This is the text content',
    //         type: 'Other'
    //     }
    // ]

    const [notes, setNotes] = React.useState<Note[]>([])

    const navigate = useNavigate()

    const baseURL = constants.BACKEND_URL

    const createNote = async () => {
        try {
            const response = await axios.post(`${baseURL}/api/v1/note`, {
                title: `New Note`,
                content: 'Enter your note here',
                type: 'Default'
            }, {withCredentials: true})

            if (response.status === 200) {
                retrieveNotes()
            }
        } catch (err) {
            console.log('Error: ', err)
            throw err
        }
    }

    const retrieveNotes = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/v1/note?offset=1&size=100`, {withCredentials: true})


            if (response.status === 200) {
                const retrievedNotes = response.data.data.notes
                for (let i = 0; i < retrievedNotes.length; i++) {
                    retrievedNotes[i].modified_at = new Date(retrievedNotes[i].modified_at).toLocaleString('en-ID', {
                        hour: 'numeric',
                        minute: 'numeric',
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                        timeZone: 'Asia/Jakarta'
                    })
                }
                setNotes(retrievedNotes)
            }

        } catch (err) {
            setNotes([])
        }
    }

    React.useEffect(() => {
        const isLoggedIn = document.cookie.includes('SessionID')
        if (!isLoggedIn) {
            navigate('/login')
        }

        retrieveNotes()
    }, [])

    return (
        <Tabs
            overflow={'auto'}
            rounded={'lg'}
            orientation={'vertical'}
            colorScheme={useColorModeValue('white', 'gray.900')}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}>
            <TabList
                flex="25%"
                minH={'90vh'}
                maxH={'90vh'}
                overflowY={'scroll'}
                borderRight={'1px'}
                borderRightColor={useColorModeValue('gray.400', 'gray.600')}>
                <HStack
                    px={4}
                    py={2}
                    justifyContent={'space-between'}
                    borderBottom={'1px'}
                    borderBottomColor={useColorModeValue('gray.200', 'gray.700')}>
                    <Text
                        fontSize={'lg'}
                        flexShrink={0}
                        justifyContent={'left'}>
                        Notes
                    </Text>
                    <IconButton
                        onClick={retrieveNotes}
                        aria-label={'reload'}
                        bgColor={'blue.300'}
                        icon={<RepeatIcon/>}
                        size={'sm'}/>
                </HStack>
                {notes.map((note) => (
                    <NoteSelect
                        key={note.id}
                        noteTitle={note.title}
                        noteContent={note.content}
                        noteType={note.type}
                    />
                ))}
                <Button rounded={0} flexShrink={0} onClick={async () => await createNote()}>Add New Note</Button>
            </TabList>
            {/*<NoteSelect/>*/}
            <TabPanels flex="75%">
                {notes.map((note) => (
                    <NotePreview
                        key={note.id}
                        modifiedAt={note.modified_at}
                        noteID={note.id}
                        noteTitle={note.title}
                        noteContent={note.content}
                        noteType={note.type}/>
                ))}
            </TabPanels>
        </Tabs>
    )
}

interface NoteSelectProps {
    noteTitle: string,
    noteContent: string,
    noteType: string
}

const NoteSelect = ({noteTitle, noteContent, noteType}: NoteSelectProps) => {
    return (
        <Tab
            px={4}
            py={2}
            flexShrink={0}
            justifyContent={'left'}
            borderBottom={'1px'}
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            _selected={{
                borderRight: '2px',
                borderRightColor: 'blue.200'
            }}>
            <Stack width={'100%'}>
                <HStack justifyContent={'space-between'}>
                    <Text fontSize={'xl'} align={'left'}>{noteTitle}</Text>
                    <Badge variant='outline' textColor={'blue.300'} borderColor={'blue.300'}>
                        {noteType}
                    </Badge>
                </HStack>
                <Text fontSize={'md'} textColor={useColorModeValue('gray.500', 'gray.500')}
                      align={'left'}>{noteContent}</Text>
            </Stack>
        </Tab>
    )
}

interface NotePreviewProps {
    modifiedAt: string,
    noteID: string,
    noteTitle: string,
    noteContent: string,
    noteType: string
}

const NotePreview = ({modifiedAt, noteID, noteTitle, noteContent, noteType}: NotePreviewProps) => {
    const [type, setType] = React.useState(noteType)
    const [title, setTitle] = React.useState(noteTitle)
    const [content, setContent] = React.useState(noteContent)

    const [isChanged, setIsChanged] = React.useState(false)

    const handleTypeInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setIsChanged(true)
        setType(e.target.value)
    }
    const handleTitleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setIsChanged(true)
        setTitle(e.target.value)
    }
    const handleContentInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setIsChanged(true)
        setContent(e.target.value)
    }

    const baseURL = constants.BACKEND_URL

    const updateNote = async () => {
        try {
            const response = await axios.patch(`${baseURL}/api/v1/note`, {
                id: noteID,
                title: title,
                content: content,
                type: type
            }, {withCredentials: true})

            if (response.status === 200) {
                console.log('updated')
            }

            return response.data
        } catch (err) {
            console.log('Error: ', err)
            throw err
        }
    }

    const deleteNote = async () => {
        try {
            const response = await axios.delete(`${baseURL}/api/v1/note/${noteID}`, {withCredentials: true})

            if (response.status === 200) {
                console.log('deleted')
            }
        } catch (err) {
            console.log('Error: ', err)
            throw err
        }
    }

    useEffect(() => {
        if (isChanged) {
            setIsChanged(false)
            updateNote()
        }
    }, [isChanged, updateNote])

    return (
        <TabPanel height={'100%'}>
            <Stack height={'100%'}>
                <HStack>
                    <Textarea
                        flex={14}
                        pb={0}
                        value={title}
                        onChange={handleTitleInputChange}
                        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                            if (e.key == 'Enter') e.preventDefault()
                        }}
                        placeholder={'Note Title'}
                        focusBorderColor={'blue.200'}
                        resize={'none'}
                        variant={'flushed'}
                        fontSize={'4xl'}
                        textColor={useColorModeValue('black', 'gray.100')}/>
                    <Box flex={1}>
                        <IconButton
                            onClick={deleteNote}
                            bgColor={'blue.300'}
                            color={'white'}
                            aria-label={'delete-note'}
                            size={'lg'}
                            icon={<DeleteIcon/>}/>
                    </Box>
                </HStack>
                <HStack>
                    <Textarea
                        flex={2}
                        value={`Last modified: ${modifiedAt}`}
                        placeholder={'Note Type'}
                        resize={'none'}
                        variant={'unstyled'}
                        py={0}
                        size={'lg'}
                        width={'auto'}
                        minH={'32px'}
                        height={'32px'}
                        whiteSpace={'nowrap'}
                        textAlign={'justify'}
                        textColor={useColorModeValue('gray.600', 'gray.400')} isDisabled/>
                    <Textarea
                        flex={3}
                        value={type}
                        onChange={handleTypeInputChange}
                        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                            if (e.key == 'Enter') e.preventDefault()
                        }}
                        placeholder={'Note Type'}
                        resize={'none'}
                        variant={'unstyled'}
                        py={0}
                        size={'lg'}
                        minH={'32px'}
                        height={'32px'}
                        textAlign={'justify'}
                        textColor={'blue.300'}/>
                </HStack>
                <Box flex={1}>
                    <Textarea
                        pt={0}
                        value={content}
                        onChange={handleContentInputChange}
                        minH={'100%'}
                        // maxH={'90vh'}
                        overflowY={'scroll'}
                        placeholder={'Note Content'}
                        resize={'none'}
                        variant={'unstyled'}
                        fontSize={'lg'}
                        textColor={useColorModeValue('black', 'gray.100')}/>
                </Box>
            </Stack>
        </TabPanel>
    )
}

export default NotePage