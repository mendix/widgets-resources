import { CSSProperties, Component, createElement } from "react";
import { HeightUnitType, SizeContainer, WidthUnitType } from "./SizeContainer";
import classNames = require("classnames");
import { VideoPlayer } from "./VideoPlayer";

export interface VideoPlayerContainerProps {
    "class"?: string;
    style?: CSSProperties;
    urlAttribute?: PluginWidget.EditableValue<string>;
    urlValue?: string;

    widthUnit: WidthUnitType;
    width: number;
    heightUnit: HeightUnitType;
    height: number;

    autoStart: boolean;
    showControls: boolean;
}

export default class VideoPlayerContainer extends Component<VideoPlayerContainerProps> {

    render() {
        return createElement(SizeContainer,
            {
                className: classNames("video-player-container", this.props.class),
                style: this.props.style,
                widthUnit: this.props.widthUnit,
                width: this.props.width,
                heightUnit: this.props.heightUnit,
                height: this.props.height
            }, createElement(VideoPlayer, {
                url: this.props.urlAttribute ? this.props.urlAttribute.value! : "",
                staticUrl: this.props.urlValue || "",
                className: this.props.class,
                autoStart: this.props.autoStart,
                showControls: this.props.showControls
            }));
    }

}
