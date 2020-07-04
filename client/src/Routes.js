import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import AdminRoute from "./auth/AdminRoutes";
import CreateTeacher from "./admin/CreateTeacher";
import Teachers from "./admin/Teachers";
import CreateStudent from "./admin/CreateStudent";
import Students from "./admin/Students";
import TeacherRoute from "./auth/TeacherRoutes";
import CreateChapter from "./teacher/CreateChapter";
import Chapter from "./teacher/Chapters";
import CreateLecture from "./teacher/CreateLecture";
import Lecture from "./teacher/Lectures";
import Profile from "./user/Profile";
import Subject from "./student/Subjects";
import SChapter from "./student/SChapters";
import SLecture from "./student/SLectures";
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/signin" exact component={Signin}></Route>
        <Route path="/subjects" exact component={Subject}></Route>
        <Route path="/subjects/:subject" exact component={SChapter}></Route>
        <Route
          path="/student/chapterslecture/:chapterId"
          exact
          component={SLecture}
        ></Route>

        {/* Admin routes */}
        <Route path="/profile" exact component={Profile}></Route>
        <AdminRoute
          path="/admin/createteacher"
          exact
          component={CreateTeacher}
        />
        <AdminRoute
          path="/admin/createstudent"
          exact
          component={CreateStudent}
        />
        <AdminRoute path="/admin/teachers" exact component={Teachers} />
        <AdminRoute path="/admin/students" exact component={Students} />
        {/* teacher routes */}
        <TeacherRoute
          path="/teacher/createchapter"
          exact
          component={CreateChapter}
        />

        <TeacherRoute path="/teacher/chapters" exact component={Chapter} />

        <TeacherRoute
          path="/teacher/createlecture"
          exact
          component={CreateLecture}
        />

        <TeacherRoute
          path="/teacher/createlecture/:chapterId"
          exact
          component={CreateLecture}
        />

        <TeacherRoute
          path="/teacher/chapter/:chapterId"
          exact
          component={Lecture}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
