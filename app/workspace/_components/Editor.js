"use client";
import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import EditorExtension from "./EditorExtension";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Document from "@tiptap/extension-document";
import ListItem from "@tiptap/extension-list-item";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function Editor({ fileId }) {
  const notes = useQuery(api.notes.GetNotes, {
    fileId: fileId,
  });
  console.log(notes);

  const editor = useEditor({
    extensions: [
      Paragraph,
      Document,
      Text,
      Dropcursor,
      Image,
      Underline,
      BulletList,
      ListItem,
      StarterKit,
      Highlight.configure({ multicolor: true }),
      Placeholder.configure({
        placeholder: "Start taking your notes here...",
      }),

      useEffect(() => {
        editor && editor.commands.setContent(notes);
      }, [notes]),
    ],
    editorProps: {
      attributes: {
        class: cn(
          "focus:outline-none h-screen p-5 prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc"
        ),
      },
    },
  });
  return (
    <div>
      <EditorExtension editor={editor} />
      <div className="overflow-scroll h-[88vh]">
        <EditorContent editor={editor} />;
      </div>
    </div>
  );
}

export default Editor;
