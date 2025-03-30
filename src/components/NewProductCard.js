import styles from "../styles/NewProductCard.module.scss";
import { useEffect, useState } from "react";
import ProductDetailsModal from "./ProductDetailsModal";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";
import dynamic from "next/dynamic";
import Link from "next/link";
const ReactStars = dynamic(() => import("react-rating-stars-component"), {
  ssr: false,
});

const NewProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddToCart = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    dispatch(addItem(product));
  };

  if (!product) {
    return <div>Product not available.</div>; 
  }

  return (
    <Link href={`/product/${product.id}`} passHref>
      <div className={styles.card}>
        <div className={styles.cardBox}>
          <button className={styles.fab} onClick={handleAddToCart}>
            🛒
          </button>
          <img
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className={styles.productImage}
          />
        </div>
        <div className={styles.cardContent}>
          <a className={styles.productLink}>{product.title}</a>
          <div className={styles.cardFooter}>
            <div className={styles.price}>
              <span className={styles.priceCurrent}>
                ${product.price?.toFixed(2)}
              </span>
            </div>
            <p className={styles.category}>{product.category}</p>
          </div>
          {isClient && product.rating && (
            <div>
              <ReactStars
                count={5}
                value={product.rating.rate}
                size={24}
                activeColor="#ffd700"
                edit={false}
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default NewProductCard;