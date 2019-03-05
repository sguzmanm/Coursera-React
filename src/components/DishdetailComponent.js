import React from 'react';
import {Card, CardBody, CardText, CardImg, CardTitle} from 'reactstrap';


    

function RenderDish({selectedDish})
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

function RenderComments({comments})
{
    if(!comments)
        return(<div></div>);
    return comments.map(function(comment)
    {
        return(
        <div key={comment.id}>
            <li>{comment.comment}</li> <br/>
            <li>-- {comment.author}, {new Intl.DateTimeFormat('en-US', 
            { year: 'numeric', month: 'short', day: '2-digit'}).
            format(new Date(Date.parse(comment.date)))}</li> <br/>
        </div>
        );
    })
}

const Dishdetail=(props)=>
{
    if(!props.selectedDish)
        return (<div></div>);
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish selectedDish={props.selectedDish}></RenderDish>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <h2>Comments</h2>
                    <ul className="list-unstyled">
                        <RenderComments comments= {props.selectedDish.comments}></RenderComments>                        </ul>
                </div>
            </div>
        </div>
        
    );
}

export default Dishdetail;

