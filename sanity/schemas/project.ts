import {defineType,defineField} from 'sanity';
export default defineType({name:'project',title:'Portfolio project',type:'document',fields:[
defineField({name:'title',type:'string',validation:r=>r.required()}),
defineField({name:'slug',type:'slug',options:{source:'title'},validation:r=>r.required()}),
defineField({name:'category',type:'string',description:'e.g. Beauty & skincare'}),
defineField({name:'label',type:'string',initialValue:'Concept project',description:'Use "Concept project" unless this is real, approved client work.'}),
defineField({name:'summary',type:'text',rows:3}),
defineField({name:'brief',type:'text',rows:3}),
defineField({name:'approach',type:'text',rows:3}),
defineField({name:'highlights',type:'array',of:[{type:'string'}]}),
defineField({name:'heroImage',type:'image',options:{hotspot:true},fields:[{name:'alt',type:'string',title:'Alt text'}]}),
defineField({name:'gallery',type:'array',of:[{type:'image',fields:[{name:'alt',type:'string',title:'Alt text'},{name:'caption',type:'string'}]}]}),
defineField({name:'videoUrl',type:'url',title:'Video file URL (optional)'}),
defineField({name:'order',type:'number'})],
preview:{select:{title:'title',media:'heroImage'}}});
