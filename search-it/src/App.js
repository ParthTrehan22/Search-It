import './App.css';
import { QueryClientProvider, QueryClient } from 'react-query'
import Header from './components/Header';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header></Header>
    </QueryClientProvider>
  );
}

export default App;
