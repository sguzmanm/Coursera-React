import React, {Component} from 'react';
import {Card, CardBody, CardText, CardImg, CardTitle} from 'reactstrap';

class Dishdetail extends Component{
    
    constructor(props)
    {
        super(props);

    }

    formatDate(date) {
        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
      
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
      
        return monthNames[monthIndex] + ' ' +day + ', ' + year;
      }
      

    renderDish(selectedDish)
    {
        return(
            <Card>
                <CardImg top width="100%" src={selectedDish.image} alt="Card image" />
                <CardBody>
                    <CardTitle>{selectedDish.name}</CardTitle>
                    <CardText>{selectedDish.description}</CardText>
                </CardBody>
            </Card>
    
        );
    }

    renderComments(comments)
    {
        if(!comments)
            return(<div></div>);
        var comp=this;       
        return comments.map(function(comment)
        {
            return(
            <div key={comment.id}>
                <li>{comment.comment}</li> <br/>
                <li>-- {comment.author}, {comp.formatDate(new Date(comment.date))}</li> <br/>
            </div>
            );
        })
    }

    render()
    {
        if(!this.props.selectedDish)
            return (<div></div>);
        return (
            
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.selectedDish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    <h2>Comments</h2>
                    <ul className="list-unstyled">
                        {this.renderComments(this.props.selectedDish.comments)}
                    </ul>
                </div>
            </div>
            
        );
    }

}

export default Dishdetail;

