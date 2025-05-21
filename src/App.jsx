import { useState, useRef } from 'react';
import { product } from './assets/data/desserts.jsx';

function App() {

  const [basket, setBasket] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal kontrolü için state

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setCartList([]);
    setTotalPrice(0);
    setBasket(false);
  }

  function handleDessertAdd(dessert) {
    const orderedDessert = cartList.find(x => x.name === dessert.name);
    const perPrice = (cartList.map(x => (x.price * x.quantity)));
    const total = perPrice.reduce((acc, price) => acc + price, Number(dessert.price));
    setTotalPrice(total.toFixed(2));
    //acc+=price
    if (orderedDessert) {
      setCartList([...cartList]);
      orderedDessert.quantity++;

    }
    else {
      setCartList([...cartList, { name: dessert.name, price: Number(dessert.price), quantity: 1, img: dessert.img }]);
      setBasket(true);
    }

  }

  function DecreaseDessertCount(dessertName) {
    const updatedDessert = cartList.map(x => x.name === dessertName ?
      { ...x, quantity: x.quantity - 1 }
      : x).filter(x => x.quantity > 0);
    setCartList(updatedDessert);
    UpdatedTotalPrice(updatedDessert);

  }

  function IncreaseDessertCount(dessertName) {
    const updatedDessert = cartList.map(x => x.name === dessertName ?
      { ...x, quantity: x.quantity + 1 }
      : x);
    setCartList(updatedDessert);
    UpdatedTotalPrice(updatedDessert);

  }

  function UpdatedTotalPrice(leftDesserts) {
    const newTotalPrice = leftDesserts.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(newTotalPrice.toFixed(2));
  }

  function deleteDessert(dessertItem) {
    const leftDesserts = cartList.filter(x => x.name != dessertItem);
    setCartList(leftDesserts);
    const newTotalPrice = leftDesserts.reduce((sum, item) => sum + item.quantity * item.price, 0);
    setTotalPrice(newTotalPrice);
    UpdatedTotalPrice(leftDesserts);
  }

  return (
    <div className="container">
      <div className="inner-container">
        <h1 className="header">Desserts</h1>
        <div className="shopArea">
          {cartList.length > 0 ?
            (
              <>
                <Desserts onDessertClick={handleDessertAdd} IncreaseDessertCount={IncreaseDessertCount}
                  DecreaseDessertCount={DecreaseDessertCount} cartList={cartList} />
                <Basket cartList={cartList} totalPrice={totalPrice} deleteDessert={deleteDessert}
                  onOpenModal={handleOpenModal} IncreaseDessertCount={IncreaseDessertCount} DecreaseDessertCount={DecreaseDessertCount} />
              </>
            )
            :
            (
              <>
                <Desserts onDessertClick={handleDessertAdd} IncreaseDessertCount={IncreaseDessertCount} DecreaseDessertCount={DecreaseDessertCount} />
                <Cart />
              </>
            )

          }
          {isModalOpen && (
            <ModalPage cartList={cartList} totalPrice={totalPrice} onCloseModal={handleCloseModal} />
          )}

        </div>
      </div>
    </div>
  )
}



function Desserts({ onDessertClick, IncreaseDessertCount, DecreaseDessertCount, cartList }) {
  const dessertItem = product.map(x => <Dessert key={x.name} name={x.name}
    category={x.category} price={x.price} img={x.img} onDessertClick={() => onDessertClick(x)}
    IncreaseDessertCount={() => IncreaseDessertCount(x.name)}
    DecreaseDessertCount={() => DecreaseDessertCount(x.name)}
    cartList={cartList} />)

  return (
    <div className="desserts">{dessertItem}</div>
  )

}

function Dessert({ cartList = [], name, category, price, img, onDessertClick, DecreaseDessertCount, IncreaseDessertCount }) {

  const addedDessert = cartList.find(x => x.name === name);

  return (
    <div className="dessertItem">
      <img src={img} alt={name} className={addedDessert ?
        'dessert-image-selected' :
        'dessert-img'
      } />
      <h4>{category}</h4>
      <h5>{name}</h5>
      <p>${price}</p>
      {
        addedDessert ? (
          <div className="plus-minus">
            <img onClick={DecreaseDessertCount} src="/img/minus-icon.svg" alt="" />
            <span>{addedDessert.quantity}</span>
            <img onClick={IncreaseDessertCount} src="/img/plus-icon.svg" alt="" />
          </div>
        ) : (
          <div className="add-btn" onClick={onDessertClick}>
            <img src="/img/cart.svg" alt="" />
            <span>Add to Cart</span>
          </div>
        )
      }
    </div>
  )
}

function Cart() {
  return (
    <div className="cartArea">
      <h2>Your Cart (0)</h2>
      <div>
        <img className="cookieImage" src="/img/cart-cookie.svg" alt="" />
      </div>
      <p>Your added items will appear here</p>

    </div>
  )
}

function Basket({ cartList, totalPrice, deleteDessert, onOpenModal }) {
  return (
    <div className="cart-list-container">
      <h3 className='cart-header'>Your Cart <span>({cartList.length})</span></h3>
      <ul className='order-area-list'>
        {
          cartList.map(x =>
          (<li key={x.name}>
            <div className="dessert-cart">
              <h4 className='dessert-name'>{x.name}</h4>
              <div className="dessert-info">
                <h5 className='dessert-quantity'>{x.quantity}x</h5>
                <p className='unit-price'>@${(x.price).toFixed(2)}</p>
                <p>${(x.quantity * x.price).toFixed(2)}</p>
              </div>
            </div>
            <div className="delete-btn">
              <img onClick={() => deleteDessert(x.name)} src="/img/remove-icon.svg" alt="" />
            </div>
          </li>))
        }
      </ul>
      <div className="totalPriceArea">
        <h3>Order Total</h3>
        <p className='price'>${totalPrice}</p>
      </div>
      <div className="carbon-info-box">
        <img src="/img/carbon-tree.svg" alt="Carbon Tree Image" />
        <p>
          This is a <span>carbon-neutral</span> delivery
        </p>
      </div>
      <div className="confirm-order">
        <button onClick={onOpenModal} className="confirmBtn">Confirm Order</button>
      </div>
    </div>
  )
}

function ModalPage({ cartList, totalPrice, onCloseModal }) {
  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <img src="/public/img/chechmark-icon.svg" alt="" />
            <h2>Order Confirmed</h2>
            <p>We hope you enjoy your food!</p>
          </div>
          <div className="inner-modal-container">
            <ul className="modal-dessert-list">
              {cartList.map((item) => (
                <li className='modal-li' key={item.name}>
                  <div className="modal-dessert-cart">
                    <img src={item.img} alt={item.name} />
                    <div className="dessert-info">
                      <h5>{item.name}</h5>
                      <div className="modal-dessert-quantity-info">
                        <p>{item.quantity}x</p>
                        <span className="originalPrice">@{(item.price).toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="perPrice">
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-total-price">
            <h4>Order Total</h4>
            <p>${totalPrice}</p>
          </div>
          <div className="new-order">
            <button onClick={onCloseModal} className="newOrderBtn">Start New Order</button>
          </div>
        </div>
      </div>
    </>
  )
}


export default App;
