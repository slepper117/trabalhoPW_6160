import { UserContextProvider } from "./context/user";
import Router from "./Router";

const App = () => (
  <UserContextProvider>
    <Router />
  </UserContextProvider>
);

export default App;
