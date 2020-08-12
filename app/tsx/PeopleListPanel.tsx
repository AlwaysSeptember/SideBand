import {h, Component} from "preact";

import { SoundButtonPanel } from "./SoundButtonPanel";
import {EventType} from "./events";
import { registerMessageListener, unregisterListener } from "danack-message";


export interface PeopleListPanelProps {

}

interface SoundEvent {
    type: string;
    username: string;
    time: number;
}

interface PeopleListPanelState {
    soundEvents: Array<SoundEvent>;
}

function is_over_seconds_ago (date: number, seconds: number) {
    const previous_time = Date.now() - (1000 * seconds);

    return date < previous_time;
}

export class PeopleListPanel extends Component<PeopleListPanelProps, PeopleListPanelState> {

    listClearing: any = null;
    message_listener:number = 0;

    constructor(props: PeopleListPanelProps) {
        super(props);
        this.state = {
            soundEvents: []
        };
    }

    componentDidMount() {
        this.message_listener = registerMessageListener(
            EventType.received_sound,
            (data: any) => this.listPerson(data)
        );

        this.listClearing = setInterval(() => this.clearList(), 1000);
    }

    componentWillUnmount() {
        unregisterListener(
            this.message_listener
        );

        clearInterval(this.listClearing)
    }

    clearList() {
        let newList = [];

        for (var soundEvent of this.state.soundEvents) {
            if (is_over_seconds_ago(soundEvent.time, 20) === true) {
                continue;
            }

            newList.push(soundEvent);
        }

        if (newList.length !== this.state.soundEvents.length) {
            this.setState({soundEvents: newList})
        }
    }

    listPerson(data: any) {
        if (!data.type) {
            return;
        }
        if (!data.username) {
            return;
        }

        let soundEvent:SoundEvent = {
            type: data.type,
            username: data.username,
            time: Date.now()
        };

        let newSoundEvents = this.state.soundEvents;
        newSoundEvents.unshift(soundEvent);
        newSoundEvents = newSoundEvents.slice(0, 20);

        this.setState({soundEvents: newSoundEvents});
    };

    render(props: PeopleListPanelProps, state: PeopleListPanelState) {
        let soundEventsBlah = this.state.soundEvents.map(
            (item, key) =>
                <li key={key}>{item.type} : {item.username}</li>
        );

        return  <div>
            <h3>Click list</h3>

            {soundEventsBlah}
        </div>;
    }
}










