import { useState } from 'react';
import EditorTab from './editorTab';
import { getFileExtension } from '../util/fileType';
import NewTabInput from './newTabInput';
import EditorElement from './editorElement';

export default function EditorComponent() {

  const [tabs, setTabs] = useState([
    { text: 'script.js', value: '', saved: false },
    { text: 'styles.css', value: '', saved: false },
    { text: 'index.html', value: '', saved: false },
  ]);

  const [selectedTab, setSelectedTab] = useState(0);
  const [creatingNewTab, setCreatingNewTab] = useState(false);

  const editorValue = tabs[selectedTab]?.value || '';
  const editorLanguage = tabs[selectedTab] ? getFileExtension({ fileName: tabs[selectedTab].text }) : 'plaintext';

  const handleEditorChange = (value: string | undefined) => {
    const updatedTabs = [...tabs];
    if (updatedTabs[selectedTab]) {
      updatedTabs[selectedTab].value = value || '';
      setTabs(updatedTabs);
    }
  };

  const updateTabName = (index: number, newName: string) => {
    const updatedTabs = [...tabs];
    updatedTabs[index].text = newName;
    setTabs(updatedTabs);
  };

  const deleteTab = (index: number) => {
    const updatedTabs = [...tabs];
    updatedTabs.splice(index, 1);
    setTabs(updatedTabs);

    setSelectedTab((prevSelectedTab) => {
      if (updatedTabs.length === 0) {
        return -1;
      }
      if (prevSelectedTab >= updatedTabs.length) {
        return updatedTabs.length - 1;
      }
      return prevSelectedTab;
    });
  };

  const addTab = (newTab: editorTab) => {
    const updatedTabs = [...tabs, newTab];
    setTabs(updatedTabs);
    setSelectedTab(updatedTabs.length - 1);
  };

  const createTab = () => {
    setCreatingNewTab(true);
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex items-end overflow-x-scroll h-max min-h-12 relative">
          <img 
            src="icon.svg" 
            alt="Editor Icon" 
            className='h-12 px-2 py-2' 
          />    
          {tabs.map((tab, index) => (
            <EditorTab
              text={tab.text}
              active={selectedTab === index}
              setTab={setSelectedTab}
              index={index}
              key={index}
              updateTab={updateTabName}
              deleteTab={deleteTab}
            />
          ))}
          {creatingNewTab ? 
            <NewTabInput 
              addNewTab={addTab}
              cancelNewTab={() => setCreatingNewTab(false)}
            /> :
            <button 
              onClick={createTab}
              className="rounded-t flex items-start p-3 material-symbols-rounded sticky right-0"
            >add</button>
          }
        </div>
        <div className="flex items-center w-full h-full bg-[#1e1e1e] py-4 rounded-lg editor-container">
          {tabs.length > 0 && (
            <EditorElement 
              editorLanguage={editorLanguage}
              editorValue={editorValue}
              handleEditorChange={handleEditorChange}
            />
          )}
        </div>
        
      </div>
    </>
  );
}
