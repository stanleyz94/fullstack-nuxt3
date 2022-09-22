import Stripe from 'stripe'
import { CompatibilityEvent } from 'h3'

const config = useRuntimeConfig()
const stripe = new Stripe(config.private.stripeSecretKey, null)

export default defineEventHandler(async (event: CompatibilityEvent) => { 
    const body = await useBody(event)
    const session_id = body.session_id
    
    const return_url = config.public.appDomain

    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
    const portalSession = await stripe.billingPortal.sessions.create({
        customer: checkoutSession.customer as string,
        return_url
    })
    await sendRedirect(event, portalSession.url)
})