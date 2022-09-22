import Stripe from "stripe"
import { handleSubscriptionChange } from '@/serevr/services/stripeService'

export default defineEventHandler(async (event) => {
    const stripeEvent = await useBody<Stripe.Event>(event)
    let subscription: Stripe.Subscription


    switch (stripeEvent.type) {
        case 'customer.subscription.created':
            subscription = stripeEvent.data.object
            handleSubscriptionChange(subscription, stripeEvent.created)
            break
        case 'customer.subscription.deleted':
            subscription = stripeEvent.data.object
            break
        case 'customer.subscription.updated':
            subscription = stripeEvent.data.object
            break
        default:
            console.log(`Unhlandled event type ${stripeEvent.type}`)
    }

    return `handled ${stripeEvent.type}`
})