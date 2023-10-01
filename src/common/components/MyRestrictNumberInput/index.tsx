import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Input, NumberInput, NumberInputField, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";

export function MyRestrictNumberInput ({allowedOptions}: any) {
    const [selectedOption, setSelectedOption] = useState("");

    const handleInputChange = (valueAsString: string, valueAsNumber: number) => {
        setSelectedOption(valueAsString);
    };

    const handleIncrement = () => {
        const currentIndex = allowedOptions.indexOf(selectedOption);
        if (currentIndex < allowedOptions.length - 1) {
            setSelectedOption(allowedOptions[currentIndex + 1].toString());
        }
    };

    const handleDecrement = () => {
        const currentIndex = allowedOptions.indexOf(selectedOption.toString());
        if (currentIndex > 0) {
        setSelectedOption(allowedOptions[currentIndex - 1].toString());
        }

    };

    return (
        <Box display="flex" alignItems="center">
            <IconButton aria-label="Decrement" icon={<ChevronDownIcon />} onClick={handleDecrement} />

            <NumberInput value={selectedOption} onChange={handleInputChange}>
                <NumberInputField as={Input} />
            </NumberInput>

            <IconButton aria-label="Increment" icon={<ChevronUpIcon />} onClick={handleIncrement} />
        </Box>
    );
};

export default MyRestrictNumberInput;