import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../context';
import PropTypes from "prop-types";

export default class Product extends Component {
    render() {
        const { id, title, img, price, inCart } = this.props.product;

        return (
            <ProductWrapper className='col-9 mx-auto col-md-6 col-lg-3 my-3'>
                <div className='card'>
                    <ProductConsumer>
                        {(value) => (
                            <div className="img-container p-5" onClick={() => { value.handleDetail(id) }}>
                                <Link to={{
                                    pathname: '/details', query: { id }
                                }} >
                                    <img src={img} alt='product imgage' className='card-img-top'></img>
                                </Link>

                                <button className='cart-btn'
                                    disabled={inCart ? true : false}
                                    onClick={() => {
                                        value.addToCart(id);
                                        value.openModal(id);
                                    }}>

                                    {inCart ? (<p className='text-capitalized mb-0' disabled>in cart</p>) : (<i className='fas fa-cart-plus'></i>)}
                                </button>

                            </div>)}
                    </ProductConsumer>

                    <div className='card-footer d-flex justify-content-between'>

                        <h2>{title}</h2>
                        <h3>${price}</h3>
                    </div>
                </div>
            </ProductWrapper >
        )
    }
}

Product.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        img: PropTypes.string,
        title: PropTypes.string,
        price: PropTypes.number,
        inCart: PropTypes.bool,
    }).isRequired
}

const ProductWrapper = styled.div`
.card-img-top {
    position: relative;
    overflow: hidden;
    transition: all 1s;
    &:hover {
        transform: scale(1.2);
    }
}
.img-container {
    position: relative;
    overflow: hidden;
}

.card-footer {
    height: 3rem;
    width: 100%;
    //background: var(--lightBlue);
    position: relative;
    bottom: 0;
    left: 0;
    h2 {
        font-size: 1.2em;
        display: inline-block;
    }
    h3 {
        font-size: 1.1em;
        display: inline-block;

    }
}

.cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    color: var(--mainWhite);
border-radius: 0.5rem 0 0 0;
font-size: 1.4rem;
transform: translate(0, 100%); 
transition: all 0.5s linear; 
}

.img-container:hover .cart-btn {
transform: translate(0, 0); 
}

.cart-btn:hover {
    transition: all 0.5s linear;
    color: var(--mainBlue);
    cursor: pointer;
}

`;