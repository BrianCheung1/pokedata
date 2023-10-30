import { Breadcrumbs, Anchor, Stack } from "@mantine/core"

export const Info = () => {
  const items = [
    { title: "Pogoapi.net", href: "https://pogoapi.net/" },
    { title: "Pokeapi.co", href: "https://pokeapi.co/" },
    { title: "ScrapedDuck", href: "https://github.com/bigfoott/ScrapedDuck" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index} target="_blank">
      {item.title}
    </Anchor>
  ))

  const items2 = [
    { title: "LeekDuck", href: "https://leekduck.com/" },
    { title: "PogoInfo", href: "https://github.com/ccev/pogoinfo" },
  ].map((item, index) => (

    <Anchor href={item.href} key={index} target="_blank">
      {item.title}
    </Anchor>
  ))

  return (
    <Stack justify="center" align="center">
      <Breadcrumbs>{items}</Breadcrumbs>
      <Breadcrumbs>{items2}</Breadcrumbs>
    </Stack>
  )
}
