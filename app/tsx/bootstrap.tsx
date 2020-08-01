// import "preact/debug";

if (process.env.NODE_ENV==='development') {
    // Must use require here as import statements are only allowed
    // to exist at the top of a file.
    require("preact/debug");
}

import { h, render } from "preact";
import { SideBandPanel } from "./SideBandPanel";
import { CommsPanel } from "./CommsPanel";
import { PeopleListPanel } from "./PeopleListPanel";



import initByClass from "widgety";
import type { WidgetClassBinding } from "widgety";
import { startMessageProcessing } from "danack-message";


let panels: WidgetClassBinding[] = [
    {
        class: 'side_band_panel',
        component: SideBandPanel
    },
    // {
    //     class: 'comms_panel',
    //     component: CommsPanel
    // },

    {
        class: 'people_list_panel',
        component: PeopleListPanel
    },





];

initByClass(panels, h, render);

startMessageProcessing();

console.log("bootstrap finished");

