import { Route, Routes } from 'react-router-dom';
import { emptyArray } from 'core/utils';
import { routers } from './config';
import ProtectRoute from './ProtectRoute';
import PublicRoute from './PublicRoute';

function RouteComponent() {
  function renderRoute({ element: Element, children, ...params }, index) {
    if (!emptyArray(children)) {
      return (
        <Route key={index} {...params} element={<Element />}>
          {children.map((routeChild, index) => {
            return renderRoute(routeChild, index);
          })}
        </Route>
      );
    }

    if (params?.auth) {
      return (
        <Route
          {...params}
          element={
            <ProtectRoute>
              <Element />
            </ProtectRoute>
          }
          key={index}
        />
      );
    }

    return (
      <Route
        {...params}
        element={
          <PublicRoute>
            <Element />
          </PublicRoute>
        }
        key={index}
      />
    );
  }
  return (
    <Routes>
      {routers.map((route, index) => {
        return renderRoute(route, index);
      })}
    </Routes>
  );
}

export default RouteComponent;
