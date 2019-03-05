import React, { Component } from 'react';
import {Navbar} from 'reactstrap';
import {NavbarBrand} from 'reactstrap';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent'

import { DISHES } from '../shared/dishes.js'

class Main extends Component {

  constructor(props)
  {
    super(props);
    this.state={
      dishes: DISHES,
      selectedDish:null
    }
  }

  onDishSelect(dishId)
  {
      this.setState({
          selectedDish:dishId
      });
  }


  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes} 
            onClick={(dishId)=>this.onDishSelect(dishId)}></Menu>
        <Dishdetail 
        selectedDish={this.state.dishes.filter((dish)=>dish.id===this.state.selectedDish)[0]}></Dishdetail>
      </div>
    );
  }
}

export default Main;
