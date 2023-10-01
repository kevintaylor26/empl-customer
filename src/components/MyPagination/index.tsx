/* eslint-disable react/jsx-key */
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { getPaginationLocale, useMyState } from "@common/index";
import { ConfigProvider, Pagination } from "antd";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Locale } from 'antd/es/locale';
export type ResDataMetaProps = {
  /**
   * 当前页
   * @default 1
   */
  current_page: number;
  /**
   * 最后一页
   */
  last_page: number;
  /**
   * 每页记录数
   * @default 20
   */
  per_page: number;
  /**
   * 总记录数
   * @default 0
   */
  total: number;
};

export type MyPaginationProps = {
  /**
   * 后端直接返回的meta信息
   */
  meta?: ResDataMetaProps;
  /**
   * 当分页变更的时候触发事件
   */
  onChange: (page: number, pageSize: number) => void;
};

export const MyPagination = ({ meta, onChange }: MyPaginationProps) => {
  const intl = useIntl();
  const { snap } = useMyState();
  const defauleDark = useColorModeValue('ant', 'antdark');
  const [locale, setLocal] = useState<Locale>(getPaginationLocale(intl.locale));
  const sonTotal = (total: any) => {
    let labels = intl.formatMessage({ id: "page.total" });
    return { total: total, label: labels };
  };

  useEffect(() => {
      setLocal(getPaginationLocale(intl.locale));
  }, [snap.storage.locale]);
  return meta ? (
    <ConfigProvider prefixCls={defauleDark}
      locale={locale}>
      <Flex py={5} justifyContent="center" w='full'>
        <Pagination
          current={meta?.current_page || 1}
          total={meta?.total || 0}
          pageSize={meta?.per_page || 20}
          onChange={onChange}
          showTotal={(total) => {
            let obj = sonTotal(total);
            return obj?.total + ' ' + obj?.label;
          }}
          showSizeChanger
          showQuickJumper
        />
      </Flex>
    </ConfigProvider>

  ) : null;
};
