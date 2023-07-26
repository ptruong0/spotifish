import './Settings.scss'

import closeIcon from '../assets/close-icon.png'
import githubIcon from '../assets/github-mark-white.png'
import { NUM_FISH_OPTIONS, TIME_RANGE_OPTIONS } from '../constants/settings'
import { THEME_OPTIONS } from '../constants/colorThemes'
import { memo } from 'react'


const Settings = memo((props) => {

  /**
   * form change handlers
   */
  const onNumFishSelect = () => {
    const option = parseInt(document.querySelector('#num-fish').value)
    props.setNumFish(option)
  }

  const onTermSelect = () => {
    const option = document.querySelector('#term').value
    props.setTimeRange(option)
  }

  const onThemeSelect = () => {
    const option = document.querySelector('#theme').value
    props.setTheme(option)
  }

  return (
    <div className='settings'>
      <img src={closeIcon} className='close-settings-btn' onClick={() => props.toggle('settings')} />
      <h2 className='settings-title'>Settings</h2>
      <div>
        {/* number of fish */}
        <div className='row-between'>
          <p className='setting-label'>Number of Fish</p>
          <select id='num-fish' value={props.numFish} onChange={onNumFishSelect}>
            {NUM_FISH_OPTIONS.map((opt, index) => {
              return <option value={opt} key={index}>{opt}</option>
            })}
          </select>
        </div>

        <br />

        {/* short term, medium term, or long term */}
        <div className='row-between'>
          <p className='setting-label'>Time Range</p>
          <select id='term' value={props.timeRange} onChange={onTermSelect}>
            {Object.entries(TIME_RANGE_OPTIONS).map(([opt, optName], index) => {
              return <option value={opt} key={index}>{optName}</option>
            })}
          </select>
        </div>

        <br />

        {/* color scheme */}
        <div className='row-between'>
          <p className='setting-label'>Color Palette</p>
          <select id='theme' value={props.theme} onChange={onThemeSelect}>
            {THEME_OPTIONS.map((opt, index) => {
              return <option value={opt} key={index}>{opt}</option>
            })}
          </select>
        </div>
        <br />

        {/* link to github project */}
        <div className='credit-row'>
          <a href='https://www.github.com/ptruong0/spotifish' target="_blank" rel="noreferrer" className=' row-center credit-text'>
            <img src={githubIcon} className='github-icon' />
            <p >Check out the project here</p>
          </a>

        </div>
      </div>
    </div>
  )
})

export default Settings
