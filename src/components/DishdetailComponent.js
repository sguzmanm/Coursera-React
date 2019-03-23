import React, {Component} from 'react';
import {Card, CardBody, CardText, CardImg, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom'

import {Modal, ModalBody, ModalHeader, Button, Label, Row, Col} from 'reactstrap';
import {LocalForm, Control, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseurl';

import {FadeTransform, Fade, Stagger} from 'react-animation-components';


const minLength=(len)=>(val)=>val && val.length>=len;
const maxLength=(len)=>(val)=>!val || val.length<=len;
//Comment Form New Component
class CommentForm extends Component{

    constructor(props)
    {
        super(props);
        this.state={
            modal:false
        }
        this.toggleModal=this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    toggleModal()
    {
        this.setState(
            {
                modal:!this.state.modal
            }
        )
    }

    handleSubmit(values)
    {
        this.props.postComment(this.props.dishId,values.author,values.comment,values.rating);
    }


    render()
    {
        return(

            <div>
            <Button outline color="secondary" onClick={this.toggleModal}><span className="fa fa-pencil"></span> Submit comment</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>
                Submit comment
            </ModalHeader>
              <ModalBody>
                  <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                    <div className="form-group">
                        <Row>
                            <Col xs={12}>
                                <Label htmlFor="rating">Rating</Label>
                            </Col>
                            <Col xs={12}>
                                <Control.select model=".rating" name="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <Label htmlFor="name">Your Name</Label>
                            </Col>
                            <Col xs={12}>
                                <Control.text placeholder="Your Name" model=".name" name="name" className="form-control"
                                    validators={{
                                        minLength: minLength(3),
                                        maxLength: maxLength(15)
                                    }}>
                                </Control.text>
                                <Errors
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        minLength:'Must be greater than 2 characters',
                                        maxLength:'Must be 15 characters or less'
                                    }}>
                                </Errors>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <Label htmlFor="comment">Comment</Label>
                            </Col>
                            <Col xs={12}>
                                <Control.textarea model=".comment" name="comment" 
                                    rows="6" className="form-control">
                                </Control.textarea>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button color="primary" type="submit">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </div>
                  </LocalForm>
              </ModalBody>
            </Modal>
          </div>
    
        );
    }
}    

function RenderDish({selectedDish})
{
    return(
        <FadeTransform in 
        transformProps={{
            exitTransform:'scale(0.5) translateY(-50%)'
        }}>

        <Card>
            <CardImg top width="100%" src={baseUrl+selectedDish.image} alt="Card image" />
            <CardBody>
                <CardTitle>{selectedDish.name}</CardTitle>
                <CardText>{selectedDish.description}</CardText>
            </CardBody>
        </Card>
        </FadeTransform>

    );
}

function RenderComments({comments})
{
    if(!comments)
        return(<div></div>);
    return(
    <Stagger in>
    {comments.map((comment) => {
        return (
            <Fade in>
            <li key={comment.id}>
            <p>{comment.comment}</p>
            <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
            </li>
            </Fade>
        );
    })}
    </Stagger>);
}

const DishDetail=(props)=>
{
    if(props.isLoading)
    {
        return(
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Loading></Loading>
                </div>
            </div>
        </div>
        )
    }
    else if (props.errMss)
    {
        return(
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h4>{props.errMss}</h4>
                </div>
            </div>
        </div>
        )

    }
    else if(!props.selectedDish)
        return (<div></div>);
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.selectedDish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.selectedDish.name}</h3>
                    <br/>
                </div>
            </div>


            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish selectedDish={props.selectedDish}></RenderDish>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <h2>Comments</h2>
                    <ul className="list-unstyled">
                        <RenderComments comments= {props.comments}></RenderComments>
                        <CommentForm postComment={props.postComment} dishId={props.selectedDish.id}></CommentForm>   
                    </ul>
                </div>
            </div>
        </div>
        
    );
}

export default DishDetail;

