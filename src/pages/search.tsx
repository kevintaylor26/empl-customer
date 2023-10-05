import { Avatar, Box, Flex, Icon, Input, Link, SimpleGrid, Stack, Text, Wrap, WrapItem } from "@chakra-ui/react"
import { Carousel, Image, Avatar as AntdAvatar, ConfigProvider, Pagination } from "antd";
import axios from "axios";
import { useSetState } from 'react-use';
import { ReactElement, useEffect, useState } from "react";
import { OutlineButton, request, stateActions, useMyState, useMyToast } from "@common/index";
import { useSearchParams } from "react-router-dom";
import NoActivity from "@components/NoActivity";
import { FormattedMessage, useIntl } from "react-intl";
import PageNav from "@components/index/PageNav";
import { CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { EmailIcon } from "@chakra-ui/icons";
import copy from "copy-to-clipboard";
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
  detailTitle: {
    fontSize: '16px',
    fontWeight: 700,
    marginRight: '10px',
  },
  detailValue: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#1e1e1e',
  },
  detailValueLink: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#1e1e1e',
    display: 'flex',
    alignItems: 'center',
  },
  detailRow: {
    alignItems: 'center',
  }
};
export default () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const intl = useIntl();
  const { snap } = useMyState();
  const srchCriteria = searchParams.get('criteria');
  const { showError, showSuccess } = useMyToast();
  const [current_page, setCurrentPage] = useState(0);
  const [per_page, setPerPage] = useState(20);
  const [total, setTotal] = useState(0);
  const [needToReload, setNeedToReload] = useState(true);
  const [marketingData, setMarketingData] = useSetState({
    marketings: [],
    criteria: srchCriteria ? atob(srchCriteria) : '',
  });
  const fetchData = (criteria: string) => {
    if (criteria) {

      stateActions.addLoading();
      let url = 'marketings/free_search';
      if (snap.storage.isLogin)
        url = 'marketings/search';
      request(url, {
        data: {
          criteria: criteria,
          perPage: per_page,
          page: current_page,
        }
      })
        .then((res: any) => {
          if (res.code == 0) {
            setMarketingData({
              marketings: res.data
            })
            setTotal(res.meta?.total);
            setCurrentPage(res.meta?.current_page);
            setPerPage(res.meta?.per_page);
          }
        })
        .catch((ex) => {
          showError({ description: ex.message });
          setMarketingData({
            marketings: []
          });
          if (ex.code == 10008) {
            // setTimeout(() => {
            //   location.pathname = '/';
            // }, 1500);
          }
        }).finally(() => {
          stateActions.subLoading();
        })
    }
  }
  useEffect(() => {
    if(needToReload)
      fetchData(marketingData.criteria);
    setNeedToReload(false);
  }, [needToReload]);

  const sonTotal = (total: any) => {
    let labels = intl.formatMessage({ id: "page.total" });
    return { total: total, label: labels };
  };

  return <div style={{ width: '100vw', marginTop: '85px' }}>
    <PageNav initialCriteria={marketingData.criteria}
      onSearchChange={(criteria: string) => {
        setMarketingData({
          criteria: criteria
        });
        searchParams.set('criteria', btoa(criteria));
        setSearchParams(searchParams);
        fetchData(criteria);
      }}>
    </PageNav>
    <Flex justifyContent={'center'} flexDirection={'column'} w='full' alignItems={'center'}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} marginTop={'15px'} padding={'15px'}
        w={{ base: '100%', sm: '100%', md: '100%', lg: '1270px' }}>
        {
          marketingData.marketings?.map((item: any, idx: number) => {
            return <Stack key={'srch_' + idx} justifyContent={'center'} boxShadow={'0 2px 5px 0 rgba(0, 0, 0, 0.15)'}>
              <Flex justifyContent={'center'} alignItems={'center'} w='full' padding={5}>
                <Avatar
                  width={'150px'}
                  height={'150px'}
                  src={item.avatar_url} />
                <Flex flexDirection={'column'} flex={1} paddingLeft={5}>
                  <Text fontWeight={800} fontSize={'1.7vw'}>{item.first_name + ' ' + item.last_name}</Text>
                  <Text sx={styles.detailTitle}>{item.title}</Text>
                  <Flex sx={styles.detailRow}>
                    <Text sx={styles.detailTitle}>Email: </Text>
                    <Link
                      sx={styles.detailValueLink}
                      href={'mailto:' + item.email}
                      isExternal>
                      {item.email}<EmailIcon mx='2px' />
                    </Link>
                    <Flex>
                      <OutlineButton
                        onClick={() => {
                          if (item.email) {
                            copy(item.email);
                            showSuccess({ title: "Copied Email Address!" });
                          }
                        }}
                      >
                        <Icon as={CopyIcon} />
                      </OutlineButton>
                    </Flex>
                  </Flex>

                  <Flex sx={styles.detailRow}>
                    <Text sx={styles.detailTitle}>Company: </Text>
                    {
                      item.domain ?
                        <Link
                          sx={styles.detailValueLink}
                          href={item.domain.startsWith('http') ? item.domain : 'https://' + item.domain}
                          isExternal>
                          {item.company}<ExternalLinkIcon mx='2px' />
                        </Link>
                        : <Text sx={styles.detailValue}>{item.company}</Text>
                    }
                  </Flex>
                  <Flex sx={styles.detailRow}>
                    <Text sx={styles.detailTitle}>Location: </Text>
                    <Text sx={styles.detailValue}>{item.city}</Text>
                  </Flex>

                  <Flex sx={styles.detailRow}>
                    <Text sx={styles.detailTitle}>Profile</Text>
                    <Link
                      sx={styles.detailValueLink}
                      href={item.linkedin_url}
                      isExternal>
                      LinkedIn<ExternalLinkIcon mx='2px' />
                    </Link>
                  </Flex>
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
              setNeedToReload(true);
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