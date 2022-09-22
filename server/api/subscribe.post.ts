import { getUserById } from '@/server/db/repositories/userRepository'
import { getSubscribeUrl } from '@/server/services/stripeService'
import { updateStripeCustomerId } from '@/server/db/repositories/userRepository'


export default defineEventHandler(async (event) => {
    const body = await useBody(event)
    const lookupKey = body.lookup_key
    const userId = body.user_id

    const user = await getUserById(parseInt(userId))

    const { url, user: customer, shouldUpdateUser } = await getSubscribeUrl(lookupKey, user)
    
    if (shouldUpdateUser) {
        await updateStripeCustomerId(customer)
    }
    await sendRedirect(event, url)
})