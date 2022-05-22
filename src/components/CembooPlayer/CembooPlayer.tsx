import React from "react";
import Hls from "hls.js";

import { getTimeFormat } from "./../utils";

import CembooLogo from "./../../assets/logo.png";

import * as Styled from "./CembooPlayer.styled";

export const CembooPlayer: React.FC<{
  url: string;
}> = ({ url }) => {
  const videoRef = React.useRef<any>(null);
  const previewVideoRef = React.useRef<any>(null);
  const progressRef = React.useRef<any>(null);
  const volumeRef = React.useRef<any>(null);
  const progressAnimationRef = React.useRef<any>();
  const previewContainerRef = React.useRef<any>();
  const controlsRef = React.useRef<any>();
  const videoPlayerContainerRef = React.useRef<any>();
  const fullScreenRef = React.useRef<any>();

  const [isMetadataLoaded, setIsMetadataLoaded] = React.useState(false);
  const [showCustomControls, setShowCustomControls] = React.useState(false);
  const [totalDuration, setTotalDuration] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [seekBarWidth, setSeekBarWidth] = React.useState(0);
  // const [previewThumbnail, setPreviewThumbnail] = React.useState("");
  const [hoveredSecond, setHoveredSecond] = React.useState(0);
  const [volume, setVolume] = React.useState(0);
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [showCaptions, setShowCaptions] = React.useState(false);
  const [tracks, setTracks] = React.useState<any>([]);
  const [selectedTrack, setSelectedTrack] = React.useState<any>();
  const [subtitleText, setSubtitleText] = React.useState("");
  const [showPlayCTA, setShowPlayCTA] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);

  // Handle HLS formt in all browsers
  React.useEffect(() => {
    if (videoRef && videoRef.current) {
      const video = videoRef.current;
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {});
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = url;
        video.addEventListener("loadedmetadata", () => {
          console.log("Normal metadata loaded");
        });
      }
    }
  }, [url]);

  // Handle HLS formt for preview videos in all browsers
  React.useEffect(() => {
    if (previewVideoRef && previewVideoRef.current) {
      const video = previewVideoRef.current;
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          console.log("HLS manifest loaded");
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = url;
        video.addEventListener("loadedmetadata", () => {
          console.log("Normal metadata loaded");
        });
      }
    }
  }, [url]);

  React.useEffect(() => {
    if (isMetadataLoaded) {
      setTotalDuration(videoRef.current.duration);
      videoRef.current.volume = 0;
    }
  }, [isMetadataLoaded]);

  const handleOnLoadedMetadata = React.useCallback(() => {
    setShowPlayCTA(true);
    setIsMetadataLoaded(true);
    setTracks([...videoRef.current.textTracks]);
  }, []);

  const handleUpdateProgressBarWidth = React.useCallback(() => {
    if (progressRef.current) {
      console.log(progressRef.current.value, "in width update");
      progressRef.current.style.setProperty(
        "--seek-before-width",
        `${(progressRef.current.value / totalDuration) * 100}%`
      );
    }
  }, [totalDuration]);

  const handleWhilePlaying = React.useCallback(() => {
    if (!videoRef.current.ended) {
      if (videoRef.current && progressRef.current) {
        progressRef.current.max = videoRef.current.duration;
        progressRef.current.value = videoRef.current.currentTime;
        handleUpdateProgressBarWidth(); // to update the width and color of progress bar
        // Animate progress bar width update
        progressAnimationRef.current =
          requestAnimationFrame(handleWhilePlaying);
        setCurrentTime(videoRef.current.currentTime);
      }
    }
  }, [handleUpdateProgressBarWidth]);

  const handleOnPlaying = React.useCallback(() => {
    setIsPlaying(true);
    setShowPlayCTA(false);
    handleWhilePlaying(); // to keep the progress bar in sync with video current time
  }, [handleWhilePlaying]);

  const handleOnPause = React.useCallback(() => {
    setIsPlaying(false);
    cancelAnimationFrame(progressAnimationRef.current);
  }, []);

  const handleProgressRangeChange = React.useCallback(() => {
    setSeekBarWidth(progressRef.current.value);
    videoRef.current.currentTime = progressRef.current.value;
    console.log(progressRef.current.value);
    console.log(hoveredSecond);
    if (hoveredSecond) {
      progressRef.current.value = hoveredSecond;
    }
    console.log(progressRef.current.value, "after updating");
    handleUpdateProgressBarWidth();
  }, [handleUpdateProgressBarWidth, hoveredSecond]);

  // const createCanvas = React.useCallback((previewVideo) => {
  //   let w = previewVideo.width;
  //   let h = previewVideo.height;

  //   let canvas = document.createElement("canvas");

  //   canvas.width = w;
  //   canvas.height = h;

  //   const ctx = canvas.getContext("2d");

  //   ctx?.drawImage(previewVideo, 0, 0, w, h);

  //   return canvas;
  // }, []);

  // const generatePreview = React.useCallback(
  //   (previewVideo) => {
  //     let canvas = createCanvas(previewVideo);
  //     setPreviewThumbnail(canvas?.toDataURL());
  //   },
  //   [createCanvas]
  // );

  const handleMouseMoveOnProgressBar = React.useCallback((event) => {
    let hoveredTime =
      (event.nativeEvent.offsetX / progressRef.current.clientWidth) *
      videoRef.current.duration;

    if (hoveredTime < 0) {
      hoveredTime = 0;
    }
    setHoveredSecond(hoveredTime);
    previewVideoRef.current.currentTime = hoveredTime;

    if (previewContainerRef.current) {
      // console.log(event.nativeEvent.offsetX);
      previewContainerRef.current.style.left = `${
        event.nativeEvent.offsetX - 25
      }px`;
    }
  }, []);

  const handleMouseOutFromProgressBar = React.useCallback(() => {
    // setPreviewThumbnail("");
    setHoveredSecond(0);
  }, []);

  const handlePlayClick = React.useCallback(() => {
    videoRef.current.play();
  }, []);

  const handlePauseClick = React.useCallback(() => {
    videoRef.current.pause();
  }, []);

  const handleRewindClick = React.useCallback(() => {
    videoRef.current.currentTime -= 10;
  }, []);

  const handleForwardClick = React.useCallback(() => {
    videoRef.current.currentTime += 10;
  }, []);

  const handleVolumeRangeFillWidth = React.useCallback(() => {
    volumeRef.current.style.setProperty(
      "--seek-before-width",
      `${videoRef.current.volume * 100}%`
    );
  }, []);

  const handleToggleMute = React.useCallback(() => {
    if (videoRef.current.volume === 0) {
      videoRef.current.volume = 0.5;
      setVolume(0.5);
    } else {
      videoRef.current.volume = 0;
      setVolume(0);
    }
    handleVolumeRangeFillWidth();
  }, [handleVolumeRangeFillWidth]);

  const handleVolumeChange = React.useCallback(
    (event) => {
      setVolume(event.target.value);
      videoRef.current.volume = event.target.value;
      handleVolumeRangeFillWidth();
    },
    [handleVolumeRangeFillWidth]
  );

  const handleCaptionsClick = React.useCallback(() => {
    setShowCaptions(!showCaptions);
    setShowSettings(false);
  }, [showCaptions]);

  const handleSettingsClick = React.useCallback(() => {
    setShowCaptions(false);
    setShowSettings(!showSettings);
  }, [showSettings]);

  const handlePlaybackRate = React.useCallback((playbackValue: number) => {
    videoRef.current.playbackRate = playbackValue;
    setShowSettings(false);
  }, []);

  const toggleFullScreen = React.useCallback(() => {
    if (isFullScreen) {
      setIsFullScreen(false);
      document.exitFullscreen();
      videoPlayerContainerRef.current.removeEventListener(
        "fullscreenchange",
        () => {}
      );
    } else {
      videoPlayerContainerRef.current.requestFullscreen();
      videoPlayerContainerRef.current.addEventListener(
        "fullscreenchange",
        () => {
          if (document.fullscreenElement) {
            setIsFullScreen(true);
          } else {
            setIsFullScreen(false);
          }
        }
      );
    }
  }, [isFullScreen]);

  React.useEffect(() => {
    if (tracks.length > 0) {
      for (let item of tracks) {
        if (item.mode === "showing") {
          setSelectedTrack(item);
          break;
        }
      }
    }
  }, [tracks]);

  const volumeIcon = React.useCallback(() => {
    return videoRef.current && videoRef.current.volume === 0 ? (
      <Styled.CustomVolumeOffIcon fontSize="large" onClick={handleToggleMute} />
    ) : videoRef.current.volume > 0 && videoRef.current.volume <= 0.5 ? (
      <Styled.CustomVolumeDownIcon
        fontSize="large"
        onClick={handleToggleMute}
      />
    ) : videoRef.current.volume > 0.5 ? (
      <Styled.CustomVolumeUpIcon fontSize="large" onClick={handleToggleMute} />
    ) : (
      <Styled.CustomVolumeDownIcon
        fontSize="large"
        onClick={handleToggleMute}
      />
    );
  }, [handleToggleMute]);

  const handleCaptionSelect = React.useCallback(
    (event) => {
      let trackLabel = event.target.getAttribute("data-track");
      const updatedTracks = [...tracks];
      for (let i = 0; i < updatedTracks.length; i++) {
        updatedTracks[i].mode = "disabled";
        if (updatedTracks[i].label === trackLabel) {
          updatedTracks[i].mode = "showing";
          setSelectedTrack(updatedTracks[i]);
          setSubtitleText("");
        }
      }
      setTracks(updatedTracks);
      setShowCaptions(false);
    },
    [tracks]
  );

  const handleTurnOffCaptions = React.useCallback(() => {
    setSelectedTrack(null);
    const updatedTracks = [...tracks];
    for (let i = 0; i < updatedTracks.length; i++) {
      updatedTracks[i].mode = "disabled";
    }
    setTracks(updatedTracks);
    setShowCaptions(false);
    setSelectedTrack(null);
    setSubtitleText("");
  }, [tracks]);

  const captionsContent = React.useCallback(() => {
    return tracks.map((track: any, index: number) => (
      <Styled.CaptionsListItem
        data-track={track.label}
        key={track.label}
        className={track.mode === "showing" ? "active" : ""}
        onClick={(event) => handleCaptionSelect(event)}
      >
        {track.label}
      </Styled.CaptionsListItem>
    ));
  }, [tracks, handleCaptionSelect]);

  React.useEffect(() => {
    if (selectedTrack) {
      selectedTrack.addEventListener("cuechange", () => {
        if (selectedTrack.mode === "showing") {
          if (selectedTrack.activeCues[0]) {
            setSubtitleText(`${selectedTrack.activeCues[0].text}`);
          } else {
            setSubtitleText("");
          }
        }
      });
    }
  }, [selectedTrack]);

  const togglePlayAndPause = React.useCallback(() => {
    if (isPlaying) {
      handlePauseClick();
    } else {
      handlePlayClick();
    }
  }, [handlePlayClick, handlePauseClick, isPlaying]);

  const handlePlayCtaClick = React.useCallback(() => {
    setShowCustomControls(true);
    videoRef.current.play();
  }, []);

  const handleOnEnded = React.useCallback(() => {
    console.log("Completed");
  }, []);

  return (
    <Styled.VideoContainer ref={videoPlayerContainerRef}>
      {showPlayCTA && !isPlaying && (
        <Styled.TopControlsWrapper>
          <Styled.TopPlayIcon fontSize="large" onClick={handlePlayCtaClick} />
        </Styled.TopControlsWrapper>
      )}

      <Styled.CustomVideo
        preload="metadata"
        ref={videoRef}
        crossOrigin="anonymous"
        onLoadedMetadata={handleOnLoadedMetadata}
        onPlaying={handleOnPlaying}
        onPause={handleOnPause}
        onClick={togglePlayAndPause}
        onEnded={handleOnEnded}
      >
        <source src={url} type="video/mp4" />
        <track
          kind="captions"
          srcLang="en"
          label="English"
          src="https://dnt94mhd6ydr9.cloudfront.net/123456/subtitles/file-en.vtt"
          default
        />
        <track
          kind="captions"
          srcLang="it"
          label="Italian"
          src="https://dnt94mhd6ydr9.cloudfront.net/123456/subtitles/test2.vtt"
        />
      </Styled.CustomVideo>

      {subtitleText && (
        <Styled.CaptionsTextWrapper>
          <Styled.SubtitleText>{subtitleText}</Styled.SubtitleText>
        </Styled.CaptionsTextWrapper>
      )}

      {showCustomControls && (
        <Styled.CustomControlsWrapper ref={controlsRef}>
          <Styled.ProgressBarInput
            type="range"
            step="any"
            ref={progressRef}
            min={0}
            value={seekBarWidth}
            onMouseMove={handleMouseMoveOnProgressBar}
            onMouseOut={handleMouseOutFromProgressBar}
            onChange={handleProgressRangeChange}
          />

          {hoveredSecond > 0 && (
            <Styled.PreviewTimeText ref={previewContainerRef}>
              {getTimeFormat(hoveredSecond)}
            </Styled.PreviewTimeText>
          )}
          {/* {previewThumbnail && (
            <Styled.PreviewContainer ref={previewContainerRef}>
              <Styled.PreviewImg src={previewThumbnail} />
              <Styled.PreviewTimeText>{hoveredSecond}</Styled.PreviewTimeText>
            </Styled.PreviewContainer>
          )} */}
          <Styled.ControlsList>
            <Styled.LeftControlsWrapper>
              <Styled.RewindIcon fontSize="large" onClick={handleRewindClick} />
              {isPlaying ? (
                <Styled.CustomPauseIcon
                  fontSize="large"
                  onClick={handlePauseClick}
                />
              ) : (
                <Styled.PlayIcon fontSize="large" onClick={handlePlayClick} />
              )}
              <Styled.CustomForwardIcon
                fontSize="large"
                onClick={handleForwardClick}
              />
              <Styled.VolumeControlWrapper>
                {volumeIcon()}
                <Styled.VolumeRangeSlider
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={volume}
                  ref={volumeRef}
                  onChange={handleVolumeChange}
                />
              </Styled.VolumeControlWrapper>
              <Styled.CurrentTimeWrapper>
                <Styled.CurrentTimeText>
                  {getTimeFormat(currentTime)}
                </Styled.CurrentTimeText>{" "}
                /{" "}
                <Styled.TotalDutationText>
                  {getTimeFormat(totalDuration)}
                </Styled.TotalDutationText>
              </Styled.CurrentTimeWrapper>
            </Styled.LeftControlsWrapper>
            <Styled.RightControlsWrapper>
              <Styled.LogoWrapper src={CembooLogo} />
              <Styled.CustomCaptionsIcon
                fontSize="large"
                onClick={handleCaptionsClick}
              />
              <Styled.CustomSettingsIcon
                fontSize="large"
                onClick={handleSettingsClick}
              />
              {isFullScreen ? (
                <Styled.CustomExitIcon
                  fontSize="large"
                  ref={fullScreenRef}
                  onClick={toggleFullScreen}
                />
              ) : (
                <Styled.CustomExpandIcon
                  fontSize="large"
                  ref={fullScreenRef}
                  onClick={toggleFullScreen}
                />
              )}
            </Styled.RightControlsWrapper>
          </Styled.ControlsList>
          {showSettings && (
            <Styled.SettingsWrapper>
              <Styled.SettingsHeader>Playback Speed</Styled.SettingsHeader>
              <Styled.SpeedList>
                <Styled.SpeedListItem
                  onClick={() => handlePlaybackRate(0.25)}
                  className={
                    videoRef.current.playbackRate === 0.25 ? "active" : ""
                  }
                >
                  0.25
                </Styled.SpeedListItem>
                <Styled.SpeedListItem
                  onClick={() => handlePlaybackRate(0.5)}
                  className={
                    videoRef.current.playbackRate === 0.5 ? "active" : ""
                  }
                >
                  0.5
                </Styled.SpeedListItem>
                <Styled.SpeedListItem
                  onClick={() => handlePlaybackRate(0.75)}
                  className={
                    videoRef.current.playbackRate === 0.75 ? "active" : ""
                  }
                >
                  0.75
                </Styled.SpeedListItem>
                <Styled.SpeedListItem
                  onClick={() => handlePlaybackRate(1)}
                  className={
                    videoRef.current.playbackRate === 1 ? "active" : ""
                  }
                >
                  Normal
                </Styled.SpeedListItem>
                <Styled.SpeedListItem
                  onClick={() => handlePlaybackRate(1.25)}
                  className={
                    videoRef.current.playbackRate === 1.25 ? "active" : ""
                  }
                >
                  1.25
                </Styled.SpeedListItem>
                <Styled.SpeedListItem
                  onClick={() => handlePlaybackRate(1.5)}
                  className={
                    videoRef.current.playbackRate === 1.5 ? "active" : ""
                  }
                >
                  1.5
                </Styled.SpeedListItem>
                <Styled.SpeedListItem
                  onClick={() => handlePlaybackRate(1.75)}
                  className={
                    videoRef.current.playbackRate === 1.75 ? "active" : ""
                  }
                >
                  1.75
                </Styled.SpeedListItem>
                <Styled.SpeedListItem
                  onClick={() => handlePlaybackRate(2)}
                  className={
                    videoRef.current.playbackRate === 2 ? "active" : ""
                  }
                >
                  2
                </Styled.SpeedListItem>
              </Styled.SpeedList>
            </Styled.SettingsWrapper>
          )}
          {showCaptions && (
            <Styled.CaptionsWrapper>
              <Styled.CaptionsHeader>Captions</Styled.CaptionsHeader>
              <Styled.CaptionsList>
                <Styled.CaptionsListItem
                  data-track="OFF"
                  onClick={handleTurnOffCaptions}
                  className={selectedTrack ? "" : "active"}
                >
                  Turn off
                </Styled.CaptionsListItem>
                {captionsContent()}
              </Styled.CaptionsList>
            </Styled.CaptionsWrapper>
          )}
        </Styled.CustomControlsWrapper>
      )}
      <Styled.PreviewVideo
        preload="metadata"
        ref={previewVideoRef}
        crossOrigin="anonymous"
        width={500}
        height={300}
      >
        <source src={url} type="video/mp4" />
      </Styled.PreviewVideo>
    </Styled.VideoContainer>
  );
};
