const Button = ({ title, style, onClick, type = "primary", ...props }) => {
  let buttonStyle = "bg-[#3252DF]";

  switch (type) {
    case "primary":
      buttonStyle = "bg-[#3252DF] text-white rounded-sm";
      break;
    case "submit":
      buttonStyle = "bg-[#3252DF] text-white rounded-sm";
      break;
    case "search":
      buttonStyle = "bg-[#064749] text-white rounded-[40px] h-[48px]";
      break;
    case "cancel":
      buttonStyle = "bg-gray-400 text-white rounded-sm";
      break;
    case "cancel-secondary":
      buttonStyle = "bg-[#f5f6f8] text-[#b3b3b3] rounded-sm";
      break;
    case "warning":
      buttonStyle = "bg-red-500 text-white rounded-sm";
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`${buttonStyle} py-2 transition hover:opacity-90 cursor-pointer px-6 shadow-md ${style}`}
      {...props}
    >
      {title}
    </button>
  );
};

export default Button;
