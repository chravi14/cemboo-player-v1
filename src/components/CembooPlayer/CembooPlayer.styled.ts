import styled from "styled-components";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReplayIcon from "@mui/icons-material/Replay";
import PauseIcon from "@mui/icons-material/Pause";
import Replay10Icon from "@mui/icons-material/Replay10";
import Forward10Icon from "@mui/icons-material/Forward10";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import SettingsIcon from "@mui/icons-material/Settings";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

export const CSSVariables = styled.div<{ seekBarWidth: number }>`
  --bar-bg: #ffe3d4;
  --seek-before-width: ${(props: any) => props.seekBarWidth};
  --seek-before-color: #b7f84d;
  --knobby: #3452a5;
  --selectedKnobby: #26c9c3;
`;

export const VideoContainer = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  // TODO: Remove top styles after

  position: relative;
  & > * {
    box-sizing: border-box;
  }
  font-family: "Open Sans", sans-serif;
`;

export const CustomVideo = styled.video`
  width: 100%;
  cursor: pointer;
  &::-webkit-media-controls-timeline {
    visibility: hidden;
  }
  &::cue {
    opacity: 0;
    // color: ;
  }
`;

export const CustomControlsWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: 5px;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.5);
`;

export const ControlsList = styled.div`
  padding: 2px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LeftControlsWrapper = styled.div`
  width: 62%;
  display: flex;
  align-items: center;

  & > * {
    margin: 0 5px;
    cursor: pointer;
  }
