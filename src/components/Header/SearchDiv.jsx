export const SearchDiv = () => {
  return (
    <div className="header__searchProducts">
      <button
        onClick={closeSearchProducts}
        className="searchProducts__btnClose"
      >
        <img className="btnClose__img" src={icon_close} alt="close" />
      </button>
      {resultSearchProducts.length === 0 && (
        <p className="searchProducts__message">Not Found Products!</p>
      )}
      {products &&
        resultSearchProducts.map((product) => (
          <SearchProduct
            closeSearchProducts={closeSearchProducts}
            key={product._id}
            id={product._id}
            img={product.img}
            category={product.category}
            brand={product.brand}
            color={product.color}
            description={product.description}
            price={product.price}
          />
        ))}
    </div>
  );
};
