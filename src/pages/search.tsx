import { Avatar, Box, Flex, Icon, Input, Link, SimpleGrid, Stack, Text, Wrap, WrapItem } from "@chakra-ui/react"
import { Carousel, Image, Avatar as AntdAvatar, ConfigProvider, Pagination } from "antd";
import axios from "axios";
import { useSetState } from 'react-use';
import { ReactElement, useEffect, useState } from "react";
import { request, stateActions } from "@common/index";
import { useSearchParams } from "react-router-dom";
import NoActivity from "@components/NoActivity";
import { useIntl } from "react-intl";
import PageNav from "@components/index/PageNav";
const styles = {
  helpSearchC: {
    width: "100%",
    minHeight: "calc(100vh - 68px - 64px)",
    display: "block",
  },
  headSearch: {
    border: "2px solid #5b636ea8",
    height: "60px",
    alignItems: "center",
    margin: "5px 20px",
    borderRadius: "50px",
  },
  headIcon: {
    padding: "0 1.6rem",
  },
};
export default () => {
  const [searchParams] = useSearchParams();
  const intl = useIntl();
  const srchCriteria = searchParams.get('criteria');
  const [current_page, setCurrentPage] = useState(0);
  const [per_page, setPerPage] = useState(20);
  const [total, setTotal] = useState(0);
  const [marketingData, setMarketingData] = useSetState({
    marketings: [],
    criteria: srchCriteria ? atob(srchCriteria) : '',
  });
  const fetchData = () => {
    if (marketingData.criteria) {

      stateActions.addLoading();
      request('marketings/search', {
        data: {
          criteria: marketingData.criteria,
          perPage: per_page,
          curPage: current_page,
        }
      })
        .then((res: any) => {
          setMarketingData({
            marketings: res.data
          })
          setTotal(res.meta?.total);
          setCurrentPage(res.meta?.current_page);
          setPerPage(res.meta?.per_page);
        })
        .catch((ex) => {

        }).finally(() => {
          stateActions.subLoading();
        })
    }
  }
  useEffect(() => {
    fetchData();
  }, [per_page, current_page]);

  useEffect(() => {
    fetchData();
  }, []);
  const sonTotal = (total: any) => {
    let labels = intl.formatMessage({ id: "page.total" });
    return { total: total, label: labels };
  };

  return <div style={{ width: '100vw', marginTop: '85px' }}>
    <PageNav initialCriteria={marketingData.criteria}></PageNav>
    <Flex w='full' justifyContent={'center'} flexDirection={'column'}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} marginTop={'15px'}>
        {
          marketingData.marketings?.map((item: any, idx: number) => {
            return <Stack key={'srch_' + idx} justifyContent={'center'}>
              <Flex justifyContent={'center'} alignItems={'center'} w='full' padding={5}>
                <Avatar
                  width={'150px'}
                  height={'150px'}
                  src={item.avatar_url} />
                <Flex flexDirection={'column'} flex={1} paddingLeft={5}>
                  <Text fontWeight={600}>{item.first_name + ' ' + item.last_name}</Text>
                  <Text fontWeight={600}>{item.title}</Text>
                  <Text fontWeight={600}>{item.email}</Text>
                  <Link src={item.linkedin_url}>LinkedIn</Link>
                  <Link src={item.domain} color={'gray.600'}>{item.company}</Link>
                  <Text fontWeight={600}>{item.city}</Text>
                </Flex>
              </Flex>
            </Stack>
          })
        }
      </SimpleGrid>
      {!marketingData.marketings || marketingData.marketings?.length == 0 ? <NoActivity /> : ''}
      <ConfigProvider>
        <Flex py={5} justifyContent="center">
          <Pagination
            current={current_page || 1}
            total={total || 0}
            pageSize={per_page || 20}
            onChange={(page: number, pageSize: number) => {
              setPerPage(pageSize);
              setCurrentPage(page);
            }}
            showTotal={(total) => {
              let obj = sonTotal(total);
              return obj?.total + ' ' + obj?.label;
            }}
            showSizeChanger
            showQuickJumper
          />
        </Flex>
      </ConfigProvider>

    </Flex>

  </div>
}