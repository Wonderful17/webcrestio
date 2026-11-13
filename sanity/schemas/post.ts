import {defineType,defineField} from 'sanity';
export default defineType({name:'post',title:'Blog post',type:'document',fields:[
defineField({name:'title',type:'string',validation:r=>r.required()}),
defineField({name:'slug',type:'slug',options:{source:'title'},validation:r=>r.required()}),
defineField({name:'publishedAt',type:'datetime',initialValue:()=>new Date().toISOString()}),
defineField({name:'excerpt',type:'text',rows:3,validation:r=>r.max(220)}),
defineField({name:'coverImage',type:'image',options:{hotspot:true},fields:[{name:'alt',type:'string',title:'Alt text'}]}),
defineField({name:'body',type:'array',of:[{type:'block'},{type:'image',fields:[{name:'alt',type:'string'}]}]}),
defineField({name:'seoDescription',type:'string',validation:r=>r.max(160)})],
orderings:[{title:'Newest',name:'new',by:[{field:'publishedAt',direction:'desc'}]}],preview:{select:{title:'title',media:'coverImage'}}});
