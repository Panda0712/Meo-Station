import { Spin } from "antd";
import { deleteContactAPI, getListContactsAPI } from "~/apis";
import AdminTable from "~/components/AdminTable/AdminTable";
import DeleteConfirmationModal from "~/components/DeleteConfirmationModal/DeleteConfirmationModal";
import Pagination from "~/components/Pagination/Pagination";
import useContactTable from "~/hooks/useContactTable";

const ContactManagement = () => {
  const {
    dataContacts: contacts,
    loading,
    totalPages,
    currentPage,
    openOptions,
    handleToggleOptions,
    handlePageChange,
    handleDeleteContact,
    handleReset,
    openModal,
    setOpenModal,
    setCurrentId,
  } = useContactTable({
    fetchDataFn: getListContactsAPI,
    deleteDataFn: deleteContactAPI,
    dataKey: "contacts",
    totalKey: "totalContacts",
  });

  const headerList = [
    {
      label: "Tên",
    },
    {
      label: "Email",
    },
    {
      label: "Số điện thoại",
    },
    {
      label: "Nội dung",
      width: "w-[300px]",
    },
    {
      label: "",
      width: "w-[100px]",
    },
  ];

  const tHeadStyle =
    "font-medium border border-gray-200 px-4 py-2 md:text-[18px] sm:text-[16px] text-[14px] break-words whitespace-normal";
  const optionStyle =
    "py-[12px] px-[16px] transition hover:bg-slate-100 cursor-pointer";

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="flex flex-col max-[900px]:overflow-auto min-h-screen">
      <DeleteConfirmationModal
        isOpen={openModal}
        onClose={handleReset}
        onConfirm={handleDeleteContact}
        title="Xóa liên hệ"
        message="Bạn có chắc chắn muốn xóa liên hệ không? Sau khi xóa không thể hoàn tác!"
        confirmButtonText="Xóa"
        cancelButtonText="Trở lại"
        modalStyle="w-[450px]"
      />

      <h3 className="lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-medium">
        Quản lý liên hệ
      </h3>

      <AdminTable
        headers={headerList}
        data={contacts}
        renderRow={(contact) => (
          <>
            <td className={`${tHeadStyle}`}>{contact?.name}</td>
            <td className={`${tHeadStyle}`}>{contact?.email}</td>
            <td className={`${tHeadStyle}`}>{contact?.phone}</td>
            <td className={`${tHeadStyle}`}>{contact?.message}</td>
          </>
        )}
        openOptions={openOptions}
        handleToggleOptions={(idx) => handleToggleOptions(idx)}
        optionItems={[
          {
            label: "Xóa liên hệ",
            onClick: (contact) => {
              setOpenModal(true);
              setCurrentId(contact._id);
            },
          },
        ]}
        tHeadStyle={tHeadStyle}
        optionStyle={optionStyle}
        responsiveStyle="max-[900px]:min-w-[1050px]"
      />

      {totalPages > 1 && (
        <Pagination
          handlePageChange={handlePageChange}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default ContactManagement;
