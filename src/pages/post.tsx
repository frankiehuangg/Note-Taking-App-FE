'use client'

import {Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea, useColorModeValue} from "@chakra-ui/react";
import React from "react";

interface Note {
    id: string,
    title: string,
    content: string
}

const NotePage = () => {
    const dummyText: Note[] = [
        {id: '1', title: 'Text Title 1', content: 'This is the text content'},
        {id: '2', title: 'Text Title 2', content: 'This is the text content'},
        {id: '3', title: 'Text Title 3', content: 'This is the text content'}
    ]

    return (
        <Tabs
            rounded={'lg'}
            orientation={'vertical'}
            colorScheme={useColorModeValue('white', 'gray.900')}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}>
            <TabList
                flex="25%"
                borderRight={'1px'}
                borderRightColor={useColorModeValue('gray.400', 'gray.600')}>
                {dummyText.map((text) => (
                    <NoteSelect key={text.id} textTitle={text.title} textContent={text.content}/>
                ))}
            </TabList>
            {/*<NoteSelect/>*/}
            <TabPanels flex="75%">
                {dummyText.map((text) => (
                    <NotePreview key={text.id} textTitle={text.title} textContent={text.content}/>
                ))}
            </TabPanels>
        </Tabs>
    )
}

interface NoteProps {
    textTitle: string,
    textContent: string
}

const NoteSelect = ({textTitle, textContent}: NoteProps) => {
    return (
        <Tab
            px={4}
            py={2}
            justifyContent={'left'}
            borderBottom={'1px'}
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            _selected={{
                borderRight: '2px',
                borderRightColor: 'blue.200'
            }}>
            <Stack>
                <Text fontSize={'xl'} align={'left'}>{textTitle}</Text>
                <Text fontSize={'md'} textColor={useColorModeValue('gray.500', 'gray.500')}
                      align={'left'}>{textContent}</Text>
            </Stack>
        </Tab>
    )
}

const NotePreview = ({textTitle, textContent}: NoteProps) => {
    const [title, setTitle] = React.useState(textTitle)
    const [content, setContent] = React.useState(textContent)
    const handleTitleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setTitle(e.target.value)
    const handleContentInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)

    return (
        <TabPanel>
            <Stack>
                <Textarea
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
                />
                <Textarea
                    value={content}
                    onChange={handleContentInputChange}
                    minH={'80vh'}
                    placeholder={'Note Content'}
                    resize={'none'}
                    variant={'unstyled'}
                    fontSize={'lg'}
                    textColor={useColorModeValue('black', 'gray.100')}/>
            </Stack>
        </TabPanel>
    )
}

export default NotePage