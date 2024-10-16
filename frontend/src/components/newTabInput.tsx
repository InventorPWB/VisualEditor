import React, { ChangeEvent, FormEvent, useState } from 'react'

interface NewTabInputProps {
  cancelNewTab: () => void;
  addNewTab: (newTab: editorTab) => void;
}

const NewTabInput: React.FC<NewTabInputProps> = ({cancelNewTab, addNewTab}) => {
  const [tabValue, setTabValue] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTabValue(event.target.value);
  }

  return (
    <div className='p-2 h-12 flex items-center bg-[#0f151e]'>
      <form 
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          const newTab: editorTab = {
            text: tabValue,
            value: '',
            saved: false
          };

          addNewTab(newTab);
          cancelNewTab();
        }}
      >
        <input 
          autoFocus
          type="text"
          value={tabValue}
          onChange={handleInputChange}
          className='w-32 focus-within:outline outline-1 rounded outline-sky-700 p-1'
          onBlur={cancelNewTab}
        />
      </form>
    </div>
  )
}

export default NewTabInput