`;

export const RightControlsWrapper = styled.div`
  width: 30%;
  justify-content: flex-end;
  display: flex;
  align-items: center;
  & > * {
    margin: 0 5px;
    cursor: pointer;
`;

export const ProgressBarInput = styled.input<any>`
  margin: 0;
  width: 100%;
  cursor: pointer;
  appearance: none;
  background: var(--bar-bg);
  position: relative;
  height: 6px;
  outline: none;
  //   bottom: 10px;
  border-radius: 10px;
  margin-bottom: 10px;

  &:hover {
    &::-webkit-slider-thumb {
      visibility: visible;
    }
  }

  //   Safari
  &::-webkit-slider-runnable-track {
    background: rgba(129, 129, 129, 0.9);
    position: relative;
    height: 6px;
    outline: none;
    border-radius: 10px;
  }

  //   Firefox
  &::-moz-range-track {
    background: rgba(129, 129, 129, 0.9);
    position: relative;
    height: 6px;
    outline: none;
    border-radius: 10px;
  }

  &::-moz-focus-outer {
    border: 0;
  }

  //   progress bar - chrome and safari
  &::before {
    content: "";
    height: 6px;
    width: var(--seek-before-width);
    background-color: #b7f84d;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    cursor: pointer;
    border-radius: 10px;
  }

  &::-moz-range-progress {
    background-color: var(--seek-before-color);
    width: var(--seek-before-width);
    height: 6px;
    border-radius: 10px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    border: none;
    background-color: #b7f84d;
    cursor: pointer;
    position: relative;
    margin: -4px 0 0 0;
    z-index: 3;
    box-sizing: border-box;
    visibility: hidden;
  }

  &:hover + ::-webkit-slider-thumb {
    visibility: visbile;
  }

  &:active::-webkit-slider-thumb {
    transform: scale(1.2);
  }

  &::-moz-range-thumb {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    border: transparent;
    background-color: #b7f84d;
    cursor: pointer;
    position: relative;
    z-index: 3;
    box-sizing: border-box;
  }

  &:active::-moz-range-thumb {
    transform: scale(1.2);
    background-color: #b7f84d;
  }
`;

export const PreviewContainer = styled.div`
  position: absolute;
  z-index: 1000;
  width: 150px;
  height: 80px;
  bottom: 60px;
  border: 2px solid #fff;
  border-radius: 10px;
  text-align: center;
`;

export const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

export const PreviewTimeText = styled.div`
  color: #111;
  background: white;
  width: 50px;
  border-radius: 10px;
  font-size: 12px;
  position: absolute;
  bottom: 60px;
  padding: 2px;
`;

export const PreviewVideo = styled.video`
  display: none;
`;

export const PlayIcon = styled(PlayArrowIcon)`
  color: rgba(255, 255, 255, 0.8);
`;

export const CustomPauseIcon = styled(PauseIcon)`
  color: rgba(255, 255, 255, 0.8);
`;

export const RewindIcon = styled(Replay10Icon)`
  color: rgba(255, 255, 255, 0.8);
`;

export const CustomReplayIcon = styled(ReplayIcon)`
  color: rgba(255, 255, 255, 0.8);
`;

export const CustomForwardIcon = styled(Forward10Icon)`
  color: rgba(255, 255, 255, 0.8);
`;

export const CustomCaptionsIcon = styled(SubtitlesIcon)`
  color: rgba(255, 255, 255, 0.8);
`;

export const CustomSettingsIcon = styled(SettingsIcon)`
  color: rgba(255, 255, 255, 0.8);
`;

export const CustomExpandIcon = styled(FullscreenIcon)`
  color: rgba(255, 255, 255, 0.8);
`;

export const CustomExitIcon = styled(FullscreenExitIcon)`
  color: rgba(255, 255, 255, 0.8);
`;

export const CustomVolumeOffIcon = styled(VolumeOffIcon)`
  color: rgba(255, 255, 255, 0.8);
`;

export const CustomVolumeMuteIcon = styled(VolumeMuteIcon)`
  color: rgba(255, 255, 255, 0.8);
`;

export const CustomVolumeDownIcon = styled(VolumeDownIcon)`
  color: rgba(255, 255, 255, 0.8);
`;

export const CustomVolumeUpIcon = styled(VolumeUpIcon)`
  color: rgba(255, 255, 255, 0.8);
`;

export const VolumeControlWrapper = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    input[type="range"] {
      opacity: 1;
    }
  }
`;

export const VolumeRangeSlider = styled.input`
  opacity: 0;
  width: 50%;
  margin: 0 5px;
  cursor: pointer;
  appearance: none;
  background: var(--bar-bg);
  position: relative;
  height: 4px;
  outline: none;
  border-radius: 10px;
  transition: opacity 0.6s ease-in-out;

  //   Safari
  &::-webkit-slider-runnable-track {
    background: rgba(129, 129, 129, 0.9);
    position: relative;
    height: 4px;
    outline: none;
    border-radius: 10px;
  }

  //   Firefox
  &::-moz-range-track {
    background: rgba(129, 129, 129, 0.9);
    position: relative;
    height: 4px;
    outline: none;
    border-radius: 10px;
  }

  &::-moz-focus-outer {
    border: 0;
  }

  //   progress bar - chrome and safari
  &::before {
    content: "";
    height: 4px;
    width: var(--seek-before-width);
    background-color: rgba(255, 255, 255, 0.8);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    cursor: pointer;
    border-radius: 10px;
  }

  &::-moz-range-progress {
    background-color: rgba(255, 255, 255, 0.8);
    width: var(--seek-before-width);
    height: 4px;
    border-radius: 10px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    border: none;
    background-color: #fff;
    cursor: pointer;
    position: relative;
    margin: -3px 0 0 0;
    z-index: 3;
    box-sizing: border-box;
  }

  &:active::-webkit-slider-thumb {
    transform: scale(1.2);
    // background: white;
  }

  &::-moz-range-thumb {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    border: transparent;
    background-color: #fff;
    cursor: pointer;
    position: relative;
    z-index: 3;
    box-sizing: border-box;
  }

  &:active::-moz-range-thumb {
    transform: scale(1.2);
    background: rgba(255, 255, 255, 0.8);
  }
`;

export const SettingsWrapper = styled.div`
  position: absolute;
  right: 25px;
  bottom: 60px;
  background: rgb(28 28 28);
  width: 135px;
  max-height: 250px;
  height: auto;
  color: #fff;
  overflow-y: scroll;
  z-index: 20;
  padding: 5px 15px;
`;

export const SettingsHeader = styled.p`
  color: #fff;
  margin: 0;
  font-size: 14px;
  font-weight: 300;
  padding: 15px;
  display: block;
  border-bottom: 1px solid rgb(83, 83, 83);
`;

export const SpeedList = styled.ul`
  margin: 0;
  list-style: none;
  padding: 0;
`;

export const SpeedListItem = styled.li`
  cursor: pointer;
  text-align: left;
  padding: 12px 33px;
  display: block;
  font-size: 14px;
  &:hover {
    color: #b7f84d;
  }
  &.active {
    color: #b7f84d;
  }
`;

export const CaptionsWrapper = styled.div`
  position: absolute;
  right: 45px;
  bottom: 60px;
  background: rgb(28 28 28);
  width: 125px;
  max-height: 250px;
  height: auto;
  color: #fff;
  overflow-y: scroll;
  z-index: 20;
  padding: 5px 15px;
`;

export const CaptionsHeader = styled.p`
  color: #fff;
  margin: 0;
  font-size: 14px;
  font-weight: 300;
  padding: 15px;
  display: block;
  border-bottom: 1px solid rgb(83, 83, 83);
`;

export const CaptionsList = styled.ul`
  margin: 0;
  list-style: none;
  padding: 0;
`;

export const CaptionsListItem = styled.li`
  cursor: pointer;
  text-align: left;
  padding: 15px;
  font-size: 14px;
  &:hover {
    color: #b7f84d;
  }
  &.active {
    background-color: #b7f84d;
    color: #111;
  }
`;

export const CaptionsTextWrapper = styled.p`
  position: absolute;
  left: 50%;
  bottom: 40px;
  width: 90%;
  max-width: 90%;
  transform: translate(-50%, -50%);
  text-align: center;
  user-select: none;
  transition: bottom 0.3s;
  color: white;
`;

export const SubtitleText = styled.mark`
  background-color: #0000008f !important;
  color: #fff;
  padding: 2px;
`;

export const LogoWrapper = styled.img`
  // position: absolute;
  // right: 10px;
  // bottom: 65px;
  width: 130px;
  cursor: pointer;
  opacity: 0.8;
  margin-right: 10px;
`;

export const TopControlsWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TopPlayIcon = styled(PlayArrowIcon)`
  color: #fff;
  width: 50px;
  background: #111;
  padding: 5px 25px;
  text-align: center;
  border: 2px solid #fff;
  border-radius: 15px;
  cursor: pointer;
  z-index: 10000;
`;

export const CurrentTimeWrapper = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
`;

export const CurrentTimeText = styled.span``;

export const TotalDutationText = styled.span``;
