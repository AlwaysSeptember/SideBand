
import { h, render } from "preact";
import {EventType} from "./events";
import {sendMessage} from "danack-message";

export interface SoundButtonProps {
  text: string;
  type: string;

}

function clickWasPressed(type: string) {
  sendMessage(
      EventType.trigger_sound,
      {type: type}
  );
}

export function SoundButtonPanel(props: SoundButtonProps) {

  return <button onClick={() => clickWasPressed(props.type)}>{props.text}</button>;
}



