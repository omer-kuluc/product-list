import { product } from '../public/assets/data/desserts.jsx';

function App() {

  return (
    <div className="container">
      <div className="inner-container">
        <h1 className = "header">Desserts</h1>
        <div className="shopArea">
          <Desserts />
          <Cart />
        </div>
      </div>
    </div>
  )
}


function Desserts() {
  const dessertItem = product.map(x => <Dessert key = {x.id} name = {x.name}
    category = {x.category} price = {x.price} img = {x.img} /> )

    return(
      <div className="desserts">{dessertItem}</div>
    )

}


function Dessert({name, category, price, img}) {
  return(
    <div className="dessertItem">
      <img src={img} alt={name} />
      <h4>{category}</h4>
      <h5>{name}</h5>
      <p>${price}</p>
      <button>
        <img src="/public/assets/img/cart.svg" alt="" />
        Add to Card
        </button>
    </div>
  )
}

function Cart() {
  return (
    <div className="cartArea">
      <h2>Your Cart(0)</h2>
        <div>
          <img className="cookieImage" src="../public/assets/img/cart-cookie.svg" alt="" />
        </div>
      <p>Your added items will appear here</p>

    </div>
  )
}

export default App;
