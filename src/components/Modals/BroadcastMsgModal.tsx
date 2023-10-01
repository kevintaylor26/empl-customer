import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/css';
import { useIntl } from 'react-intl';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { request, PrimaryButton, getAvatar } from '../../common';
import { stateActions } from '../../common/state';

import { useNavigate } from 'react-router';
import { FormattedMessage } from 'react-intl';
import BroadcastMsgCard from './BroadcastMsgCard';

const styles = {
  ModalBody: {
    position: 'relative',
    paddingBottom: 10,
    width: { base: '100vw', sm: '100vw', md: '600px', lg: '650px' },
    maxWidth: 'auto',
    borderRadius: { base: '0', sm: '0', md: '10px', lg: '10px' },
  },
  NextBtn: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    zIndex: 100,
  },
};

export default ({ messages }: any) => {
  const navigate = useNavigate();
  const [swiper_cont, setSwiper] = useState<SwiperCore | null>(null);
  const [swiperIdx, setSwiperIdx] = useState<any>(0);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onSwiperChange = (idx: number) => {
  };
  useEffect(() => {
    if(messages?.length > 0){
      onOpen();
    }
  }, [messages]);

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent sx={styles.ModalBody}>
        {/* <ModalCloseButton sx={{ zIndex: 1500 }} /> */}
        <ModalBody>
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className='AiTradeSwiper'
            onSwiper={(swiper) => setSwiper(swiper)}
            onSlideChange={(item) => {
              onSwiperChange(item.activeIndex);
              setSwiperIdx(item.activeIndex);
            }}
          >
            {
              messages?.map((msg: any) => (
                <SwiperSlide key={msg.id}>                  
                  <BroadcastMsgCard
                    src={getAvatar(msg.url) }
                    title={msg.title}
                    description={msg.content}
                  />
                </SwiperSlide>
              ))
            }
          </Swiper>
          
          <Flex justifyContent="center" alignItems="center" display="flex" marginTop={'15px'}>
            <Button backgroundColor={'#3673EB'} color={'white'} borderRadius={'20px'}
                  onClick={() => {
                    swiper_cont?.slideNext();
                    if(swiperIdx == messages?.length - 1){
                      onClose();
                    }
                  }}>
              <FormattedMessage
                    id={swiperIdx == messages?.length - 1 ? 'text.closeAmount' : 'text.Next'}
                  />
            </Button>
          </Flex>
          
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
