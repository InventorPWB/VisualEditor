import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { getIconFromFileType } from "../util/fileType";

interface EditorTabProps {
  text: string;
  active: boolean;
  setTab: React.Dispatch<number>;
  index: number;
  updateTab: (index: number, newName: string) => void;
  deleteTab: (index: number) => void;
}

function EditorTab({ text, active, setTab, index, updateTab, deleteTab }: EditorTabProps) {
  const [iconUrl, setIconUrl] = useState<string>('');
  const [editingTab, setEditingTab] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState<string>(text);
  const tabInputRef = useRef<HTMLInputElement | null>(null);
  const [hovered, setHovered] = useState<boolean>(false);

  useEffect(() => {
    setIconUrl(getIconFromFileType({ fileName: text }));
  }, [text]);

  const selectTab = () => {
    setTab(index);
  };

  const editTab = () => {
    setEditingTab(true);
    setTabValue(text);  // Reset tabValue to the current text when starting to edit
    window.addEventListener('click', handleClickOutside);
  };  

  const handleClickOutside = (event: MouseEvent) => {
    if (tabInputRef.current && !tabInputRef.current.contains(event.target as Node)) {
      stopEditingTab();
    }
  };

  const stopEditingTab = () => {
    if (tabValue === '') {
      setEditingTab(false);
      setTabValue(text);
      return;
    }
    setEditingTab(false);
    updateTab(index, tabValue); // Ensure tabValue is the current input value
    window.removeEventListener('click', handleClickOutside);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTabValue(event.target.value); // Update the state with the input value
  };

  const deleteThisTab = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    deleteTab(index);
  }

  return (
    <div className={`${active ? 'bg-[#1e1e1e]' : 'bg-[#191919] hover:bg-[#1c1c1c]'} rounded-t-lg`}>
      <button 
        className="h-12 pl-4 pr-2 flex items-center gap-x-2 text-sm"
        onClick={selectTab}
        onDoubleClick={editTab}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {
          editingTab ?
            <form
              onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                stopEditingTab();
              }}
            >
              <input
                autoFocus
                type="text"
                ref={tabInputRef}
                value={tabValue}
                onChange={handleInputChange}
                onBlur={stopEditingTab}
                className="focus-within:outline outline-1 outline-sky-600 rounded p-1"
              />
            </form>
          :
            <div className="flex items-center gap-x-2">
              <img 
                src={iconUrl} 
                alt="Filetype Icon" 
                className='w-4 h-4'
              />
              <p>{text}</p>
              <span 
                className="material-symbols-rounded w-8 h-8 !text-lg flex items-center justify-center text-neutral-400 hover:bg-[#ffffff10] rounded"
                onClick={deleteThisTab}
              >{hovered && 'close'}</span>
            </div>
        }
      </button>
    </div>
    
  );
}

export default EditorTab;
