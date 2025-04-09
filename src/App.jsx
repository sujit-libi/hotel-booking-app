import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Account from './pages/Account';
import NotFound from './pages/PageNotFound';
import Rooms from './pages/Rooms';
import Settings from './pages/Settings';
import Users from './pages/Users';
import Login from './pages/Login';
import AppLayout from './components/AppLayout';

const StyledApp = styled.div``;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="account" element={<Account />} />
              <Route path="rooms" element={<Rooms />} />
              <Route path="settings" element={<Settings />} />
              <Route path="users" element={<Users />} />
              {/* Redirect to dashboard if no route matches */}
              <Route index element={<Navigate replace to="dashboard" />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </StyledApp>
    </>
  );
}

export default App;
