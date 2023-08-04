import "./styles.css";
import { useEffect, useState } from "react";
// https://dummyjson.com/products?limit=100

export default function App() {
  //to store and keep data in some variable.
  const [products, setProducts] = useState([]);

  //for pagination, to store page no.
  const [page, setPage] = useState(1);

  //fetchProducts() is used to fetch the data from the api.
  //since the api call is asyncronous in nature there we use await in fetch() call so that the response will wait until the promise is being resolved.
  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    if (data && data.products) setProducts(data.products);

    // console.log(products);
  };

  /* useEffect takes two parameter 1. Callback fun  2.dependency array useEffect is used to show 
  the run and fetchProduct function and if you keep the dependency array empty it means it will 
  only run for the one time whenever the component is rendered. */
  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  // map() is a array func in js.
  // "product__single" is a way of writing css name called BEM convention.

  return (
    <div className="App">
      {products.length > 0 && (
        <div className="products">
          {" "}
          {products.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <span className="product__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disable"}
            onClick={() => selectPageHandler(page - 1)}
          >
            🔙
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={page < products.length / 10 ? "" : "pagination__disable"}
            onClick={() => selectPageHandler(page + 1)}
          >
            ⏩
          </span>
        </div>
      )}
    </div>
  );
}
