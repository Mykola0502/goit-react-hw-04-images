import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
export const fetchPictures = async (query, page) => {
  try {
    const response = await axios.get('', {
      params: {
        key: '31583377-fa4c6976355a1f179c9a11dc6',
        q: query,
        page: page,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
