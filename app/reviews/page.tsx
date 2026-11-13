import type {Metadata} from 'next';import ReviewSection from '@/components/ReviewSection';import {getApprovedReviews} from '@/lib/sanity';
export const metadata:Metadata={title:'Reviews',description:'Feedback from the people we work with.'};
export default async function Reviews(){const reviews=await getApprovedReviews();
return(<><section className="ph"><div className="w"><div className="eb">Reviews</div><h1>Feedback from the people <em>we work with.</em></h1><p className="lead">Real experiences help future clients understand what it’s like to work with Webcrestio.</p></div></section><ReviewSection reviews={reviews}/><div style={{height:60}}/></>)}
