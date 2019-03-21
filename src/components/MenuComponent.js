import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

function RenderMenuItem({ dish }) {
    return (
        <Card>
            <Link to={`/menu/${dish.id}`}>
                <CardImg width="100%" object src={dish.image} alt={dish.name}></CardImg>
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

const Menu = (props) => {
    const menu = props.dishes.dishes.map((dish) => {
        return (
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <RenderMenuItem dish={dish}></RenderMenuItem>
            </div>
        );
    });

    if (props.dishes.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Loading></Loading>
                    </div>
                </div>
            </div>
        )
    }
    else if (props.dishes.errMss) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h4>{props.dishes.errMss}</h4>
                    </div>
                </div>
            </div>);
    }


    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Menu</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Menu</h3>
                    <br />
                </div>
            </div>

            <div className="row">
                {menu}
            </div>
        </div>
    )

}


export default Menu;
