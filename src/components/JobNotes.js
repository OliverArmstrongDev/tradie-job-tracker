import { Button, Paper } from "@mantine/core";
import RichTextEditor from "@mantine/rte";
import React, { useContext, useState } from "react";
import { IconEdit, IconDeviceFloppy, IconTrash } from "@tabler/icons";
import { useEffect } from "react";
import { MainContext } from "../contexts/MainContext";

const JobNotes = ({ noteData, isNewNote, noteKey, setShowNewNote }) => {
  const { saveNotesIntoDB, deleteNoteFromDB, state } = useContext(MainContext);

  const [noteText, setNoteText] = useState(noteData);
  const [isEditable, setIsEditable] = useState(isNewNote ? true : false);

  const handleDeleteClick = () => {
    deleteNoteFromDB(noteKey, state.clientUID);
  };

  const handleSaveEditClick = () => {
    if (isEditable) {
      if (noteText) {
        saveNotesIntoDB(
          {
            JobInfo: {
              Notes: {
                [noteKey ? noteKey : Object.keys(state.jobNotes).length + 1]:
                  noteText,
              },
            },
          },
          state.clientUID
        );
      }
    }
    setIsEditable(!isEditable);
    if (isNewNote) {
      setShowNewNote(false);
    }
  };

  useEffect(() => {
    setNoteText(noteData);
  }, [noteData]);

  return (
    <div key={noteKey}>
      <Paper my={40} shadow="sm" radius="md" p="xl">
        <Button
          onClick={handleSaveEditClick}
          leftIcon={!isEditable ? <IconEdit /> : <IconDeviceFloppy />}
          variant="white"
          color="violet"
        >
          {!isEditable ? "Edit Note" : "Save"}
        </Button>
        <Button
          onClick={handleDeleteClick}
          leftIcon={<IconTrash />}
          variant="white"
          color="violet"
        >
          Delete Note
        </Button>
        <RichTextEditor
          readOnly={!isEditable}
          controls={[
            ["bold", "italic", "underline", "link"],
            ["unorderedList", "h1", "h2", "h3"],
            ["alignLeft", "alignCenter", "alignRight"],
          ]}
          value={noteText ? noteText: ""}
          onChange={setNoteText}
        />
      </Paper>
    </div>
  );
};

export default JobNotes;
