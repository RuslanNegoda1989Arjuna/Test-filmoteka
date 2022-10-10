import { Loading } from 'notiflix/build/notiflix-loading-aio';

//FT-21 Loader (Barabash)
export const startLoader = Loading.dots('Please wait...', {
    backgroundColor: 'rgba(0,0,0,0.5)',
    svgSize: '200',
    svgColor: '#ff6b09',
    // messageFontSize:'40px',
    messageColor: '',
  });
  
export const removeLoader = Loading.remove(2000);
  