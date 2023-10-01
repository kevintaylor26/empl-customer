import { useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  Text,
  Menu,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { stateActions } from '../../common';
import { Locales } from '../../consts/TheLocales';

import './footer.scss';
const styles = {
  Footer: {
    height: '64px',
    maxHeight: '64px',
    borderTop: '1px solid var(--cds-colors-line)',
    width: '100%',
    WebkitBoxPack: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    background: 'rgba(0,62,193,0.03)',
    zIndex: 999
  },
  Content: {
    width: 'full',
    padding: {
      base: '5px 0',
      sm: '5px 0',
      md: '0 24px',
      lg: '0 24px',
    },
    WebkitBoxPack: 'justify',
    WebkitBoxAlign: 'center',
    alignItems: 'center',
    flexDirection: { base: 'column', sm: 'column', md: 'row', lg: 'row' },
    fontSize: '14px',
    color: 'rgb(var(--gray60))',
  },
  Button: {
    position: 'relative',
    width: 'auto',
    margin: '0px',
    color: 'gray.0',
    cursor: 'pointer',
    transition: 'all 80ms ease-in-out 0s',
    padding: '4px 8px',
    fontSize: '12px',
    borderRadius: '4px',
    border: '1px solid blue.60',
    backgroundColor: 'blue.60',
  },
  Span: {
    display: 'flex',
    WebkitBoxAlign: 'center',
    alignItems: 'center',
    WebkitBoxPack: 'center',
    justifyContent: 'center',
    width: '100%',
    pointerEvents: 'none',
    flexWrap: 'nowrap',
    whiteSpace: 'nowrap',
    fontFamily:
      'CoinbaseSans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    fontWeight: 'var(--cds-fontWeights-medium)',
  },
};

export default () => {
  const [lang, setLang] = useState(Locales[0].label);
  return (
    <Flex sx={styles.Footer}>
      <Flex sx={styles.Content}>
        <HStack gap='2' flex='1'>
          <Text fontSize='sm' ml={2} color='gray.50'>
            © 2023 DATA COMPANY
          </Text>
        </HStack>
        <HStack>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              sx={{
                _light: { bg: 'gray.0' },
                _dark: { bg: 'gray.99' },
                minWidth: 'unset',
              }}
            >
              {lang}
            </MenuButton>
          </Menu>
          <Link to='/home/help'>
            <Box as='button' sx={styles.Button}>
              <Box as='span' sx={styles.Span}>
                <FormattedMessage id='text.NeedHelp' />
              </Box>
            </Box>
          </Link>
        </HStack>
      </Flex>
    </Flex>
  );
};
