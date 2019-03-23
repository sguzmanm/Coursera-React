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
import {postComment, fetchComments, fetchDishes, fetchPromos} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';

import{TransitionGroup,CSSTransition} from 'react-transition-group';


const mapStateToProps= (state) =>{ return{
  dishes:state.dishes,
  comments:state.comments,
  leaders:state.leaders,
  promotions: state.promotions
}}

const mapDispatchToProps=(dispatch)=>
{
  return{
    postComment:(dishId,author,comment,rating)=>dispatch(postComment(dishId,author,comment,rating)),
    fetchDishes:()=>{dispatch(fetchDishes())},
    fetchComments:()=>{dispatch(fetchComments())},
    fetchPromos:()=>{dispatch(fetchPromos())},
    resetFeedbackForm: ()=>{dispatch(actions.reset('feedback'))}
  }
}


class Main extends Component {

  constructor(props)
  {
    super(props);
  }

  componentDidMount()
  {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  

  render() {

    const HomePage = () => {
      return(
          <Home 
            dish={this.props.dishes.dishes.filter((dish)=>dish.featured )[0]}
            dishesLoading={this.props.dishes.isLoading}
            dishesErrMss={this.props.dishes.errMss}
            promotion={this.props.promotions.promotions.filter((promotion)=>promotion.featured )[0]}
            promosLoading={this.props.promotions.isLoading}
            promosErrMss={this.props.promotions.errMss}
            leader={this.props.leaders.filter((leader)=>leader.featured)[0]}
          />
      );
    }  

    const DishWithId= ({match}) =>{
      return (
          <DishDetail selectedDish={this.props.dishes.dishes.filter((dish)=>dish.id=== parseInt(match.params.dishId,10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMss={this.props.dishes.errMss}
          comments={this.props.comments.comments.filter((comment)=>comment.dishId === parseInt(match.params.dishId,10))}
          commentsErrMss={this.props.comments.errMss}
          postComment={this.props.postComment}></DishDetail>
      );
    }

    return (
      <div>
        <Header></Header>
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path="/home" component={HomePage}></Route>
              <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes}/>}></Route>
              <Route path="/menu/:dishId" component={DishWithId}></Route>
              <Route exact path="/contactus" component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}></Route>
              <Route exact path="/aboutus" component={()=><About leaders={this.props.leaders}></About>}></Route>
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer></Footer>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
