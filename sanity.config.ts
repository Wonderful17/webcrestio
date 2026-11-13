import {defineConfig} from 'sanity';import {structureTool} from 'sanity/structure';
import project from './sanity/schemas/project';import post from './sanity/schemas/post';import review from './sanity/schemas/review';
export default defineConfig({name:'webcrestio',title:'Webcrestio',basePath:'/studio',projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||'production',plugins:[structureTool()],schema:{types:[project,post,review]}});
