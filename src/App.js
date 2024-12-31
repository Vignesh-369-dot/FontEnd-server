import "./App.css";

import { Provider } from "../src/components/ui/provider";
import UserPage from "./page/user";

function App() {
  return (
    <Provider>
      <UserPage />
    </Provider>
  );
}

export default App;
