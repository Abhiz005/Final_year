const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="input-container">
      <div className="icon-wrapper">
        <Icon className="input-icon" />
      </div>
      <input {...props} className="input-field" />
    </div>
  );
};

export default Input;
