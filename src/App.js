import './App.css';
import {
  createBrowserRouter, RouterProvider 
} from "react-router-dom";
import React from 'react';
import Home from './screens/Home'
import UserLogin from './screens/UserLogin'
import UserSignup from './screens/UserSignup';
import {Profile, fetchpersonalinfo} from './screens/Profile';
import ImageUpload from './components/ImageUpload';
// import Weather from './components/Weather';
import WeatherDetail from './screens/weather/WeatherDetail';
import Question from './screens/Question';
import AskQue from './components/AskQue';
import {QuestionItem, fetchquestion} from './components/Questions/QuestionItem';
import { MyQuestions, fetchmyquestions} from './components/Questions/MyQuestions';
import { MyAnswers, fetchmyanswers } from './components/Profiles/MyAnswers';
import ComplaintUpload from './components/Complaint/ComplaintUpload';
import MyComplaints from './components/Complaint/MyComplaints';
import CropInfo from './components/CropInfo';
import { MyImage, fetchmyimages } from './components/Profiles/MyImage';
import {ViewComplaints} from './components/Complaint/ViewComplaints';
import NotFound from './components/NotFound';

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <Home />
    },
    {
      path:"/login",
      element: <UserLogin />
    },
    {
      path:"/signup",
      element: <UserSignup />
    },
    {
      path:"/img",
      element: <ImageUpload />
    },
    {
      path:"/giveweather",
      element:<WeatherDetail />,
    },
    {
      path:"/question",
      element:<Question />,
    },
    {
      path:"/question/:question_id",
      element:<QuestionItem />,
      loader:fetchquestion
    },
    {
      path:"/askque",
      element:<AskQue />,
    },
    {
      path:"/profile",
      element:<Profile />,
      loader:fetchpersonalinfo
    },
    {
      path:"/profile/myquestions",
      element:<MyQuestions />,
      loader:fetchmyquestions
    },
    {
      path:"/profile/myanswers",
      element:<MyAnswers />,
      loader:fetchmyanswers
    },
    {
      path:"/profile/mycomplaints",
      element: <MyComplaints/>
    },
    {
      path :"/complaint",
      element : <ComplaintUpload />
    },
    {
      path : '/my/:stateName',
      element : <CropInfo/>
    },
    {
      path:"/profile/myimages",
      element:<MyImage />,
      loader:fetchmyimages
    },
    {
      path:"/viewcomplaint",
      element:<ViewComplaints/>
      // loader:fetchallcomplaints
    },
    {
      path: "*",
      element: <NotFound />
    }
  ])

  return (
    // <Router>
    //   <Routes>
    //   <Route exact path="/" element={<Home />} />
    //   <Route exact path="/login" element={<UserLogin />} />
    //   <Route exact path="/signup" element={<UserSignup />} />
    //   <Route exact path='/profile' element={<Profile/>}/>
    //   <Route exact path='/img' element={<ImageUpload/>}/>
    //   <Route exact path='/content' element={<Content/>}/>
    //   <Route exact path='/giveweather' element={<WeatherDetail/>}/>
    //   <Route exact path='/question' element={<Question/>}/>
    //   <Route exact path='/askque' element={<AskQue/>}/>
    //   </Routes>
    // </Router>
    <div className="App">
    <RouterProvider router={router} />
    </div>
  );
}

export default App;