import React from "react";

const Review = () => {
  return (
    <div>
      <div className="review-bigcontainer">
        <div className="line-container">
          <span className="labelline" id="review">
            Review
          </span>
          <div className="line-with-bend"></div>
        </div>
        <div className="review-header">
          <div className="review-container">
            <div className="review-container__left">
              <h1>
                See what our students are saying in their college reviews!
              </h1>
            </div>
            <div className="review-container__right">
              <div className="card">
                <img src="./images/user.png" alt="user" />
                <div className="card__content">
                  <span>
                    <i className="ri-double-quotes-l"></i>
                  </span>
                  <div className="card__details">
                    <p>
                      We had a great time collaboraring with the Filament team.
                      They have my high recommendation!
                    </p>
                    <h4>- Marnus Stephen</h4>
                  </div>
                </div>
              </div>
              <div className="card">
                <img src="./images/user.png" alt="user" />
                <div className="card__content">
                  <span>
                    <i className="ri-double-quotes-l"></i>
                  </span>
                  <div className="card__details">
                    <p>
                      The team drastically improved our product's user
                      experience & increased our business outreach.
                    </p>
                    <h4>- Andrew Jettpace</h4>
                  </div>
                </div>
              </div>
              <div className="card">
                <img src="./images/user.png" alt="user" />
                <div className="card__content">
                  <span>
                    <i className="ri-double-quotes-l"></i>
                  </span>
                  <div className="card__details">
                    <p>
                      I absolutely loved working with the Filament team.
                      Complete experts at what they do!
                    </p>
                    <h4>- Stacy Stone</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
