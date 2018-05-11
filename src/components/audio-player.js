import React from 'react'
import {
  Media,
  Player,
  controls
} from 'react-media-player'
import MuteUnmute from './mute-unmute'
import PlayPause from './play-pause'
import styles from './audio-player.module.scss'

const {
  CurrentTime,
  Progress,
  SeekBar,
  Duration,
  Volume
} = controls

class AudioPlayer extends React.Component {
  render() {
    return (
      <Media className={styles.media}>
        <div>
          <Player src={this.props.src} />
          <div className={styles.controls}>
            <PlayPause className={styles.control} />
            <CurrentTime className={`${styles.control} ${styles.currentTime}`} />
            <div className={`${styles.controlGroup} ${styles.controlGroupSeek}`}>
              <Progress className={`${styles.control} ${styles.progress}`} />
              <SeekBar className={`${styles.control} ${styles.seekbar}`} />
            </div>
            <Duration className={styles.control} />
            <MuteUnmute className={styles.control} />
            <Volume className={`${styles.control} ${styles.volume}`} />
          </div>
        </div>
      </Media>
    )
  }
}

export default AudioPlayer
