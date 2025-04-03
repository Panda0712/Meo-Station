const Button = ({ title, style, onClick, type = "primary", ...props }) => {
  let buttonColor = "bg-[#3252DF]";

  switch (type) {
    case "primary":
      buttonColor = "bg-[#3252DF]";
      break;
    case "cancel":
      buttonColor = "bg-gray-400";
      break;
    case "warning":
      buttonColor = "bg-red-500";
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`${buttonColor} text-white py-2 rounded-sm transition hover:opacity-90 cursor-pointer px-6 shadow-md ${style}`}
      {...props}
    >
      {title}
    </button>
  );
};

export default Button;
