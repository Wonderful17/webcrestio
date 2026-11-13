import { revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  const { isValidSignature, body } = await parseBody<{ _type: string }>(
    req,
    process.env.SANITY_REVALIDATE_SECRET
  )

  if (!isValidSignature) {
    return new Response('Invalid signature', { status: 401 })
  }

  if (body?._type) {
    revalidateTag(body._type)
  }

  return Response.json({ ok: true })
}
