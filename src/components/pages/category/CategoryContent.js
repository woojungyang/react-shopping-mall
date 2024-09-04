import React from "react";

import { SmallCard } from "components/card";
import { CommonLayout } from "components/common";

import styles from "styles/_category.module.scss";

export default function CategoryContent() {
  return (
    <CommonLayout>
      <div className={styles.category_container}>
        <div className={styles.category_main_wrapper}>메인 자리 미정</div>
        <div className={styles.exhibition_wrapper}>
          <p className={styles.section_title}>주목할 만한 기획전</p>

          <div className={styles.exhibition_wrap}>
            {/* <hr /> */}
            <div className={styles.exhibition}>
              <img
                className={styles.exhibition_thumbnail}
                src={require("assets/images/sub/sub1.jpg")}
                alt=""
              />
              <p className={styles.title}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <p className={styles.subtitle}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                eveniet asperiores praesentium odio saepe nostrum perspiciatis
                inventore! Impedit tempore eligendi nostrum optio reiciendis non
                veniam placeat, eum possimus, sit temporibus!
              </p>
              <div className={styles.exhibition_item_wrap}>
                <div className={styles.exhibition_item}>
                  <SmallCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
