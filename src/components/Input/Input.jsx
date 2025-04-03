const Input = ({ name, content, type = "text", style, ...props }) => {
  const { error } = props;

  return (
    <div>
      <input
        name={name}
        placeholder={content}
        type={type}
        className={`bg-[#F2F0F2] text-[16px] text-[#49735A] rounded-[12px] px-4 h-[50px] my-2 sm:w-[400px] w-[350px] ${style}`}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-left max-w-[300px] text-[14px] my-1">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Input;
