import imageUrlBuilder from '@sanity/image-url';import {readClient} from './sanity';
const b=imageUrlBuilder(readClient);export const urlFor=(s:any)=>b.image(s);
