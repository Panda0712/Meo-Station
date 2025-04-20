import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteContactAPI, getListContactsAPI } from "~/apis";
import Button from "~/components/Button/Button";
import Modal from "~/components/Modal/Modal";

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [totalContacts, setTotalContacts] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [openOptions, setOpenOptions] = useState([]);

  const location = useLocation();

  const handleAfterGetContacts = (res) => {
    setContacts(res.contacts || []);
    setTotalContacts(res.totalContacts || 0);
    setOpenOptions(
      res.contacts?.map((_, index) => ({
        index,
        open: false,
      }))
    );
  };

  const handleReset = () => {
    setOpenModal(false);
    setCurrentId(null);
    setOpenOptions(
      contacts?.map((_, index) => ({
        index,
        open: false,
      }))
    );
  };

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

  const handleDeleteContact = () => {
    toast
      .promise(deleteContactAPI(currentId), {
        pending: "Đang xóa liên hệ",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Xóa liên hệ thành công!!!");
          handleAfterDeletedContact();
        }
        handleReset();
      });
  };

  const handleAfterDeletedContact = () => {
    getListContactsAPI(location.search).then(handleAfterGetContacts);
  };

  useEffect(() => {
    getListContactsAPI(location.search).then(handleAfterGetContacts);
  }, [location.search]);

  const tHeadStyle =
    "font-medium border border-gray-200 px-4 py-2 text-[18px] break-words whitespace-normal";
  const optionStyle =
    "py-[12px] px-[16px] transition hover:bg-slate-100 cursor-pointer";

  return (
    <div className="flex flex-col">
      {openModal && (
        <Modal
          title="Xóa liên hệ"
          handleCloseModal={handleReset}
          modalStyle="w-[450px]"
        >
          <div className="mt-6 relative">
            <p className="text-black">
              Bạn có chắc chắn muốn xóa liên hệ không? Sau khi xóa không thể
              hoàn tác!
            </p>

            <div className="flex justify-end">
              <div className="flex items-center gap-2 mt-8">
                <Button title="Trở lại" type="cancel" onClick={handleReset} />
                <Button
                  title="Xóa liên hệ"
                  type="warning"
                  onClick={handleDeleteContact}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}

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
          {contacts?.map((contact, index) => (
            <tr key={index} className="text-center">
              <td className={`${tHeadStyle}`}>{contact?.name}</td>
              <td className={`${tHeadStyle}`}>{contact?.email}</td>
              <td className={`${tHeadStyle}`}>{contact?.phone}</td>
              <td className={`${tHeadStyle}`}>{contact?.message}</td>
              <td className={`${tHeadStyle} relative`}>
                <div className="relative">
                  <Ellipsis
                    size={18}
                    className="cursor-pointer mx-auto"
                    onClick={() => handleToggleOptions(index)}
                  />

                  {openOptions[index]?.open && (
                    <ul
                      className="w-[150px] bg-white shadow-md z-100
              border border-slate-100 rounded-sm absolute bottom-[-calc(50%)] text-[14px] right-0"
                    >
                      <li
                        className={`${optionStyle}`}
                        onClick={() => {
                          setOpenModal(true);
                          setCurrentId(contact._id);
                        }}
                      >
                        Xóa liên hệ
                      </li>
                    </ul>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactManagement;
