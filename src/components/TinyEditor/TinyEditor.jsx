import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

const TinyEditor = ({ value, onChange, className }) => {
  const editorRef = useRef(null);

  return (
    <div className={className}>
      <Editor
        apiKey="n0jtgeijq4yu4kzzduyh0cwfq3k5k4paurk588ov3p877y7e"
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={value}
        onEditorChange={onChange}
        init={{
          height: 400,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </div>
  );
};

export default TinyEditor;
