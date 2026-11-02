import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./app/routes";
import ModalRenderer from "./components/modals/ModalRenderer";


const App = () => {

    return (

        <BrowserRouter>

            <AppRoutes />

            <ModalRenderer />

        </BrowserRouter>

    );

};


export default App;