import FileInput from "~/components/FileInput/FileInput";

const Input = ({
  name,
  content,
  type = "text",
  style,
  image = null,
  images = [],
  handleImageChange = () => {},
  multiple = false,
  ...props
}) => {
  const { error } = props;

  const globalStyle =
    "bg-[#F2F0F2] text-[16px] text-[#49735A] rounded-[12px] px-4 h-[50px] my-2 sm:w-[400px] w-[350px]";

  if (multiple) {
    return (
      <FileInput
        images={images}
        handleImageChange={handleImageChange}
        multiple={multiple}
        style={style}
        {...props}
      />
    );
  }

  if (type === "file") {
    return (
      <FileInput
        image={image}
        handleImageChange={handleImageChange}
        multiple={multiple}
        style={style}
        {...props}
      />
    );
  }

  if (type === "textarea") {
    return (
      <>
        <textarea
          name={name}
          placeholder={content}
          type={type}
          className={`${globalStyle} h-[96px] ${style}`}
          {...props}
        />
        {error && (
          <p className="text-red-500 text-left max-w-[300px] text-[14px] my-1">
            {error.message}
          </p>
        )}
      </>
    );
  }

  return (
    <div>
      <input
        name={name}
        placeholder={content}
        type={type}
        className={`${globalStyle} ${style}`}
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
