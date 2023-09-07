import Navbar from "./layouts/Navbar";
import { Footer } from "./layouts/Footer";
import HomePage from "./pages/HomePage";
import { QueryClient,QueryClientProvider} from 'react-query'
import SearchBooksPage from "./pages/SearchBooksPage";

const queryClient = new QueryClient()

const App = () => {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Navbar />
      {/* <HomePage /> */}
      <SearchBooksPage/> 
      <Footer />
      <div></div>
      </QueryClientProvider>
    </>
  );
};

export default App;
