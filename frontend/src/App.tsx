import './App.css';
import 'material-symbols';
import EditorComponent from './components/EditorComponent';

function App() {

  return (
    <>
      <div className="max-w-screen max-h-screen w-screen h-screen px-20 pt-10 pb-20 bg-[#181818] overflow-hidden">
        <EditorComponent />   
      </div>
    </>
  );
}

export default App;
