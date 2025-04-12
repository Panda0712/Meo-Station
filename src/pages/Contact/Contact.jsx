import Button from "~/components/Button/Button";
import Input from "~/components/Input/Input";

const Contact = () => {
  return (
    <section className="px-24 py-16">
      <h3 className="text-[32px] text-[#152c5b] font-semibold mb-12">
        Hãy cho chúng tôi biết thêm về bạn
      </h3>

      <div className="flex justify-between gap-5">
        <div className="relative">
          <h4 className="text-[24px] text-[#152c5b] font-medium mb-8">
            Bạn muốn liên hệ chúng tôi vì điều gì?
          </h4>
          <form className="flex flex-col gap-[8px] relative">
            <Input name="name" content="Nhập họ tên" />
            <Input name="email" type="email" content="Nhập email" />
            <Input name="phone" content="Nhập số điện thoại" />
            <Input
              name="message"
              type="textarea"
              content="Nhập nội dung"
              style="pt-3"
            />
            <div className="flex justify-start mt-1">
              <Button title="Gửi" type="submit" />
            </div>
          </form>
        </div>
        <div className="flex flex-col gap-[32px]">
          <div className="flex items-start gap-[32px]">
            <p className="min-w-[180px] text-[24px] font-semibold">
              Đặt phòng:
            </p>
            <div className="text-[18px] text-[#181a18]">
              <h6>meostation@gmail.com</h6>
              <h6>0369332842</h6>
            </div>
          </div>
          <div className="flex items-start gap-[32px]">
            <p className="min-w-[180px] text-[24px] font-semibold">Hotline:</p>
            <div className="text-[18px] text-[#181a18]">
              <h6>meohotline@gmail.com</h6>
              <h6>0903997865</h6>
            </div>
          </div>
          <div className="flex items-start gap-[32px]">
            <p className="min-w-[180px] text-[24px] font-semibold">
              Hỗ trợ dịch vụ:
            </p>
            <div className="text-[18px] text-[#181a18]">
              <h6>meoservice@gmail.com</h6>
              <h6>0903997864</h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
