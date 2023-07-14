import './Settings.scss'
import closeIcon from '../assets/close-icon.png'
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const numFishOptions = [
  10, 20, 30, 50
];

const termOptions = {
  'short_term': 'Past Month',
  'medium_term': 'Past 6 Months',
  'long_term': 'Past Years'
}

const Settings = (props) => {
  const onNumFishSelect = () => {
    const option = parseInt(document.querySelector('#num-fish').value)
    props.setNumFish(option)
  }

  const onTermSelect = () => {
    const option = document.querySelector('#term').value
    props.setTimeRange(option)
  }

  return (
    <div className='settings'>
      <img src={closeIcon} className='close-settings-btn' onClick={props.toggleSettings}/>
      <h2 className='settings-title'>Settings</h2>
      <div>
        {/* number of fish */}
        <div className='row-between'>
          <p class='setting-label'>Number of Fish</p>
          <select id='num-fish' value={props.numFish} onChange={onNumFishSelect}>
            {numFishOptions.map((opt) => {
              return <option value={opt}>{opt}</option>
            })}
          </select>
        </div>

        <br />
        
        {/* short term, medium term, or long term */}
        <div className='row-between'>
          <p class='setting-label'>Time Range</p>
          <select id='term' value={props.timeRange} onChange={onTermSelect}>
            {Object.entries(termOptions).map(([opt, optName]) => {
              return <option value={opt}>{optName}</option>
            })}
          </select>
        </div>

        <br />

        {/* color scheme */}
        <div className='row-between'>
          <p class='setting-label'>Color Palette</p>
          <select id='theme' defaultValue='Default'>
            <option value="Default">Default</option>
          </select>
        </div>

      </div>
    </div>
  );
}

export default Settings;
