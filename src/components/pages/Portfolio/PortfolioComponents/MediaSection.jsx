export const MediaSection = ({ avatar, themeColor, onAvatarChange, onAvatarRemove, onThemeChange }) => (
  <div className="portfolio_media">
    <div className="portfolio_img">
      <p className="portfolio_projects_title">Photo</p>
      <div className="portfolio_img_actions">
        <label className="btn">
          Upload Photo
          <input type="file" accept="image/*" onChange={onAvatarChange} style={{ display: "none" }} />
        </label>
        {avatar && (
          <button type="button" onClick={onAvatarRemove} className="btn btn_danger">
            <i className="bi bi-trash3-fill"></i>
          </button>
        )}
      </div>
      {avatar && <img src={avatar} alt="avatar" />}
    </div>

    <div className="portfolio_theme_picker">
      <p className="portfolio_projects_title">PDF Theme Color</p>
      <label htmlFor="themeColor" className="color_picker_label" style={{ borderColor: themeColor }}>
        <input
          id="themeColor"
          type="color"
          value={themeColor}
          onChange={e => onThemeChange(e.target.value)}
          className="color_input_hidden"
        />
        <span className="color_dot" style={{ backgroundColor: themeColor }} />
        <span>Choose color</span>
      </label>
    </div>
  </div>
);
