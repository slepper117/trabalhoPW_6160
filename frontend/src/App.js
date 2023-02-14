import Router from "./Router";
import { UserContextProvider } from "./context/user";

const App = () => (
  <UserContextProvider>
    <Router />
  </UserContextProvider>
);

export default App;
