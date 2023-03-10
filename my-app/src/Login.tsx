import Form from "./Components/Form";
import { Player} from '@lottiefiles/react-lottie-player';
import summary from './assets/112180-paper-notebook-writing-animation.json'


function App() {
    return (
        <div className="flex w-full h-screen">
            <div className="w-full flex items-center justify-center lg:w-1/2 bg-[#f1f1f1]">
                <Form></Form>
            </div>
            <div className="hidden lg:flex h-full w-1/2 items-center justify-center bg-[#f1f1f1]">
                <div className="w-75 h-75 ">
                    <Player
                        src={summary}
                        autoplay={true}
                        loop
                        speed={0.35}
                        style={{width: "800px"}}
                    />

                </div>
            </div>
        </div>
    );
}

export default App;
