import { render,screen} from '@testing-library/react'
import { SignInButton } from '.'
import { useSession} from 'next-auth/client';
import {mocked} from 'ts-jest/utils'

jest.mock('next-auth/client')

describe('SignInButton Component', ()=>{

    it("renders correctly when user is not logged in",()=>{

        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([null,false])

        render(<SignInButton/>)
        expect(screen.getByText("Sign In with Github")).toBeInTheDocument()

    })

    it("renders correctly when user is logged in",()=>{

        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([
            { user:{name:"John Doe", email:"johndoe@gmail.com"},expires:"fake",
        },false])

        render(<SignInButton/>)
        expect(screen.getByText("John Doe")).toBeInTheDocument()

    })

})

