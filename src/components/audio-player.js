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
      <Media>
        <div>
          <Player src={this.props.src} />
          <div className={styles.controls}>
            <div className={styles.controlGroup}>
              <PlayPause className={styles.control} />
              <div className={styles.controlGroupTime}>
                <CurrentTime className={styles.currentTime} />
                <span className={styles.timeDivider}>/</span>
                <Duration/>
              </div>
            </div>
            <div className={`${styles.controlGroup} ${styles.controlGroupSeek}`}>
              <Progress className={`${styles.control} ${styles.progress}`} />
              <SeekBar className={`${styles.control} ${styles.seekbar}`} />
            </div>
            <div className={`${styles.controlGroupVolume} ${styles.controlGroup}`}>
              <MuteUnmute className={styles.control} />
              <Volume className={`${styles.volume} ${styles.control}`} />
            </div>
          </div>
        </div>
      </Media>
    )
  }
}

export default AudioPlayer
