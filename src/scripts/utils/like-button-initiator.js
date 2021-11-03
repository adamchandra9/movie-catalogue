import {
  createLikeButtonTemplate,
  createLikedButtonTemplate,
} from "../views/templates/template-creator";

import FavoriteMovieIdb from "../data/favoritemovie-idb";

const LikeButtonInitaiator = {
  async init({ likeButtonContainer, movie }) {
    this._likeButtonContainer = likeButtonContainer;
    this._movie = movie;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._movie;

    if (await this._isMovieExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isMovieExist(id) {
    const movie = await FavoriteMovieIdb.getMovie(id);
    console.log(movie);
    return !!movie;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector("#likeButton");
    likeButton.addEventListener("click", async () => {
      await FavoriteMovieIdb.putMovie(this._movie);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate();

    const likedButton = document.querySelector("#likedButton");
    likedButton.addEventListener("click", async () => {
      await FavoriteMovieIdb.deleteMovie(this._movie.id);
      this._renderButton();
    });
  },
};
export default LikeButtonInitaiator;
