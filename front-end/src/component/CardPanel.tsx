import { Link } from "react-router-dom";
import { IProduct } from "../interfaces/Product";


const CardPanel = ({product} : {product : IProduct}) => {
  
  return (
    <div className="cardPanel" >
        <div className="product-item"  >
          <div className="product-image">
            <img
              src={product.image}
              alt=""
              className="product__thumbnail"
            />
            <span className="product-sale">30%</span>
          </div>
          <div className="product-info">
            <h3 className="product__name">
              <a href="" className="product__link">
                {product.name}
              </a>
            </h3>
            <a href="" className="product__category">
              {product.desc}
            </a>
            <div className="product-price">
              <span className="product-price__new">${product.price}</span>

            </div>
          </div>
          <div className="product-actions">
            <Link to={`/detailProduct/${product._id}`} className="btn product-action__quickview">
              Quick View
            </Link>
            <button className="btn product-action__addtocart">
              Add To Cart
            </button>
          </div>
        </div>
    </div>
  );
};

export default CardPanel;