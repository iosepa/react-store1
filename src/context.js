import React, { Component } from 'react'
import { detailProduct, storeProducts } from './data';

const ProductContext = React.createContext();
//Provider
//Consumer


class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
    }
    componentDidMount() {
        this.setProducts();
    }
    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(prod => {
            tempProducts = [...tempProducts, { ...prod }];
        });
        this.setState(() => {
            return { products: tempProducts }
        });
    }

    getItem = (id) => {
        return this.state.products.find(item => item.id === id);
    }

    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return { detailProduct: product }
        })
    }
    addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;

        this.setState(() => {
            return { products: tempProducts, cart: [...this.state.cart, product] }
        }, () => this.addTotal())
    }

    openModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return { modalProduct: product, modalOpen: true }
        })
    }
    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false }
        })
    }
    increment = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        const index = tempProducts.indexOf(this.getItem(id));
        let addProduct = tempProducts[index];

        if (!tempCart.includes(addProduct))
            tempCart = [...tempCart, addProduct];

        addProduct.count++;
        addProduct.inCart = true;
        addProduct.total += addProduct.price;

        this.setState(() => {

            return {
                cart: [...tempCart],
                products: [...tempProducts],
            }
        }, () => {
            this.addTotal();
        }

        )
    }


    decrement = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.count--;

        if (removedProduct.count === 0) {
            removedProduct.inCart = false;
            tempCart = tempCart.filter(item => item.id !== id);

        }

        removedProduct.total -= removedProduct.price;

        this.setState(() => {

            return {
                cart: [...tempCart],
                products: [...tempProducts],
            }
        }, () => {
            this.addTotal();
        }

        )
    }

    removeItem = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(() => {

            return {
                cart: [...tempCart],
                products: [...tempProducts],
            }
        }, () => {
            this.addTotal();
        }

        )
    }
    clearCart = () => {
        this.setState(() => {
            return { cart: [], }
        }, () => {
            this.setProducts();
            this.addTotal();
        })
    }
    addTotal = () => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));
        const tax = parseFloat((subTotal * 0.1).toFixed(2));
        const total = subTotal + tax;
        this.setState(() => {
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total,
            }
        })
    }
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                clearCart: this.clearCart,
                removeItem: this.removeItem,
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };

