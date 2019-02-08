import React from 'react'
import { Link } from 'react-router-dom';


export default function CartTotals({ value }) {
    const { cartTotal, cartSubTotal, cartTax, clearCart } = value;
    return (
        <div className="container">
            <div className="row">
                <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                    <Link to='/'>
                        <button
                            className="btn btn-outline-danger text-uppercase mb-3 px-5"
                            type="button"
                            onClick={() => clearCart()}>
                            clear cart
                            </button>

                    </Link>
                    <div className="text-title">Subtotal: $ {cartSubTotal}</div>
                    <div className="text-title">Tax: $ {cartTax}</div>
                    <div className="text-title">Total: $ {cartTotal}</div>
                </div>
            </div>
        </div>
    )
}
