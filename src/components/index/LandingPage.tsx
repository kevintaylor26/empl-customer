import { Flex, Input, Text } from "@chakra-ui/react"
import { Carousel, Image } from "antd";
import img1 from "@assets/images/background/slide-1.jpg"
import img2 from "@assets/images/background/slide-2.jpg"
import img3 from "@assets/images/background/slide-3.jpg"
import img4 from "@assets/images/background/slide-4.jpg"
import img5 from "@assets/images/background/slide-5.jpg"
import { SearchIcon, SmallCloseIcon } from "@chakra-ui/icons";
import axios from "axios";
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

    const fetchAvatarUrl = async (linkedUrl: string): Promise<string> => {
        try {
            console.log('aa');
          const response = await axios.get(linkedUrl);
  
          // Parse the HTML response to extract the avatar URL
          const html = response.data;
          const pattern = /<img class="lazy-image" src="([^"]+)"/;
          const matches = html.match(pattern);
  
          if (matches && matches[1]) {
            return matches[1];
          } else {
            return 'img/avatar_default.png';
          }
        } catch (error) {
            return 'img/avatar_default.png';
        }
      };
  
    return <div style={{ width: '100vw'}}>
        <Carousel autoplay autoplaySpeed={5000}>
            {
                imgList.map((item: any, idx) => {
                    return (
                        <div style={{ width: '100vw' }}>
                            <Flex direction={'column'} position={'relative'} w='100vw' h='60vw' justifyContent={'center'}>
                                <div style={{ position: 'absolute', left: 0, top: 0, height: '60vw', width: '100vw' }}>
                                    <Image
                                        preview={false}
                                        src={item.background}
                                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                                        width='100vw'
                                        height='60vw' />
                                </div>
                                <Flex flexDirection={'column'} zIndex={2}>
                                    <Text style={{ fontSize: '5vw', marginLeft: '10vw', color: 'white', fontWeight: 'bold' }}>{item.title}</Text>
                                    <Text style={{ fontSize: '1.5vw', marginLeft: '12vw', color: 'white'  }}>{item.content}</Text>
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
          <Flex sx={styles.headIcon}>
            <SearchIcon />
          </Flex>
          <Flex flex="1" pr={4}>
            <Input variant="unstyled" placeholder='How can we help you?' />
          </Flex>
        </Flex>
        <Flex>
            <Image src={fetchAvatarUrl('https://www.linkedin.com/in/ACwAAAAADlgBZuYW2NSlQb5_WZb8Fu_Wcn6zs6E')}/>
        </Flex>

    </div>
}