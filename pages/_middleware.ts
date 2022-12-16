import { NextResponse } from 'next/server'

const signedInPages = ['/', '/playlist', '/library']

export default function middleware(req) {
  const isProtected = signedInPages.find((p) => p === req.nextUrl.pathname)

  if (isProtected) {
    const token = req.cookies.TRAX_ACCESS_TOKEN

    if (!token) {
      return NextResponse.redirect('/signin')
    }
  }
}
