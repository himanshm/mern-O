import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import Root from './Root';

const router = createBrowserRouter(createRoutesFromElements(Root));

function App() {
  return (
    <div className='App'>
      <div className='pages'>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
