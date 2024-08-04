import React from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { OrderState, getOrderState } from "models/order";
import { nanoid } from "nanoid";
import { numberWithCommas } from "utilities";

import { Table, TableRow } from "components/table";

import { formatDateTime, now } from "utilities/dateTime";

import styles from "styles/_mypage.module.scss";

import { MyPageLayout } from "../MyPageLayout";

export default function OrderDetailContent() {
  return (
    <MyPageLayout>
      <div className={styles.order_detail_wrapper}>
        <p className={styles.order_title}>주문 상세 조회</p>
        <div>
          <p>주문번호 |{nanoid()} </p>
          <p>주문일 |{formatDateTime(now())} </p>
        </div>

        <div className={styles.order_item_list}>
          <Table
            pagination={false}
            headers={[
              { label: "상품정보", width: "70%" },
              { label: "수량" },
              { label: "상품금액" },
              { label: "진행상황" },
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
                        <button className={styles.option_button}>
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
              </TableRow>
            ))}
          </Table>
        </div>
        {/* <p>
          No.{nanoid()} | 주문일 {formatDateTime(now())}
        </p> */}
        {/* <p>주문정보</p>
        <div>
          <DoubleGrayContent
            content1={{ title: "주문번호", content: nanoid() }}
            content2={{ title: "주문일자", content: formatDateTime(now()) }}
          />
          <DoubleGrayContent
            content1={{ title: "주문자명", content: nanoid() }}
            content2={{ title: "", content: formatDateTime(now()) }}
          />
        </div> */}
        {/* <p className={styles.order_title}>주문 상세</p>
        <p>
          No.{nanoid()} | {formatDateTime(now())}
        </p> */}
      </div>
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
