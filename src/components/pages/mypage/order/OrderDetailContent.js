import React, { useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { OrderState, getOrderState } from "models/order";
import { useParams } from "react-router-dom";
import { maskAccountName, maskPhoneNumber, numberWithCommas } from "utilities";

import useOrderQuery from "hooks/query/useOrderQuery";

import { LoadingLayer } from "components/common";
import { ChangeOptionModal, ToastModal } from "components/modal";
import { Table, TableRow } from "components/table";

import { formatDateTime } from "utilities/dateTime";

import styles from "styles/_mypage.module.scss";

import { MyPageLayout } from "../MyPageLayout";

export default function OrderDetailContent() {
  const [toastMessage, setToastMessage] = useState("");
  const [changeOptionModal, setChangeOptionModal] = useState(false);

  const colorOptions = [...new Array(3)];
  const sizeOptions = [...new Array(3)];

  const [selectedItem, setSelectedItem] = useState({});

  const { id } = useParams();
  const { data: order, isLoading } = useOrderQuery(id);

  if (isLoading) return <LoadingLayer />;
  return (
    <MyPageLayout>
      <div className={styles.order_detail_wrapper}>
        <p className={styles.order_title}>주문 상세 조회</p>
        <div className={styles.order_item_header}>
          <p>No. {order?.orderNumber} </p>
          <p>{formatDateTime(order?.createdAt, "yyyy-MM-dd HH:mm")} </p>
        </div>

        <div className={styles.order_item_list}>
          <Table
            pagination={false}
            headers={[
              { label: "상품정보", width: "60%" },
              { label: "수량" },
              { label: "상품금액" },
              { label: "진행상황" },
              { label: "배송조회" },
            ]}
          >
            {order?.items.map((item, index) => (
              <TableRow key={index}>
                <td>
                  <div className={styles.item_info}>
                    <img src={item?.thumbnail} />
                    <div className={styles.item_info_text}>
                      <p>{item.itemName}</p>
                      <p>옵션 : {item.option}</p>
                      {item.state < OrderState.Preparing && (
                        <button
                          className={styles.option_button}
                          onClick={() => {
                            setChangeOptionModal(!changeOptionModal);
                            setSelectedItem(item);
                          }}
                        >
                          옵션 변경
                          <ExpandMoreIcon />
                        </button>
                      )}
                    </div>
                  </div>
                </td>
                <td>{item.quantity}</td>
                <td>{numberWithCommas(item.price)}</td>
                <td>{getOrderState(item.state)}</td>
                <td>
                  {item.state >= OrderState.Delivery &&
                    item.state < OrderState.PendingExchange && (
                      <button
                        className={styles.delivery_info_wrap}
                        onClick={() => setToastMessage("준비중입니다.")}
                      >
                        배송 조회
                      </button>
                    )}
                </td>
              </TableRow>
            ))}
          </Table>
        </div>
        <div className={styles.gray_table_container}>
          <p className={styles.gray_table_title}>주문자 정보</p>
          <DoubleGrayContent
            content1={{
              title: "주문자명",
              content: order?.orderInformation?.name,
            }}
            content2={{
              title: "이메일주소",
              content: maskAccountName(order?.orderInformation?.email),
            }}
          />
          <DoubleGrayContent
            content1={{
              title: "연락처",
              content: maskPhoneNumber(order?.orderInformation?.phoneNumber),
            }}
            content2={{ title: "", content: "" }}
          />
        </div>
        <div className={styles.gray_table_container}>
          <p className={styles.gray_table_title}>배송지 정보</p>
          <DoubleGrayContent
            content1={{
              title: "수취인",
              content: order?.deliveryInformation?.name,
            }}
            content2={{
              title: "연락처",
              content: maskPhoneNumber(order?.deliveryInformation?.phoneNumber),
            }}
          />
          <GrayContent
            content={{
              title: "주소",
              content: `[${order?.deliveryInformation?.zipCode}] ${order?.deliveryInformation?.address}`,
            }}
          />
        </div>
        <div className={styles.gray_table_container}>
          <p className={styles.gray_table_title}>결제 정보</p>
          <GrayContent
            content={{
              title: "결제방법",
              content: order?.paymentInformation?.method,
            }}
          />
          <GrayContent
            content={{
              title: "결제금액",
              content: `${numberWithCommas(order?.paymentInformation?.totalPrice)}원`,
            }}
          />
        </div>
      </div>
      {toastMessage && (
        <ToastModal
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}
        />
      )}
      {changeOptionModal && (
        <ChangeOptionModal
          isQuantity={false}
          visible={changeOptionModal}
          setVisible={setChangeOptionModal}
          colors={colorOptions}
          sizes={sizeOptions}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}
    </MyPageLayout>
  );
}

function GrayContent({ content = {} }) {
  return (
    <div className={styles.gray_content_wrap}>
      <p className={styles.gray_content_title}>{content?.title}</p>
      <p className={styles.gray_content_content}>{content?.content}</p>
    </div>
  );
}

function DoubleGrayContent({ content1 = {}, content2 = {} }) {
  return (
    <div className={styles.double_gray_content_wrap}>
      <GrayContent content={content1} />
      <GrayContent content={content2} />
    </div>
  );
}
