const Button = ({ title, style, onClick, type = "primary", ...props }) => {
  let buttonColor = "bg-[#3252DF]";

  switch (type) {
    case "primary":
      buttonColor = "bg-[#3252DF] text-white";
      break;
    case "submit":
      buttonColor = "bg-[#3252DF] text-white";
      break;
    case "cancel":
      buttonColor = "bg-gray-400 text-white";
      break;
    case "cancel-secondary":
      buttonColor = "bg-[#f5f6f8] text-[#b3b3b3]";
      break;
    case "warning":
      buttonColor = "bg-red-500 text-white";
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`${buttonColor} py-2 rounded-sm transition hover:opacity-90 cursor-pointer px-6 shadow-md ${style}`}
      {...props}
    >
      {title}
    </button>
  );
};

export default Button;
