import { render,screen,waitFor,waitForElementToBeRemoved } from "@testing-library/react";

import { Async} from '../Async/Index'

test("it renders correctly",async ()=>{
    render(<Async/>)

    expect(screen.getByText('Hello world')).toBeInTheDocument()
    // expect( await screen.findByText('Visible')).toBeInTheDocument()

    await waitForElementToBeRemoved(screen.queryByText('Visible'))

    // await waitFor(()=>{
    //     return expect(screen.getByText('Visible')).toBeInTheDocument()

    // })

})