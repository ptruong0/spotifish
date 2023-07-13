import './Sidebar.scss'
import closeIcon from '../assets/close-icon.png'

const Sidebar = (props) => {

  console.log(props)
  return (
    <div className='sidebar'>
      <img src={closeIcon} className='close-sidebar-btn' onClick={props.toggleSidebar}/>
      <h2 className='sidebar-title'>Your Top Artists</h2>
      <div>
        {
          props.topArtists &&
          (props.topArtists.map((artist, index) => {
            return <p className='sidebar-row-text'>{index+1}. {artist.name}</p>
          }))
        }
      </div>
    </div>
  );
}

export default Sidebar;
