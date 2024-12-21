"use client";
import { api } from "@/convex/_generated/api";
import { useAction, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Sparkles,
  Table,
  Underline,
} from "lucide-react";
import React from "react";
import { chatSession } from "@/config/AiModel";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

function EditorExtension({ editor }) {
  const { fileId } = useParams();
  console.log(fileId);
  const SearchAi = useAction(api.myAction.search);
  const {user} = useUser()
  const saveNotes = useMutation(api.notes.AddNote)

  const onAiClick = async () => {
    try {
      const selectedText = editor.state.doc.textBetween(
        editor.state.selection.from,
        editor.state.selection.to,
        " "
      );
      console.log(selectedText);

      const result = await SearchAi({
        query: selectedText,
        fileId: fileId,
      });

      const UnformattedAns = JSON.parse(result);
      let AllUnformattedAns = "";
      UnformattedAns &&
        UnformattedAns.forEach((item) => {
          AllUnformattedAns += item.pageContent;
        });
      const PROMPT =
        "For question:" +
        selectedText +
        "and with the given content as answer," +
        "please give appropiate answer in HTML format. The answer content is :" +
        AllUnformattedAns;
      const AiModelResult = await chatSession.sendMessage(PROMPT);
      console.log(AiModelResult.response.text());
      const FinalAns = AiModelResult.response
        .text()
        .replace("```html", "")
        .replace("```", "")
        .replace("Answer:", "");
      const AllText = editor.getHTML();
      editor.commands.setContent(
        AllText + "<p><strong> Answer:<strong>" + FinalAns + "<p>"
      );
      saveNotes({
        notes:editor.getHTML(),
        fileId:fileId,
        createdBy:user?.primaryEmailAddress.emailAddress
      })
      toast.success("Successfully generated your answer...");
    } catch (error) {
      toast.error("Failed to generate answer");
      console.log(error);
    }
  };
  return (
    editor && (
      <div className="control-group p-4">
        <div className="button-group flex gap-3">
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className="hover:text-blue-500"
          >
            <Heading1 className="h-8 w-8" />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className="hover:text-blue-500"
          >
            <Heading2 className="h-8 w-8" />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className="hover:text-blue-500"
          >
            <Heading3 className="h-8 w-8" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className="hover:text-blue-500"
          >
            <Bold />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className="hover:text-blue-500"
          >
            <Italic />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className="hover:text-blue-500"
          >
            <Underline />
          </button>
          {/* <button
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
            }
          >
            <Table/>
          </button> */}
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className="hover:text-blue-500"
          >
            <Code />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className="hover:text-blue-500"
          >
            <Highlighter />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className="hover:text-blue-500"
          >
            <List />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className="hover:text-blue-500"
          >
            <ListOrdered />
          </button>
          <button onClick={() => onAiClick()} className="hover:text-blue-500">
            <Sparkles />
          </button>
        </div>
      </div>
    )
  );
}

export default EditorExtension;
