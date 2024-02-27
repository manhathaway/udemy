import { EXAMPLES } from "../../data";
import Section from "../Section";
import Tabs from "./Tabs";
import Tab from "./Tab";
import TabContent from "./TabContent";

export default function Examples(props) {
    return (
        <Section id="examples" title="Examples">
            <Tabs buttons={props.tabs.map((tab, index) => <Tab key={index} onClick={() => props.function(index)}>{tab}</Tab>)}>
                {props.index.tab ? <TabContent {...EXAMPLES[props.index.tab]} /> : <div id="tab-content"><h3>No tab selected.</h3></div>}
            </Tabs>
        </Section>
    );
};