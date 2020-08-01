import {h, Component} from "preact";

import { SoundButtonPanel } from "./SoundButtonPanel";
import {EventType} from "./events";
import { registerMessageListener, unregisterListener } from "danack-message";
// import useSound from "use-sound";
// import boopSfx from '../sounds/dun-dun-dun.mp3';

import { CommsPanel } from "./CommsPanel";

import {SoundType} from "./sounds";
import {ChangeEvent} from "react";

const {Howl, Howler} = require('howler');

export interface SideBandPanelProps {
    // api_url: string;
}

interface SideBandPanelState {
    username: string;
    usernameInput: string;
    volume: number;
}

function getDefaultState(/*initialControlParams: object*/): SideBandPanelState {
    return {
        username: null,
        usernameInput: "",
        volume: 0.4
    };
}

export class SideBandPanel extends Component<SideBandPanelProps, SideBandPanelState> {

    constructor(props: SideBandPanelProps) {
        super(props);
        this.state = getDefaultState();
    }

    componentDidMount() {
        registerMessageListener(
            EventType.received_sound,
            "SideBandPanel_1",
            (data: any) => this.playSound(data)
        );
    }

    componentWillUnmount() {
        unregisterListener(
            EventType.trigger_sound,
            "SideBandPanel_1"
        );
    };

    playSound(data: any) {
        let filenames = {
            'boop': '/sounds/dun-dun-dun.mp3',
            'meow': '/sounds/meow.mp3',
            'click': '/sounds/pop.mp3',
            'question': '/sounds/question.mp3'
        };

        if(filenames.hasOwnProperty(data.type) !== true) {
            console.error("unknown sound type");
            console.error(data.type);
        }

        // @ts-ignore: yeah, this needs to be typed
        let filename = filenames[data.type];

        console.log("playing sound");
        // const params = {
        //     onend: () => {
        //         console.info('Sound ended!');
        //     },
        //     interrupt: true,
        // };

        var sound = new Howl({
            src: [filename],
            volume: this.state.volume,
        });

        sound.play();
    };


    handleChange(event:any) {
        this.setState({usernameInput: event.target.value});
    }

    setUsername() {
        this.setState({username: this.state.usernameInput});
    }

    changeVolume(event:any) {

        let new_value = parseFloat(event.currentTarget.value);
        if (new_value > 1.0) {
            new_value = 1.0;
        }

        if (new_value < 0.0) {
            new_value = 0.0;
        }

        this.setState({volume: new_value})
    }

    render(props: SideBandPanelProps, state: SideBandPanelState) {

        if (this.state.username === null) {
            return <div>
                <div>Who are you?</div>
                <div>
                    <input type="text"
                           value={this.state.usernameInput}
                           onChange={(event:any) => this.handleChange((event))} />
                    <button onClick={() => this.setUsername()}>Set username</button>
                </div>
            </div>
        }

        return  <div class='motions_panel_react'>
            Volume: <input
            type='number'
            value={this.state.volume}
            onChange={(event) => this.changeVolume(event)}
        />

            <CommsPanel username={this.state.username}/><br/>

            <SoundButtonPanel text={"Click"} type={"click"}/>
            <SoundButtonPanel text={"Meow?"} type={"meow"}/>
            <SoundButtonPanel text={"Question"} type={"question"}/>
            <SoundButtonPanel text={"Dun dun dun"} type={"boop"}/>
        </div>;
    }
}










