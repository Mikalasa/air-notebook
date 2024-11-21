import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';
import CodeTool from '@editorjs/code';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';

const EditorComponent = ({ selectedNoteId }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        if (!selectedNoteId) {
            console.warn('No selectedNoteId provided, editor not initialized.');
            return;
        }

        console.log(`Initializing Editor.js for note ID: ${selectedNoteId}`);

        // prevent reinitialization
        if (editorRef.current) {
            if (typeof editorRef.current.destroy === 'function') {
                editorRef.current.destroy();
            }
            editorRef.current = null;
        }

        const savedData = localStorage.getItem(`editorContent_${selectedNoteId}`);
        console.log(`Loaded data for note ID ${selectedNoteId}:`, savedData);

        editorRef.current = new EditorJS({
            holder: 'editorjs',
            tools: {
                header: Header,
                list: List,
                checklist: Checklist,
                code: CodeTool,
                table: Table,
                warning: {
                    class: Warning,
                    config: {
                        titlePlaceholder: 'Title',
                        messagePlaceholder: 'Message',
                    },
                },
            },
            data: savedData ? JSON.parse(savedData) : {},
            placeholder: 'Start typing your content here...',
            onChange: async () => {
                if (editorRef.current && selectedNoteId) {
                    const savedData = await editorRef.current.save();
                    localStorage.setItem(`editorContent_${selectedNoteId}`, JSON.stringify(savedData));
                    console.log(`Content autosaved to localStorage for note ${selectedNoteId}`);
                }
            },
        });

        return () => {
            if (editorRef.current && typeof editorRef.current.destroy === 'function') {
                console.log(`Destroying Editor.js instance for note ID: ${selectedNoteId}`);
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, [selectedNoteId]);

    return <div id="editorjs" style={{ minHeight: '400px' }}></div>;
};

export default EditorComponent;
