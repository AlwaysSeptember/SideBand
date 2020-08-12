import {h, Component} from "preact";

import { registerMessageListener, unregisterListener } from "danack-message";
import {EventType} from "./events";
import {SoundType} from "./sounds";
import {sendMessage} from "danack-message";

export interface ConnectionPanelProps {
    username: string;
}

interface ConnectionPanelState {
    // ws: WebSocket|null;
    connection_state: string;
}


export class CommsPanel extends Component<ConnectionPanelProps, ConnectionPanelState> {

    connectInterval:number = null;
    timeout:number = 250; // Initial timeout duration as a class variable
    ws:WebSocket|null =  null;
    message_listener:number = 0;

    constructor(props: ConnectionPanelProps) {
        super(props);

        this.state = {
            connection_state: "Init"
        };
    }

    // single websocket instance for the own application and constantly trying to reconnect
    componentDidMount() {
        this.connect();

        this.message_listener = registerMessageListener(
            EventType.trigger_sound,
            (data: any) => this.sendSound(data)
        );
    }

    componentWillUnmount() {
        unregisterListener(
            this.message_listener
        );
    }

    sendSound(data:Object) {
        console.log("sendSound");
        console.log(data);

        let sound_data = {
            username: this.props.username,
            // @ts-ignore: yeah, this needs a type
            type: data.type
        };

        this.ws.send(JSON.stringify(sound_data));
    }

    onMessage(messageEvent :MessageEvent ){
        console.log("Received data");
        console.log(messageEvent.data);
        let sound_data = JSON.parse(messageEvent.data);
        sendMessage(
            EventType.received_sound,
            sound_data
        );
    }

    onClose(e:any) {
        console.log(
            `Socket is closed. Reconnect will be attempted in ${Math.min(
                10000 / 1000,
                (this.timeout + this.timeout) / 1000
            )} second.`,
            e.reason
        );

        //increment retry interval
        this.timeout = this.timeout + this.timeout;

        //call check function after timeout
        // @ts-ignore: Timeout blah blah
        this.connectInterval = setTimeout(
            this.check,
            Math.min(10000, this.timeout)
        );
    };

    onError(err:any) {
        console.error(
            "Socket encountered error: ",
            // @ts-ignore: message so does exist
            err.message,
            "Closing socket"
        );
        this.setState({
            connection_state: "Errored"
        });

        this.ws.close();
    };



    onOpen() {
        console.log("connected websocket main component");
        this.setState({
              connection_state: "Open"
          });

        this.timeout = 250; // reset timer to 250 on open of websocket connection
        clearTimeout(this.connectInterval); // clear Interval on on open of websocket connection
    };

    /**
     * @function connect
     * This function establishes the connect with the websocket and also ensures constant reconnection if connection closes
     */
    connect = () => {
        // this.ws = new WebSocket("ws://localhost:8001/broadcast");
        this.ws = new WebSocket("ws://sideband.septemberalways.com/broadcast");
        this.ws.onopen = () => this.onOpen;
        this.ws.onmessage = (messageEvent: MessageEvent) => this.onMessage(messageEvent);
        this.ws.onclose = e => this.onClose(e);
        this.ws.onerror = err => this.onError(err);
    };

    /**
     * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
     */
    check = () => {
        //check if websocket instance is closed,
        if (!this.ws || this.ws.readyState == WebSocket.CLOSED) {
            // reconnect
            this.connect();
        }
    };

    render() {
        // return <ChildComponent websocket={this.state.ws} />;
        //connection_state is {this.state.connection_state}
        return <div>
            &nbsp;
        </div>
    }
}