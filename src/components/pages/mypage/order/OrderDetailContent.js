import React, { useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { OrderState, getOrderState } from "models/order";
import { nanoid } from "nanoid";
import { maskAccountName, maskPhoneNumber, numberWithCommas } from "utilities";

import { ChangeOptionModal, ToastModal } from "components/modal";
import { Table, TableRow } from "components/table";

import { formatDateTime, now } from "utilities/dateTime";

import styles from "styles/_mypage.module.scss";

import { MyPageLayout } from "../MyPageLayout";

export default function OrderDetailContent() {
  const [toastMessage, setToastMessage] = useState("");
  const [changeOptionModal, setChangeOptionModal] = useState(false);

  const colorOptions = [...new Array(3)];
  const sizeOptions = [...new Array(3)];

  const [selectedItem, setSelectedItem] = useState({});

  return (
    <MyPageLayout>
      <div className={styles.order_detail_wrapper}>
        <p className={styles.order_title}>주문 상세 조회</p>
        <div className={styles.order_item_header}>
          <p>No. {nanoid()} </p>
          <p>{formatDateTime(now())} </p>
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
            {order.products.map((product, index) => (
              <TableRow key={index}>
                <td>
                  <div className={styles.item_info}>
                    <img src={require(`assets/images/sub/sub12.jpg`)} />
                    <div className={styles.item_info_text}>
                      <p>{product.itemName}</p>
                      <p>옵션 : {product.option}</p>
                      {product.state < OrderState.Preparing && (
                        <button
                          className={styles.option_button}
                          onClick={() => {
                            setChangeOptionModal(!changeOptionModal);
                            setSelectedItem(product);
                          }}
                        >
                          옵션 변경
                          <ExpandMoreIcon />
                        </button>
                      )}
                    </div>
                  </div>
                </td>
                <td>{product.quantity}</td>
                <td>{numberWithCommas(product.price)}</td>
                <td>{getOrderState(product.state)}</td>
                <td>
                  <button
                    className={styles.delivery_info_wrap}
                    onClick={() => setToastMessage("준비중입니다.")}
                  >
                    배송 조회
                  </button>
                </td>
              </TableRow>
            ))}
          </Table>
        </div>
        <div className={styles.gray_table_container}>
          <p className={styles.gray_table_title}>주문자 정보</p>
          <DoubleGrayContent
            content1={{ title: "주문자명", content: "홍길동" }}
            content2={{
              title: "이메일주소",
              content: maskAccountName("username@naver.com"),
            }}
          />
          <DoubleGrayContent
            content1={{
              title: "연락처",
              content: maskPhoneNumber("01012341234"),
            }}
            content2={{ title: "", content: "" }}
          />
        </div>
        <div className={styles.gray_table_container}>
          <p className={styles.gray_table_title}>배송지 정보</p>
          <DoubleGrayContent
            content1={{ title: "수취인", content: "홍길동" }}
            content2={{
              title: "연락처",
              content: maskPhoneNumber("01012341234"),
            }}
          />
          <GrayContent
            content={{
              title: "주소",
              content: "[12345] 서울특별시어어어어엉어쩌구",
            }}
          />
        </div>
        <div className={styles.gray_table_container}>
          <p className={styles.gray_table_title}>결제 정보</p>
          <GrayContent
            content={{
              title: "결제방법",
              content: "카드",
            }}
          />
          <GrayContent
            content={{
              title: "결제금액",
              content: `${numberWithCommas(1234444)}원`,
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

const order = {
  id: 1,
  orderDate: formatDateTime(now()),
  orderNumber: nanoid(),
  products: Array.from({ length: 5 }, (v, index) => ({
    id: index,
    itemName: "item" + nanoid(),
    option: "skyblue",
    quantity: index,

    price: 12344 + index,
    originalPrice: 20000,
    state:
      Object.values(OrderState)[
        Math.floor(Math.random() * Object.values(OrderState).length)
      ],
  })),
};
