import { useSession,signIn } from 'next-auth/client'
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from '../SubscribeButton/style.module.scss'


export function SubscribeButton(){
   const [session] = useSession()
    const router = useRouter()


   async function handleSubscribe(){

        if(!session){
            signIn('github');
            return
        }

        if(session?.activeSubscription){
            router.push('/post')
            return;
        }



        // criar checkout session

        try{

            const response = await api.post('/subscribe')

            const { sessionId } = response.data

            const stripe = await getStripeJs()

            await stripe.redirectToCheckout({sessionId})
        }
        catch(err){
            alert(err)
        }
    }
   
    return (
        <>
            <button type="button"
            onClick={handleSubscribe}
            className={styles.subscribeButton}>
                Subscribe now
            </button>
        </>
    )
}