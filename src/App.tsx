import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./pages/Home";
const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div>
                <Home />
            </div>
        </QueryClientProvider>
    );
}

export default App;
