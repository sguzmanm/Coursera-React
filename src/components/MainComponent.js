import React, { Component } from 'react';


import { DISHES } from '../shared/dishes.js'
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

import Header from './HeaderComponent';
import Footer from './FooterComponent'
import Home from './HomeComponent';
import Contact from './ContactComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent';


import {Switch, Route, Redirect} from 'react-router-dom'; 

class Main extends Component {

  constructor(props)
  {
    super(props);
    this.state={
      dishes: DISHES,
      comments:COMMENTS,
      promotions:PROMOTIONS,
      leaders:LEADERS
    }
  }

  

  render() {

    const HomePage = () => {
      return(
          <Home 
            dish={this.state.dishes.filter((dish)=>dish.featured )[0]}
            promotion={this.state.promotions.filter((promotion)=>promotion.featured )[0]}
            leader={this.state.leaders.filter((leader)=>leader.featured)[0]}
          />
      );
    }  

    const DishWithId= ({match}) =>{
      return (
          <DishDetail selectedDish={this.state.dishes.filter((dish)=>dish.id=== parseInt(match.params.dishId,10))[0]}
          comments={this.state.comments.filter((comment)=>comment.dishId === parseInt(match.params.dishId,10))}></DishDetail>
      );
    }

    return (
      <div>
        <Header></Header>
        <Switch>

          <Route path="/home" component={HomePage}></Route>
          <Route exact path="/menu" component={()=><Menu dishes={this.state.dishes}/>}></Route>
          <Route path="/menu/:dishId" component={DishWithId}></Route>
          <Route exact path="/contactus" component={()=><Contact/>}></Route>
          <Route exact path="/aboutus" component={()=><About leaders={this.state.leaders}></About>}></Route>
          <Redirect to="/home" />
        </Switch>
        <Footer></Footer>
      </div>
    );
  }
}

export default Main;
