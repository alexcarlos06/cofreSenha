import { Button } from "native-base";

export function ButtonPrimary({ title, ...rest }) {
  return <Button size="sm">{title}</Button>;
}

export function ButtonSecondary({ title, ...rest }) {
  return (
    <Button colorScheme="secondary" size="md" width={'100%'} {...rest} >
      {title}
    </Button>
  );
}

  