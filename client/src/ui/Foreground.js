import sand from '../assets/sand.png'
import kelp from '../assets/kelp.png'
import seashell from '../assets/seashell.png'
import coral from '../assets/coral.png'
import clam from '../assets/clam.png'
import clamOpen from '../assets/clam-open.png'
import './Foreground.scss'

import { useMemo, useState } from 'react'

const Foreground = (props) => {
  const [clamSrc, setClamSrc] = useState(clam)

  const wiggle = (element) => {
    element = '.' + element
    document.querySelector(element).className += ' wiggle'
    setTimeout(() => {
      document.querySelector(element).className = document.querySelector(element).className.replace('wiggle', '')
    }, 1500)
  }

  const clickClam = () => {
    if (props.toggle) {
      props.toggle('sidebar')
    } else {
      setClamSrc(clamSrc === clam ? clamOpen : clam)
    }
  }

  const clickSeashell = () => {
    if (props.toggle) {
      props.toggle('settings')
    }
  }

  return (
    <div>
      {/* memoize static images */}
      {useMemo(() => {
        return <span>
          <img className='sand' src={sand} alt=''/>
          <img className='kelp' src={kelp} alt=''/>
          <img className='coral' src={coral} alt=''/>

          <div className='seashell-container' onMouseOver={() => wiggle('seashell-container')} onClick={clickSeashell}>
            <img className='seashell' src={seashell} alt='Toggle settings menu button'/>
            {
              props.allowMenus &&
              <h2 className='seashell-text'>Settings</h2>
            }
          </div>
          {/* <Footer /> */}
        </span>
      }, [])}

      {useMemo(() => {
        return <span>
          <div className='clam-container' onMouseOver={() => wiggle('clam-container')} onClick={clickClam}>
            <img className='clam' src={clamSrc} alt='Toggle top artists/tracks menu'/>
            {
              props.allowMenus &&
              <h2 className='clam-text'>Rankings</h2>
            }
          </div>
        </span>
      }, [clamSrc])}
    </div>
  )
}

export default Foreground