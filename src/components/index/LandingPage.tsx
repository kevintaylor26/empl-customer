import { Avatar, Box, Flex, Icon, Input, SimpleGrid, Stack, Text, Wrap, WrapItem } from "@chakra-ui/react"
import { Carousel, Image, Avatar as AntdAvatar } from "antd";
import img1 from "@assets/images/background/slide-1.jpg"
import img2 from "@assets/images/background/slide-2.jpg"
import img3 from "@assets/images/background/slide-3.jpg"
import img4 from "@assets/images/background/slide-4.jpg"
import img5 from "@assets/images/background/slide-5.jpg"
import { SearchIcon, SmallCloseIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useSetState } from 'react-use';
import { ReactElement, useEffect, useState } from "react";
import { subscribe } from 'valtio';
import { request } from "@common/index";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { getAvatar } from '../../common/utils/public';
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
  const imgList = [
    {
      title: 'Title1',
      content: 'This is Content2',
      background: img1,
    },
    {
      title: 'Title2',
      content: 'This is Content2',
      background: img2,
    },
    {
      title: 'Title3',
      content: 'This is Content3',
      background: img3,
    },
    {
      title: 'Title4',
      content: 'This is Content4',
      background: img4,
    },
    {
      title: 'Title5',
      content: 'This is Content5',
      background: img5,
    },
  ];

  const [marketingData, setMarketingData] = useSetState({
    topRanks: [],
    criteria: '',
  });

  const [needToTimeout, setNeedTimeout] = useState(false);
  
  useEffect(() => {
    request('marketings/topRates', {})
      .then((res: any) => {
        if (res.code == 0) {
          setMarketingData({
            topRanks: res.data
          })
        }

      })
      .catch((ex) => {

      })
  }, []);

  interface FeatureProps {
    title: string
    text: string
    icon: ReactElement
  }

  const Feature = ({ title, text, icon }: FeatureProps) => {
    return (
      <Stack>
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          color={'white'}
          rounded={'full'}
          bg={'gray.100'}
          mb={1}>
          {icon}
        </Flex>
        <Text fontWeight={600}>{title}</Text>
        <Text color={'gray.600'}>{text}</Text>
      </Stack>
    )
  }

  return <div style={{ width: '100vw', marginTop: '85px' }}>
    <Carousel autoplay autoplaySpeed={5000}>
      {
        imgList.map((item: any, idx) => {
          return (
            <div style={{ width: '100vw' }} key={'cau' + idx}>
              <Flex direction={'column'} position={'relative'} w='100vw' h='50vw' justifyContent={'center'}>
                <div style={{ position: 'absolute', left: 0, top: 0, height: '50vw', width: '100vw' }}>
                  <Image
                    preview={false}
                    src={item.background}
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    width='100vw'
                    height='50vw' />
                </div>
                <Flex flexDirection={'column'} zIndex={2}>
                  <Text style={{ fontSize: '5vw', marginLeft: '10vw', color: 'white', fontWeight: 'bold' }}>{item.title}</Text>
                  <Text style={{ fontSize: '1.5vw', marginLeft: '12vw', color: 'white' }}>{item.content}</Text>
                </Flex>
              </Flex>
              {/* <div style={{ width: '100vw', height: '50vw', position: 'relative', display: 'flex' }}>


                            </div> */}
            </div>

          )
        })
      }
    </Carousel>
    <Flex sx={styles.headSearch} margin={'0px 10px'}>
      <Flex sx={styles.headIcon}
        onClick={() => {
          if(marketingData.criteria) {
            const encodedString = btoa(marketingData.criteria);
            location.href = 'search?criteria=' + encodedString;
          }
        }}>
        <SearchIcon />
      </Flex>
      <Flex flex="1" pr={4}>
        <Input variant="unstyled" placeholder='How can we help you?'
          maxLength={100}
          onKeyUp={(e)=> {
            if(e.key === 'Enter' && marketingData.criteria) {
              const encodedString = btoa(marketingData.criteria);
              location.href = 'search?criteria=' + encodedString;
            }
          }}
          onChange={(e) => {
            if (e.target.value) {
              setMarketingData({
                criteria: e.target.value
              });
            }
          }} />
      </Flex>
    </Flex>
    <Flex w='full' justifyContent={'center'}>
      <Flex w={{ base: '100%', sm: '100%', md: '100%', lg: '1270px' }} flexDirection={'column'}>

        <Box p={4}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            {marketingData.topRanks?.map((topRate: any, idx) => {
              return <Stack key={'top_' + idx} justifyContent={'center'}>
                <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                  <Avatar
                    width={'200px'}
                    height={'200px'}
                    src={topRate.avatar_url} />
                  <Text></Text>
                  <Text fontWeight={600}>{topRate.first_name + ' ' + topRate.last_name}</Text>
                  <Text color={'gray.600'}>{topRate.company}</Text>
                </Flex>

              </Stack>
            })}
          </SimpleGrid>
        </Box>
      </Flex>

    </Flex>

  </div>
}