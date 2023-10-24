import React from 'react';
import ReactDOM from 'react-dom/client';
import { Outlet,RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import AboutCricketer from './Components/AboutCricketer';

import App from './App';
import { FilterSearchProvider } from './Utility/FilterSearchContext';


const Applayout=()=>{
        return (
         <FilterSearchProvider>
            <div id="applayout">
              {/* <App/> */}
              <Outlet/>
              
            </div>
            </FilterSearchProvider>
        );
      };
      const root = ReactDOM.createRoot(document.getElementById('root'));
      const approut = createBrowserRouter([
        {
          path: "/",
          element: <Applayout/>,
          children: [
            {
              path: "/cricketer-details/:id",
              element: <AboutCricketer/>,
            },{
              path: "/",
              element: <App />,
            }]
          }])

root.render( 
    <RouterProvider router={approut} />
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

