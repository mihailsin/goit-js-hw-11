const axios = require('axios');
export async function fetchPictures(url) {
  const response = await axios.get(url);
  const pictures = await response.data;

  return pictures;
}
