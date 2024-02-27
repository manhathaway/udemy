import { CONCEPTS } from "../../data";
import Section from "../Section";
import CoreConcept from "./CoreConcept";

export default function CoreConcepts() {
    return (
        <Section id="core-concepts" title="Core Concepts">
            <ul>
                {CONCEPTS.map((concept, index) => <CoreConcept key={index} {...concept} />)}
            </ul>
        </Section>
    );
};