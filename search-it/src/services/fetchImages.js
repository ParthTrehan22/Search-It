import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: "MZg0kz21lnxkcsvvhr-zOIC_5zJq3RDw59NB0FXrdSc",
});

const fetchImages = (query, page = 1) =>
  new Promise((resolve, reject) => {
    unsplash.search
      .getPhotos({
        query,
        page,
        perPage: 30,
        w: 200,
        fit: "max",
      })
      .then((result) => {
        resolve(result.response.results.map((result) => result.urls.regular));
      });
  });

export default { fetchImages };
