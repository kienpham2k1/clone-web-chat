import Content from "./content";
import SafetyRating from "./SafetyRating";

export default interface Candidate {
    content: Content
    finishReason: string;
    index: number
    safetyRatings: SafetyRating[];
}