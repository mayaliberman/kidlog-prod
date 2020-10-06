import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import SignIn from './components/auth/SignIn/SignIn';
import SignUp from './components/auth/SignUp/SignUp';
import UpdatePassword from './components/auth/UpdatePassword/UpdatePassword';
import ForgotPassword from './components/auth/ForgotPassword/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword/ResetPassword';
import Header from './components/Header/Header';
import PostsGallery from './components/posts/PostGallery/PostsGallery';
import NotFound from './components/errors/NotFound/NotFound';
import Forbidden from './components/errors/Forbidden/Forbidden';
import PostState from './context/post/PostState';
import AuthState from './context/auth/authState';
import UserState from './context/user/UserState';
import MyAccount from './components/user/MyAccount/MyAccount';
import AddKid from './components/user/kid/AddKid/AddKid';
import EditKid from './components/user/kid/EditKid/EditKid';
import FilterPosts from './components/posts/FilterPosts/FilterPosts';
import PrivateRoute from './components/PriveteRoute';

const App = () => {
  return (
    <BrowserRouter>
      <AuthState>
        <UserState>
          <PostState>
            <Header />
            <Switch>
              <Route exact path='/filter' component={FilterPosts} />
              <Route exact path='/' component={Home} />
              <Route exact path='/sign-in' component={SignIn} />
              <Route exact path='/sign-up' component={SignUp} />
              <Route exact path='/forgot-password' component={ForgotPassword} />
              <Route
                exact
                path='/reset-password/:token'
                component={ResetPassword}
              />
              <PrivateRoute
                exact
                path='/update-password'
                component={UpdatePassword}
              />
              <PrivateRoute exact path='/add-kid' component={AddKid} />
              <PrivateRoute path={'/posts'} exact component={PostsGallery} />
              <PrivateRoute exact path='/my-account' component={MyAccount} />
              <PrivateRoute exact path='/edit-kid' component={EditKid} />
              <Route exact path='/forbidden' component={Forbidden} />
              <Route component={NotFound} />
            </Switch>
          </PostState>
        </UserState>
      </AuthState>
    </BrowserRouter>
  );
};

export default App;
