import { render,screen,fireEvent} from '@testing-library/react';
import { SubscribeButton } from '.';
import { useSession,signIn} from 'next-auth/client';
import { mocked } from 'ts-jest/utils';
import { useRouter} from 'next/router'


jest.mock('next-auth/client')

jest.mock('next/router')

describe('SubscribeButton Component', ()=>{

    it("renders correctly",()=>{

        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([null,false])

        render(<SubscribeButton/>)

        expect(screen.getByText("Subscribe now")).toBeInTheDocument()

    })

    it("redirects user to sign in when not authenticated", ()=>{

        const signInMocked = mocked(signIn)
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([null,false])

        render(<SubscribeButton/>)

        const subscribeButton = screen.getByText('Subscribe now')

        fireEvent.click(subscribeButton)
        
        expect(signInMocked).toHaveBeenCalled()

    })

    it("redirect to posts when user already has a subscription",()=>{

        const useRouterMocked = mocked(useRouter)
        const useSessionMocked = mocked(useSession)


        useSessionMocked.mockReturnValueOnce([
            { user:{name:"John Doe", email:"johndoe@gmail.com"},activeSubscription:'fake',expires:"fake",
        },false])

        const pushMock = jest.fn()

        useRouterMocked.mockReturnValueOnce({
            push:pushMock
        } as any)

        render(<SubscribeButton/>)

        const subscribeButton = screen.getByText('Subscribe now')

        fireEvent.click(subscribeButton)

        expect(pushMock).toHaveBeenCalled()


    })

})

