import Editor, { Monaco } from "@monaco-editor/react";
import s from "./MonacoEditor.module.scss";
import { useRef, useState } from "react";
import * as monaco from "monaco-editor";
import { IconVariants } from "store/enums/enums";
import { connectionsIcons } from "assets/icons/icons";
import {
  handleCSharpCompletion,
  handleXmlCompletion,
} from "utils/monaco/completionProvider";
import { EditorSettings, editorOptions } from "utils/monaco/editorOptions";

interface MonacoEditorProps {
  themeColor: IconVariants;
}

function MonacoEditor(props: MonacoEditorProps) {
  const [settings, setSettings] = useState<EditorSettings>(editorOptions[0]);
  const [isEditorVisible, setIsEditorVisible] = useState<boolean>(false);
  const editorRef = useRef<any>(null);

  function setEditorLanguage(e: React.ChangeEvent<HTMLSelectElement>) {
    setSettings(
      editorOptions.find((x: EditorSettings) => x.path === e.target.value)!
    );
  }

  function handleEditorDidMount(
    editor: monaco.editor.IStandaloneCodeEditor,
    monacoInstance: Monaco
  ) {
    editorRef.current = editor;

    handleCSharpCompletion(monacoInstance);
    handleXmlCompletion(monacoInstance);
  }

  return (
    <div className={s.wrapper}>
      <div className={s.icon_wrapper}>
        <span
          className={`${s.icon} ${
            props.themeColor === IconVariants.Dark ? s["dark"] : s["light"]
          }`}
          style={{
            fontSize: "1.5rem",
            marginTop: "5px",
          }}
          onClick={() => setIsEditorVisible(!isEditorVisible)}
        >
          {connectionsIcons.code}
        </span>
      </div>

      {isEditorVisible ? (
        <div className={s.editor_wrapper}>
          <div className={s.editor_header}>
            <span>Code Editor</span>
            <div className={s.select_wrapper}>
              <select
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                  setEditorLanguage(event)
                }
              >
                <option value={editorOptions[0].path}>xml</option>
                <option value={editorOptions[1].path}>c#</option>
                <option value={editorOptions[2].path}>js</option>
                <option value={editorOptions[3].path}>json</option>
                <option value={editorOptions[4].path}>html</option>
              </select>
            </div>
            <div className={s.btn_wrapper}>
              <button onClick={() => setIsEditorVisible(false)}>x</button>
            </div>
          </div>
          <Editor
            onMount={handleEditorDidMount}
            theme="vs-dark"
            defaultLanguage={settings.language}
            className={s.editor}
            defaultValue={settings.value}
            path={settings.path}
          />
          <div className={s.run_btn_wrapper}>
            <button>RUN</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default MonacoEditor;
