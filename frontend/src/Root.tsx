import { Route } from 'react-router-dom';

// Pages and Components
import HomePage from './pages/Home';
import RootLayoutPage from './pages/RootLayout';

const Root = (
  <Route element={<RootLayoutPage />}>
    <Route index element={<HomePage />} />;
  </Route>
);
export default Root;
