const Input = ({ name, content, type = "text", style, ...props }) => {
  const { error } = props;

  if (type === "file") {
    return (
      <div>
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          for="file_input"
        >
          Tải ảnh lên
        </label>
        <input
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
        />
      </div>
    );
  }

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
