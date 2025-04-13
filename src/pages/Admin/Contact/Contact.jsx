import { Ellipsis } from "lucide-react";
import { useState } from "react";

const listContact = [
  {
    name: "Panda",
    email: "tuanpn.it@gmail.com",
    phone: "0369332842",
    message: "Dịch vũ tốt vãi nho!!",
  },
  {
    name: "Panda",
    email: "tuanpn.it@gmail.com",
    phone: "0369332842",
    message: "Dịch vũ tốt vãi nho!!",
  },
  {
    name: "Panda",
    email: "tuanpn.it@gmail.com",
    phone: "0369332842",
    message: "Dịch vũ tốt vãi nho!!",
  },
  {
    name: "Panda",
    email: "tuanpn.it@gmail.com",
    phone: "0369332842",
    message: "Dịch vũ tốt vãi nho!!",
  },
];

const ContactManagement = () => {
  const [openOptions, setOpenOptions] = useState(
    listContact?.map((_, index) => ({
      index,
      open: false,
    }))
  );

  const handleToggleOptions = (currentIndex) =>
    setOpenOptions((prevOptions) =>
      prevOptions.map((item, index) =>
        index === currentIndex
          ? {
              ...item,
              open: !item.open,
            }
          : {
              ...item,
              open: false,
            }
      )
    );

  const tHeadStyle = "font-medium border border-gray-200 px-4 py-2 text-[18px]";
  const optionStyle =
    "py-[12px] px-[16px] transition hover:bg-slate-100 cursor-pointer";

  return (
    <div className="flex flex-col">
      <h3 className="text-[20px] font-medium">Quản lý liên hệ</h3>

      <table className="table-fixed w-full border border-gray-200 bg-white rounded-md shadow-sm my-8">
        <thead className="bg-gray-100">
          <tr className="text-center">
            <th className={`${tHeadStyle}`}>Tên</th>
            <th className={`${tHeadStyle}`}>Email</th>
            <th className={`${tHeadStyle}`}>Số điện thoại</th>
            <th className={`${tHeadStyle} w-[300px]`}>Nội dung</th>
            <th className={`${tHeadStyle} w-[100px]`}></th>
          </tr>
        </thead>
        <tbody>
          {listContact?.map((contact, index) => (
            <tr key={index} className="text-center">
              <td className={`${tHeadStyle}`}>{contact?.name}</td>
              <td className={`${tHeadStyle}`}>{contact?.email}</td>
              <td className={`${tHeadStyle}`}>{contact?.phone}</td>
              <td className={`${tHeadStyle}`}>{contact?.message}</td>
              <td className={`${tHeadStyle} relative`}>
                <Ellipsis
                  size={18}
                  className="cursor-pointer mx-auto"
                  onClick={() => handleToggleOptions(index)}
                />

                {openOptions[index]?.open && (
                  <ul
                    className="w-[150px] bg-white shadow-md z-100
              border border-slate-100 rounded-sm absolute bottom-[-40px] text-[14px] right-0"
                  >
                    <li className={`${optionStyle}`}>Xóa phòng</li>
                  </ul>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactManagement;
