import React, { Component } from 'react';


import Header from './HeaderComponent';
import Footer from './FooterComponent'
import Home from './HomeComponent';
import Contact from './ContactComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent';


import {Switch, Route, Redirect, withRouter} from 'react-router-dom'; 

import {connect} from 'react-redux';

const mapStateToProps= (state) =>{ return{
  dishes:state.dishes,
  comments:state.comments,
  leaders:state.leaders,
  promotions: state.promotions
}

}

class Main extends Component {

  constructor(props)
  {
    super(props);
  }

  

  render() {

    const HomePage = () => {
      return(
          <Home 
            dish={this.props.dishes.filter((dish)=>dish.featured )[0]}
            promotion={this.props.promotions.filter((promotion)=>promotion.featured )[0]}
            leader={this.props.leaders.filter((leader)=>leader.featured)[0]}
          />
      );
    }  

    const DishWithId= ({match}) =>{
      return (
          <DishDetail selectedDish={this.props.dishes.filter((dish)=>dish.id=== parseInt(match.params.dishId,10))[0]}
          comments={this.props.comments.filter((comment)=>comment.dishId === parseInt(match.params.dishId,10))}></DishDetail>
      );
    }

    return (
      <div>
        <Header></Header>
        <Switch>

          <Route path="/home" component={HomePage}></Route>
          <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes}/>}></Route>
          <Route path="/menu/:dishId" component={DishWithId}></Route>
          <Route exact path="/contactus" component={()=><Contact/>}></Route>
          <Route exact path="/aboutus" component={()=><About leaders={this.props.leaders}></About>}></Route>
          <Redirect to="/home" />
        </Switch>
        <Footer></Footer>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
