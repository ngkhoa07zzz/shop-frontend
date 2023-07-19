import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import { DefaultLayout } from './components/Layout';
import { Container } from 'react-bootstrap';
import AdminRoute from './components/AdminRoute/AdminRoute';

function App() {
  return (
    <Container>
      <Router>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Layout = route.layout || DefaultLayout;
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
            {privateRoutes.map((route, index) => {
              const Layout = route.layout || DefaultLayout;
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <AdminRoute>
                      <Layout>
                        <Page />
                      </Layout>
                    </AdminRoute>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </Container>
  );
}

export default App;
