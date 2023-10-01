import { Box, HStack, useRadio, useRadioGroup } from "@chakra-ui/react"
import { useIntl } from "react-intl"

export function RadioCard(props: any) {
  const { getInputProps, getRadioProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export function MyRadioButtons({ options, ...rest }: any) {

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'react',
    onChange: console.log,
  })
  const intl = useIntl();
  const group = getRootProps()

  return (
    <HStack {...group}>
      {options.map((value: any) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard key={value.key} {...radio}>
            { intl.formatMessage({ id: value.label })}
          </RadioCard>
        )
      })}
    </HStack>
  )
}