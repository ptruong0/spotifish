import './Sidebar.scss'
import closeIcon from '../assets/close-icon.png'

const Sidebar = (props) => {
  return (
    <div className='sidebar'>
      {/* close button */}
      <img src={closeIcon} className='close-sidebar-btn' onClick={props.toggleSidebar} />

      {/* title */}
      <h2 className='sidebar-title'>Your Top Artists</h2>

      {/* list of artist names and ranks */}
      <div className='top-artist-list'>
        {
          props.topArtists &&
          (props.topArtists.map((artist, index) => {
            return <p className='sidebar-row-text'>{index+1}.{" "}
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
