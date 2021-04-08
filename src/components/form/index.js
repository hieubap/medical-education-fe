import { Button, Modal } from "antd";
import "./style.scss";

function FormClass(){
    return(
        <Modal
      width={850}
      title={"Thông tin tài khoản"}
      visible={true}
      cancelText={"Đóng"}
      
      footer={[<Button type="danger" key="back">Đóng</Button>]}
    ></Modal>
    )
}

export default FormClass;