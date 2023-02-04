const StarRating = (props) => {
  let stars = null;
  if (props.rating === 1) {
    stars = (
      <>
        <span className="fa fa-star-o"></span>
        <span className="fa fa-star-o"></span>
        <span className="fa fa-star-o"></span>
        <span className="fa fa-star-o"></span>
        <span className="fa fa-star"></span>
      </>
    );
  } else if (props.rating > 1 && props.rating < 2) {
    stars = (
      <>
        <span className="fa fa-star-o"></span>
        <span className="fa fa-star-o"></span>
        <span className="fa fa-star-o"></span>
        <span className="fa fa-star-half"></span>
        <span className="fa fa-star"></span>
      </>
    );
  } else if (props.rating === 2) {
    stars = (
      <>
        <span className="fa fa-star-o"></span>
        <span className="fa fa-star-o"></span>
        <span className="fa fa-star-o"></span>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
      </>
    );
  } else if (props.rating > 2 && props.rating < 3) {
    stars = (
      <>
        <span className="fa fa-star-o"></span>
        <span className="fa fa-star-o"></span>
        <span className="fa fa-star-half"></span>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
      </>
    );
  } else if (props.rating === 3) {
    stars = (
      <>
        <span className="fa fa-star-o"></span>
        <span className="fa fa-star-o"></span>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
      </>
    );
  } else if (props.rating > 3 && props.rating < 4) {
    stars = (
      <>
        <span className="fa fa-star-o"></span>
        <span className="fa fa-star-half"></span>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
      </>
    );
  } else if (props.rating === 4) {
    stars = (
      <>
        <span className="fa fa-star-o"></span>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
      </>
    );
  } else if (props.rating > 4 && props.rating < 5) {
    stars = (
      <>
        <span className="fa fa-star-half"></span>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
      </>
    );
  } else if (props.rating === 5) {
    stars = (
      <>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
      </>
    );
  }

  return <>{stars}</>;
};

export default StarRating;
