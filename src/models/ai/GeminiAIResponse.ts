import Candidate from "./Candidate"
import UsageMetadata from "./UsageMetadata"

export default interface GeminiAIResponse {
    candidates: Candidate[]
    usageMetadata: UsageMetadata
}