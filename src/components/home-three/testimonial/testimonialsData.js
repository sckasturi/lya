import csvText from "./Leverage_Your_ADHD_Coaching_Optimized_Testimonials.csv?raw";
import { parseTestimonialsCsv } from "./parseTestimonialsCsv";

export const testimonialsData = parseTestimonialsCsv(csvText);
