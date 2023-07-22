import './Settings.scss';

import closeIcon from '../assets/close-icon.png'
import { NUM_FISH_OPTIONS, TIME_RANGE_OPTIONS } from '../constants/settings';
import { THEME_OPTIONS } from '../constants/colorThemes';
import { useEffect, useState } from 'react';



const Settings = (props) => {
  const [labels, setLabels] = useState(null);
  const [series, setSeries] = useState(null);

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
      <img src={closeIcon} className='close-settings-btn' onClick={() => props.toggle('settings')}/>
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

      </div>
    </div>
  );

  // const processArtistMetadata = () => {
  //   const genders = {}
  //   if (props.metadata) {
  //     props.metadata.forEach((artist) => {
  //       console.log(artist)
  //       if (artist.gender) {
  //         if (genders[artist.gender]) {
  //           genders[artist.gender] += 1;
  //         } else {
  //           genders[artist.gender] = 1;
  //         }
  //       }
  //     })
  //     setLabels(Object.keys(genders));
  //     setSeries(Object.values(genders))
  //   }
  // }

  // useEffect(processArtistMetadata, [props.metadata])

  // var options = {
  // labels: labels,
  // responsive: [{
  //   breakpoint: 480,
  //   options: {
  //     chart: {
  //       width: 200
  //     },
  //     legend: {
  //       position: 'bottom'
  //     }
  //   }
  // }]
  // };

  // // const series = [44, 55, 13, 43, 22];

  // // {
  // //   gender: {
  // //     series: [],
  // //     labels: []
  // //   },
  // //   country: {
  // //     series: [],
  // //     labels: []
  // //   },
  // // }

  // return (
    
  //   <div>
  //     {
  //       props.metadata && series ? 
  //       <Chart
  //         options={options}
  //         series={series}
  //         type="pie"
  //         width="500"
  //       />
  //     :
  //     <p>Loading...</p>
  //     }
      
  //   </div>
  // );
}

export default Settings;
