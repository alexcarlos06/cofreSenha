import { Box, Input, Text } from "native-base";

export function CInput({ title, ...rest }) {
  return (
    <Box marginTop={2} marginBottom={2}>
      <Text marginX={2}>{title}</Text>
      <Input marginX={2} variant="underlined" {...rest}></Input>
    </Box>
  );
}
