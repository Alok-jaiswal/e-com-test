// import styles from "../styles/filter.module.scss";

// export default function Filter({ products, onFilter }) {
//   const categories = [
//     "all",
//     ...new Set(products.map((product) => product.category)),
//   ];

//   return (
//     <div className={styles.filter}>
//       <h3>Filter by Category</h3>
//       {categories.map((category) => (
//         <button key={category} onClick={() => onFilter(category)}>
//           {category}
//         </button>
//       ))}
//     </div>
//   );
// }

import styles from "../styles/filter.module.scss";

export default function Filter({ products, onFilter, selectedCategory }) {
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <div className={styles.filter}>
      <h3>Filter by Category</h3>
      <select
        value={selectedCategory}
        onChange={(e) => onFilter(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}