import {defineType,defineField} from 'sanity';
// Reviews arrive with approved=false. Tick "Approved" to publish; untick to hide.
export default defineType({name:'review',title:'Review',type:'document',fields:[
defineField({name:'approved',type:'boolean',initialValue:false,description:'Only approved reviews appear on the website.'}),
defineField({name:'name',type:'string',readOnly:true}),
defineField({name:'store',type:'string',title:'Store name',readOnly:true}),
defineField({name:'rating',type:'number',readOnly:true}),
defineField({name:'text',type:'text',readOnly:true}),
defineField({name:'email',type:'string',readOnly:true,description:'Private. Never queried by the public site.'}),
defineField({name:'submittedAt',type:'datetime',readOnly:true})],
preview:{select:{title:'name',subtitle:'text',approved:'approved'},prepare:({title,subtitle,approved}:any)=>({title:`${approved?'✓':'⏳'} ${title}`,subtitle})}});
