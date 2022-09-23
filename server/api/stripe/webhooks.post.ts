import Stripe from "stripe"
import { handleSubscriptionChange } from '@/server/services/stripeService'

export default defineEventHandler(async (event) => {
    const stripeEvent = await useBody<Stripe.Event>(event)
    let subscription: Stripe.Subscription | undefined
    const isSpecificSubscriptionEvent = stripeEvent.type.startsWith('customer.subscription')
    if (isSpecificSubscriptionEvent) {
        subscription = stripeEvent.data.object as Stripe.Subscription
        handleSubscriptionChange(subscription, stripeEvent.created)
        return `handled ${stripeEvent.type}`
    } else {
        sendError(event, createError({ statusCode: 400, statusMessage: `Unhlandled event type ${stripeEvent.type}`}))
    }
})