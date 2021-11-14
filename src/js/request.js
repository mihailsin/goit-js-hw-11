const axios = require('axios');
// export async function fetchPictures(url) {
//   const response = await axios.get(url);
//   const pictures = await response.data;

//   return pictures;
// }

export default class PixabayApi {
  constructor() {
    this.searchQuery = '';
  }

  async fetchPictures(url) {
    const KEY = '24271792-2ae9c4be49492e469cc4e2f34';
    const REQUEST_PARAMS = 'image_type=photo&orientation=horizontal&safesearch=true';
    const BASE_URL = 'https://pixabay.com/api/';
    const response = await axios.get(url);
    const pictures = await response.data;

    return pictures;
  }
  incrementPage() {}
}
