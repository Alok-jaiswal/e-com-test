import axios from "axios";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import styles from "../../styles/productDetails.module.scss";
import { FaShoppingCart, FaStar, FaTruck } from "react-icons/fa";
import { MdHome } from "react-icons/md";

export async function getServerSideProps({ params }) {
  const response = await axios.get(
    `https://fakestoreapi.com/products/${params.id}`
  );
  const product = response.data;
  return {
    props: {
      product,
    },
  };
}

export default function ProductDetails({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating.rate);
    const hasHalfStar = rating.rate - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className={styles.star} />);
      } else if (hasHalfStar && i === fullStars) {
        stars.push(
          <FaStar key={i} className={`${styles.star} ${styles.halfStar}`} />
        );
      } else {
        stars.push(<FaStar key={i} className={styles.emptyStar} />);
      }
    }
    return stars;
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.title} className={styles.image} />
      </div>
      <div className={styles.detailsContainer}>
        <div className={styles.detailsScrollable}>
          {" "}
          {/* Added scrollable container */}
          <h1 className={styles.title}>{product.title}</h1>
          <div className={styles.rating}>
            {renderStars(product.rating)}
            <span className={styles.ratingCount}>
              ({product.rating.count} reviews)
            </span>
          </div>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <p className={styles.category}>{product.category}</p>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.shipping}>
            <FaTruck className={styles.shippingIcon} />
            <span>Free Shipping</span>
          </div>
        </div>
        <div className={styles.addToCartContainer}>
          <button
            className={styles.addToCart}
            onClick={() => window.history.back()}
          >
            <MdHome className={styles.cartIcon} />
            Home
          </button>
          <button className={styles.addToCart} onClick={handleAddToCart}>
            <FaShoppingCart className={styles.cartIcon} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
