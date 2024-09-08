import React, { useMemo, useState } from "react";

import classNames from "classnames";
import { filterList } from "models/category";
import { Device } from "models/device";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "utilities";

import useItemsQuery from "hooks/query/useItemsQuery";
import usePageQueryString from "hooks/queryString/usePageQueryString";
import useQueryString from "hooks/queryString/useQueryString";
import { useUserDevice } from "hooks/size/useUserDevice";

import { ItemCard } from "components/card";
import {
  CommonLayout,
  DefaultCheckbox,
  DefaultPagination,
  LoadingLayer,
  SearchInput,
  SelectBox,
} from "components/common";

import styles from "styles/_search.module.scss";

export default function Search() {
  const navigation = useNavigate();

  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  const [toastMessage, setToastMessage] = useState("");

  const [keyword] = useQueryString("keyword");
  const [searchValue, setSearchValue] = useState(keyword);

  const getKeyword = useMemo(() => setSearchValue(keyword), [keyword]);

  const [excludingSoldOut, setExcludingSoldOut] = useState(true);

  const [sort, changeSort] = useQueryString("sort", filterList[0].sort);

  const [{ page, perPage: limit, offset }, changePage, getPageCount] =
    usePageQueryString("page", 20);
  const handleChangePage = (_event, page) => changePage(page);

  const { data: items, isLoading } = useItemsQuery(
    {
      offset: offset,
      limit: limit,
      sort: sort,
      keyword: keyword,
      excludingSoldOut: excludingSoldOut,
    },
    {
      onError: (error) => {
        setToastMessage(error.message);
      },
    },
  );

  if (isLoading) return <LoadingLayer />;

  return (
    <CommonLayout setToastMessage={setToastMessage} toastMessage={toastMessage}>
      <div className={styles.search_result_container}>
        <div className={styles.search_input_wrapper}>
          <SearchInput
            value={searchValue}
            setValue={setSearchValue}
            onKeyDown={() => {
              navigation(`/search?keyword=${searchValue}`);
            }}
          />
          <p className={styles.search_result_text}>
            총 <strong>{numberWithCommas(items?.total)}</strong>개의 상품이
            검색되었습니다
          </p>
        </div>
        {items?.total > 0 && (
          <>
            <div className={styles.search_result_filter_wrapper}>
              <div className={styles.checkbox_wrap}>
                <DefaultCheckbox
                  checked={excludingSoldOut}
                  onChange={() => setExcludingSoldOut(!excludingSoldOut)}
                />
                <span>품절 제외</span>
              </div>
              {isDeskTop ? (
                <div className={styles.filter_wrap}>
                  {filterList.map((filter, index) => (
                    <span
                      key={index}
                      onClick={() => changeSort(filter.sort)}
                      className={classNames({
                        [styles.active_filter]: sort == filter.sort,
                      })}
                    >
                      {filter.label}
                    </span>
                  ))}
                </div>
              ) : (
                <SelectBox
                  options={filterList}
                  selectedValue={sort || filterList[0]?.sort}
                  onChange={changeSort}
                />
              )}
            </div>

            <div className={styles.search_result_item_wrapper}>
              {items?.data?.map((item, index) => (
                <ItemCard
                  key={index}
                  showStatus={true}
                  style={{ height: 350 }}
                  item={item}
                />
              ))}
            </div>
            <DefaultPagination
              count={getPageCount(items?.total)}
              page={page}
              onChange={handleChangePage}
            />
          </>
        )}
      </div>
    </CommonLayout>
  );
}
