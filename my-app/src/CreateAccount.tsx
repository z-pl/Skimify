import Form from "./Components/Form";
import { Player} from '@lottiefiles/react-lottie-player';
import summary from './assets/112180-paper-notebook-writing-animation.json'
import CreateForm from "./Components/CreateForm";


function App() {
    return (
        <div className="flex  h-screen">
            <div className="w-full flex items-center justify-center  bg-[#f1f1f1]">
                <CreateForm></CreateForm>
            </div>
        </div>
    );
}

export default App;
