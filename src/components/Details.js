import React, { Component } from 'react'
//import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../context';
import { ButtonContainer } from './Button'
export default class Details extends Component {
    // const productId = 

    render() {
        return (
            <ProductConsumer>
                {value => {
                    const { id, company, img, info, price, title, inCart } = value.detailProduct;
                    return (
                        <div className="container py-5">
                            <div className="row">
                                <div className="col-10 mx-auto text-center text-slanted text-blue my-5"><h1>{title}</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-10 mx-auto  col-md-6 my-3">
                                    <img src={img} className="img-fluid" alt="product"></img>
                                </div>
                                <div className="col-10 mx-auto  col-md my-3 text-capitalize">
                                    <h3>{title}</h3><h4 className="text-title text-uppercase text-muted mt-3 mb-2">made by: {company}</h4> <h4 className="text-blue">Price: ${price}</h4><p>{info}</p>
                                    <div>
                                        <Link to='/'>
                                            <ButtonContainer>

                                                Back
                                            </ButtonContainer>
                                        </Link>

                                        <ButtonContainer
                                            cart
                                            disabled={inCart ? true : false}
                                            onClick={() => {
                                                value.addToCart(id);
                                                value.openModal(id);
                                            }}>
                                            {inCart ? "in cart" : "add to cart"}
                                        </ButtonContainer>


                                    </div>



                                </div>

                            </div>

                        </div>
                    )
                }}
            </ProductConsumer>
        )
    }
}