import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { getProductDeatails } from "../../actions/productAction";
import "./ProductDetails.css";
const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  useEffect(() => {
    dispatch(getProductDeatails(match.params.id));
  }, [dispatch, match.params.id]);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 10 : 20,
    value: product.ratings,
    isHalf: true,
  };
  return (
    <Fragment>
      <div className="ProductDetails">
        <div className="col1">
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="CorouselImage"
                  key={item.url}
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ))}
          </Carousel>
        </div>

        <div className="col2">
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>
          <div className="detailsBlock-2">
            <ReactStars {...options} />
            <span>({product.numOfReviews}Reviews)</span>
          </div>
          <div className="detailsBlock-3">
            <h1>{`₹${product.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button>-</button>
                <input value="1" type="number" />
                <button>+</button>
              </div>{" "}
              <button>Add to Cart</button>
            </div>
            <p>
              Status:{" "}
              <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                {product.Stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>
          <div className="detailsBlock-4">
            Description:<p>{product.description}</p>
          </div>
          <button className="submitReview">Submit Review</button>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetails;
