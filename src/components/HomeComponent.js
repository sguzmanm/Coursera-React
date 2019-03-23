import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap'
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseurl';
import { FadeTransform } from 'react-animation-components';

function RenderCard({item,isLoading,errMss})
{
    if(isLoading)
    {
        return(
                    <Loading></Loading>
        )
    }
    else if (errMss)
    {
        return(
                <h4>{errMss}</h4>
                )
    }


    return(
        <FadeTransform in 
            transformProps={{
                exitTransform:'scale(0.5) translateY(-50%)'
            }}>
            <Card>
                <CardImg src={baseUrl+item.image} alt={item.name}>
                </CardImg>
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle> {item.designation}</CardSubtitle> : null}
                    <CardText>{item.description}</CardText>
                </CardBody>

            </Card>
        </FadeTransform>
    )

}

function Home (props)
{
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} 
                        isLoading={props.dishesLoading} 
                        errMss={props.dishesErrMss}>
                    
                    </RenderCard>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} 
                        isLoading={props.promosLoading}
                        errMss={props.promosErrMss}>
                    
                    </RenderCard>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader}>
                    
                    </RenderCard>
                </div>

            </div>
        </div>
    );
}

export default Home;