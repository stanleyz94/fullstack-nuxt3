import Stripe from 'stripe'
import { CompatibilityEvent } from 'h3'

const config = useRuntimeConfig()
const stripe = new Stripe(config.private.stripeSecretKey, null)

export default defineEventHandler(async (event: CompatibilityEvent) => {
  const body = await useBody(event)
  const sessionId = body.session_id

  const returnUrl = config.public.appDomain

  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId)
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer as string,
    // eslint-disable-next-line camelcase
    return_url: returnUrl,
  })
  await sendRedirect(event, portalSession.url)
})
