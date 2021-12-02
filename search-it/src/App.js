import './App.css';
import SearchBar from './components/SearchBar';
import { Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query'
import ShowImage from './components/ShowImages';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {/* <Testquery search="USA"></Testquery> */}
        <Routes>
          <Route path="/" element={<SearchBar />}></Route>
          <Route path="/images" element = {<ShowImage />}></Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
