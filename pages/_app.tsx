import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import 'reset-css'

import PlayerLayout from '../components/playerLayout'

const theme = extendTheme({
  colors: {
    gray: {
      100: '#f5f5f5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  components: {
    Button: {
      variants: {
        link: {
          ':focus': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
  },
})

// import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <PlayerLayout>
        <Component {...pageProps} />
      </PlayerLayout>
    </ChakraProvider>
  )
}

import { PrismaClient } from '@prisma/client'

export async function getServerSideProps(context) {
  // const prisma = new PrismaClient()
  console.log('waiting')
  // await prisma.$queryRaw`SELECT 1`
  console.log('passed')

  return { props: {} }
}

export default MyApp
