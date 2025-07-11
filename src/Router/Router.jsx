import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root/Root";
import Home from "../Pages/Home/Home";
import Authentication from "../Layout/Authentication/Authentication";
import Signin from "../Pages/Signin/Signin";
import Signup from "../Pages/Signup/Signup";
import Coverage from "../Pages/Coverage/Coverage";
import AddParcel from "../Pages/AddParcel/AddParcel";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../Layout/Dashboard/Dashboard";
import MyParcels from "../Pages/MyParcels/MyParcels";
import Payment from "../Pages/Payment/Payment";
import PaymentHistory from "../Pages/PaymentHistory/PaymentHistory";
import TrackPackage from "../Pages/TrackPackage/TrackPackage";
import BeArider from "../Pages/BeARider/BeArider";
import ActiveRider from "../Pages/ActiveRider/ActiveRider";
import PendingRider from "../Pages/PendingRider/PendingRider";
import MakeAdmin from "../Pages/MakeAdmin/MakeAdmin";
import Forbidden from "../Pages/Forbidden/Forbidden";
import AdminRoute from "./AdminRoute";
import AssignRider from "../Pages/AssignRider/AssignRider";

export const router = createBrowserRouter([

  // Root layout
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: '/coverage',
        element: <Coverage></Coverage>
      },
      {
        path: 'addParcel',
        element:
          <PrivateRoutes>
            <AddParcel></AddParcel>
          </PrivateRoutes>
      },
      {
        path: 'beARider',
        element:
          <PrivateRoutes>
            <BeArider></BeArider>
          </PrivateRoutes>
      },
      {
        path: 'forbidden',
        element: <Forbidden></Forbidden>
      }
    ]
  },

  // Authentication layout
  {
    path: "/",
    element: <Authentication></Authentication>,
    children: [
      {
        path: '/signin',
        element: <Signin></Signin>
      },
      {
        path: '/signup',
        element: <Signup></Signup>
      }
    ]
  },

  // Dashboard layout
  {
    path: '/dashboard',
    element:
      <PrivateRoutes>
        <Dashboard></Dashboard>
      </PrivateRoutes>,
    children: [
      {
        path: 'myParcels',
        element: <MyParcels></MyParcels>
      },
      {
        path: 'payment/:parcelId',
        element: <Payment></Payment>
      },
      {
        path: 'paymentHistory',
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: 'trackPackage',
        element: <TrackPackage></TrackPackage>
      },
      {
        path: 'activeRider',
        element:
          <AdminRoute>
            <ActiveRider></ActiveRider>
          </AdminRoute>
      },
      {
        path: 'pendingRider',
        element:
          <AdminRoute>
            <PendingRider></PendingRider>
          </AdminRoute>
      },
      {
        path: 'makeAdmin',
        element:
          <AdminRoute>
            <MakeAdmin></MakeAdmin>
          </AdminRoute>
      },
      {
        path: 'assignRider',
        element:
          <AdminRoute>
            <AssignRider></AssignRider>
          </AdminRoute>
      }

    ]
  }
]);