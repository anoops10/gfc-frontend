import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Registration } from './components/Pages/Registration'
import { ShowUsers } from './components/users/ShowUsers'
import { AddMembership } from './components/membership/AddMembership'
import { MembershipList } from './components/membership/MembershipList'
// import { UpdateMembership } from './components/membership/UpdateMembership'
import { AddUserMembership } from './components/usermembership/AddUserMembership'
import { ShowUserMembershipByEmail } from './components/usermembership/ShowUserMembershipByEmail'
// import { ShowMembers } from './components/users/ShowMembers'
import { ShowTrainers } from './components/users/ShowTrainers'
import { AddTrainer } from './components/trainers/AddTrainer'
// import { TrainerDetails } from './components/trainers/TrainerDetails'
// import { ShowUserMembershipByUmId } from './components/usermembership/ShowUserMembershipByUmId'
// import { AssignTrainer } from './components/trainers/AssignTrainer'
import Home from './components/Pages/Layout'
import HomeBody from './components/Pages/HomeBody'
import UserLayout from './components/Pages/UserPages/UserLayout'
import UserHomePage from './components/Pages/UserPages/UserDashboard'
import LoginPage from './components/Pages/LoginPage'
import TrainerLayout from './components/Pages/TrainerPages/TrainerLayout'
import AboutUs from './components/Pages/AboutUs'
// import { UpdateUser } from './components/users/UpdateUser'
import { AdminDashboard } from './components/Pages/AdminPages/AdminDashboard'
import AdminLayout from './components/Pages/AdminPages/AdminLayout'
import ShowPayment from './components/payments/ShowPayment'
import PaymentByUser from './components/payments/PaymentByUser'
import TrainerDashboard from './components/Pages/TrainerPages/TrainerDashboard'
// import { ClientDetails } from './components/clients/ClientDetails'
import ClientList from './components/clients/ClientList'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'
// import Layout from './components/Home/Layout'

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route index element={<HomeBody />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/adduser' element={<Registration />} />
            <Route path='/aboutus' element={<AboutUs />} />


            {/* Admin */}
            <Route path='/admin' element={
              <ProtectedRoute allowedRole="Admin">
                <AdminLayout />
              </ProtectedRoute>}>
              {/* Add admin-specific nested routes here */}
              <Route index element={<AdminDashboard />} />
              <Route path='addusermemberships' element={<AddUserMembership />} />
              <Route path='manageusers' element={<ShowUsers />} />
              <Route path='managemembership' element={<MembershipList />} />
              <Route path='addmembership' element={<AddMembership />} />
              <Route path='addtrainer' element={<AddTrainer />} />
              <Route path='paylist' element={<ShowPayment />} />


            </Route>

            {/* User */}
            <Route path='/user' element={<ProtectedRoute allowedRole="Member"><UserLayout /></ProtectedRoute>}>
              {/* Add User-specific nested routes here */}
              <Route index element={<UserHomePage />} />
              <Route path='showtrainers' element={<ShowTrainers />} />
              <Route path='showmembership' element={<MembershipList />} />
              <Route path='membershipdetails' element={<ShowUserMembershipByEmail />} />
              {/* <Route path='updatepersonaldetails' element={<UpdateUser/>}/> */}
              <Route path='paymenthistory' element={<PaymentByUser />} />

            </Route>


            {/* Trainer */}
            <Route path='/trainer' element={<ProtectedRoute allowedRole="Trainer"><TrainerLayout /></ProtectedRoute>}>
              {/* Add trainer-specific nested routes here */}
              <Route index element={<TrainerDashboard />} />
              <Route path='clients' element={<ClientList />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>


      {/* <button onClick={(e)=>{setButtonPressed(e.target.value)}} value={"AddUser"}>Add User</button>
      {buttonPressed == "AddUser" && <AddUser/>} */}

      {/* <AddUser/>
    <ShowUsers/> */}
      {/* <UpdateUser/> */}
      {/* <AddMembership/> */}
      {/* <MembershipList/> */}
      {/* <AddUserMembership/> */}
      {/* <Home/> */}
      {/* <BrowserRouter>
        <ul>
          <li>
            <a href="/">home</a>
          </li>
          <li>
            <a href="/users">Users List</a>
            <a href="/">Users List</a>
          </li>
          <li>
            <a href="/memberlist">Members List</a>
          </li>
          <li>
            <a href="/trainerlist">Trainers List</a>
          </li>
          <li>
            <a href="/adduser">Add Users</a>
          </li>
          <li>
            <a href="/membership">membership list</a>
          </li>
          <li>
            <a href="/addmembership">Add Membership</a>
          </li>
          <li>
            <a href="/addusermembership">Add User Membership</a>
          </li>
          <li>
            <a href="/addtrainer">Add Trainer details</a>
          </li>
        </ul> */}
      {/* <Routes> */}
      {/* <Route path="/" element={<Home />} /> 
          <Route path='/users' element={<ShowUsers />} /> */}
      {/* <Route path='/' element={<ShowUsers />} /> */}

      {/* <Route path='/adduser' element={<AddUser />} /> */}
      {/* <Route path='/edituser/:uId' element={<UpdateUser />} /> */}
      {/* <Route path='/membership' element={<MembershipList />} /> */}
      {/* <Route path='/updatemembership/:mId' element={<UpdateMembership />} /> */}
      {/* <Route path='/addmembership' element={<AddMembership />} /> */}
      {/* <Route path='/addusermembership' element={<AddUserMembership />} /> */}
      {/* <Route path='/showusermembershipbyuid/:uId' element={<ShowUserMembershipById />} /> */}
      {/* <Route path='/showusermembershipbyumid/:umId' element={<ShowUserMembershipByUmId />} /> */}
      {/* <Route path='/deleteusermembershipbyumid/:'></Route> */}
      {/* <Route path='/memberlist' element={<ShowMembers />} /> */}
      {/* <Route path='/trainerlist' element={<ShowTrainers />} /> */}
      {/* <Route path='/addtrainer' element={<AddTrainer />} /> */}
      {/* <Route path='/trainerdetails/:uId' element={<TrainerDetails />} /> */}
      {/* <Route path='/assigntrainer/:mId/:uId' element={<AssignTrainer />} /> */}
      {/* </Routes>
      </BrowserRouter> */}
    </>
  )
}

export default App
