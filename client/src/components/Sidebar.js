import './Sidebar.scss'
import closeIcon from '../assets/close-icon.png'

const Sidebar = (props) => {
  return (
    <div className='sidebar'>
      <img src={closeIcon} className='close-sidebar-btn' onClick={props.toggleSidebar} />
      <h2 className='sidebar-title'>Your Top Artists</h2>
      <div className='top-artist-list'>
        {
          props.topArtists &&
          (props.topArtists.map((artist, index) => {
            return <p className='sidebar-row-text'>{index}.{" "}
              <a onClick={() => props.toggleInfo(index, artist)} className='hover-underline'>
                {artist.name}
                </a>
            </p>
          }))
        }
      </div>
    </div>
  );
}

export default Sidebar;
