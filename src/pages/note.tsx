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
                await retrieveNotes()
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
    })

    return (
        <Tabs
            overflow={'auto'}
            rounded={'lg'}
            orientation={window.innerWidth < 992 ? 'horizontal' : 'vertical'}
            colorScheme={useColorModeValue('white', 'gray.900')}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'} isLazy>
            <HStack
                px={4}
                py={2}
                display={{base: 'flex', lg: 'none'}}
                justifyContent={'space-between'}
                borderBottom={'1px'}
                borderBottomColor={useColorModeValue('gray.200', 'gray.700')}>
                <Text
                    fontSize={'lg'}
                    flexShrink={0}
                    justifyContent={'left'}>
                    Notes
                </Text>
                <Button
                    display={{base: 'flex', lg: 'none'}}
                    rounded={0}
                    flexShrink={0}
                    onClick={async () => await createNote()}>
                    Add New Note
                </Button>
                <IconButton
                    onClick={retrieveNotes}
                    aria-label={'reload'}
                    bgColor={'blue.300'}
                    icon={<RepeatIcon/>}
                    size={'sm'}/>
            </HStack>
            <TabList
                flex={{base: '100%', lg: '25%'}}
                minH={{base: '10vh', lg: '80vh'}}
                maxH={{base: '10vh', lg: '100vh'}}
                overflowX={{base: 'scroll', lg: 'clip'}}
                overflowY={{base: 'clip', lg: 'scroll'}}>
                <HStack
                    px={4}
                    py={2}
                    display={{base: 'none', lg: 'flex'}}
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
                <Button
                    display={{base: 'none', lg: 'flex'}}
                    rounded={0}
                    flexShrink={0}
                    onClick={async () => await createNote()}>
                    Add New Note
                </Button>
            </TabList>
            <TabPanels
                flex={{base: '100%', lg: '75%'}}
                borderLeft={{base: '0px', lg: '1px'}}
                borderLeftColor={useColorModeValue('gray.400', 'gray.600')}>
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
                border: '2px',
                borderColor: 'blue.200'
            }}>
            <Stack width={'100%'}>
                <Text display={{base: 'flex', lg: 'none'}} fontSize={'xl'} align={'left'}>{noteTitle}</Text>
                <Badge display={{base: 'flex', lg: 'none'}} variant='outline' textColor={'blue.300'}
                       borderColor={'blue.300'}>
                    {noteType}
                </Badge>
                <HStack display={{base: 'none', lg: 'flex'}} justifyContent={'space-between'}>
                    <Text fontSize={'xl'} align={'left'}>{noteTitle}</Text>
                    <Badge variant='outline' textColor={'blue.300'} borderColor={'blue.300'}>
                        {noteType}
                    </Badge>
                </HStack>
                <Text
                    display={{base: 'none', lg: 'flex'}}
                    fontSize={'md'}
                    textColor={useColorModeValue('gray.500', 'gray.500')}
                    align={'left'}>
                    {noteContent}
                </Text>
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

            updateNote()
        }
    }, [baseURL, content, isChanged, noteID, title, type])

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
                        minH={'80vh'}
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