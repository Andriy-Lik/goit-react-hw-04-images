import axios from 'axios';

const searchImages = async (request, page) => {
    const response = await axios.get(`https://pixabay.com/api/`, {
        params: {
            key: '31735477-5baa73130af622235607cbe24',
            q: request,
            image_type: 'photo',
            orientation: 'horizontal',
            page: page,
            per_page: 12,
            safesearch: true,
        },
    });
    
    return response.data;
};

export default searchImages;